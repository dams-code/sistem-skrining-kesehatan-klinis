from fastapi import APIRouter, Depends, status
from schemas.user import *
from services.user import UserService
from sqlalchemy.ext.asyncio import AsyncSession
from core.database import get_database
from fastapi.security import OAuth2PasswordRequestForm
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
