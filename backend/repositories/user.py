from models.user import User
from schemas.user import UserCreate
from core.database import get_database
from helpers.helper_password import *
from sqlalchemy import select, func
from sqlalchemy.ext.asyncio import AsyncSession
from datetime import datetime
from fastapi.security import OAuth2PasswordRequestForm

class UserRepository:
    def __init__(self, sesi_db: AsyncSession):
        self.sesi_db = sesi_db
        
    async def cek_user(self, user: UserCreate):
        query = select(User).where(func.lower(User.username) == user.username.lower())

        result = await self.sesi_db.execute(query)

        return result.scalar_one_or_none()

    async def buat_user(self, user: UserCreate):

        get_data_user = user.model_dump(exclude_unset=True)

        get_data_user.pop("password", None)

        hashed_password = get_password_hash(password=user.password)

        get_data_user["hashed_password"] = hashed_password

        result_buat_user = User(
            **get_data_user,
            created_at = datetime.now(),
            created_by=user.username
        )

        self.sesi_db.add(result_buat_user)

        await self.sesi_db.commit()
        await self.sesi_db.refresh(result_buat_user)

        return result_buat_user

    async def login_user(self, form_data: OAuth2PasswordRequestForm):
        query = select(User).where(func.lower(User.username) == form_data.username.lower())

        result = await self.sesi_db.execute(query)

        return result.scalar_one_or_none()

        



        

