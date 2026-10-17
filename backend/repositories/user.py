from models.user import User
from schemas.user import UserCreate
from core.database import get_database
from helpers.helper_password import *
from sqlalchemy import select, func
from sqlalchemy.ext.asyncio import AsyncSession
from datetime import datetime

class UserRepository:

    @staticmethod
    async def cek_user(user: UserCreate, sesi_db: AsyncSession):
        query = select(User).where(func.lower(User.username) == user.username.lower())

        result = await sesi_db.execute(query)

        return result.scalars().one_or_none()

    @staticmethod
    async def buat_user(user: UserCreate, sesi_db: AsyncSession):

        get_data_user = user.model_dump(exclude_unset=True)

        get_data_user.pop("password", None)

        hashed_password = get_password_hash(password=user.password)

        get_data_user["hashed_password"] = hashed_password

        result_buat_user = User(
            **get_data_user,
            created_at = datetime.now(),
            created_by=user.username
        )

        sesi_db.add(result_buat_user)

        await sesi_db.commit()
        await sesi_db.refresh(result_buat_user)

        return result_buat_user


        

