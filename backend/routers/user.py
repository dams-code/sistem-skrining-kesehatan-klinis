from fastapi import APIRouter, Depends, status
from schemas.user import *
from services.user import UserService
from sqlalchemy.ext.asyncio import AsyncSession
from core.database import get_database
from fastapi.security import OAuth2PasswordRequestForm, OAuth2PasswordBearer
from typing import Annotated

router_user = APIRouter(prefix="/user", tags=["User"])

@router_user.post("/registrasi", response_model=ResultUser[UserResponse], status_code=status.HTTP_201_CREATED)
async def registrasi_user(user: UserCreate, sesi_db: AsyncSession = Depends(get_database)):
    
    userService = UserService(sesi_db)
    
    return await userService.registrasi_user(user)

@router_user.post("/login", response_model=ResultUser[UserResponse])
async def login(form_data: Annotated[OAuth2PasswordRequestForm, Depends()], sesi_db: AsyncSession = Depends(get_database)):

    userService = UserService(sesi_db)

    return await userService.login(form_data)

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/user/login")

@router_user.post("/logout", response_model=ResultUser[None])
async def logout(token: Annotated[str, Depends(oauth2_scheme)], sesi_db: AsyncSession = Depends(get_database)):
    userService = UserService(sesi_db)

    return await userService.logout(token)

@router_user.get("/aktif", response_model=ResultUser[UserResponse])
async def user_aktif(token: Annotated[str, Depends(oauth2_scheme)], sesi_db: AsyncSession = Depends(get_database)):
    userService = UserService(sesi_db)

    return await userService.user_aktif(token)