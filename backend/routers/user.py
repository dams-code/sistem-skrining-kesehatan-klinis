from fastapi import APIRouter, Depends, status
from schemas.user import *
from services.user import UserService
from sqlalchemy.ext.asyncio import AsyncSession
from core.database import get_database

router_user = APIRouter(prefix="/user", tags=["User"])

@router_user.post("", response_model=ResultUser[UserResponse], status_code=status.HTTP_201_CREATED)
async def tambah_user(user: UserCreate, sesi_db: AsyncSession = Depends(get_database)):
    
    userService = UserService(sesi_db)
    
    return await userService.registrasi_user(user)


