from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from models.spesialis import Spesialis
from schemas.spesialis import *
from datetime import datetime

class SpesialisRepository:

    def __init__(self, sesi_db: AsyncSession):
        self.sesi_db = sesi_db

    async def get_spesialis(self, nama: str | None):

        query = select(Spesialis)

        if nama is not None:
            query = query.where(Spesialis.nama.ilike(f"%{nama}%"))

        result = await self.sesi_db.execute(query)

        return result.scalars().all()

    async def get_spesialis_id(self, id: int):

        query = select(Spesialis).where(Spesialis.id == id)

        result = await self.sesi_db.execute(query)

        return result.scalar_one_or_none()

    async def tambah_spesialis(self, spesialis: SpesialisBase, username_aktif: str):

        try:
            dataSpesialis = spesialis.model_dump()

            result_tambah_spesialis = Spesialis(
                **dataSpesialis,
                created_at= datetime.now(),
                created_by=username_aktif
            )

            self.sesi_db.add(result_tambah_spesialis)

            await self.sesi_db.flush()

            await self.sesi_db.commit()
            await self.sesi_db.refresh(result_tambah_spesialis)

            return result_tambah_spesialis

        except Exception as e:

            await self.sesi_db.rollback()
            raise e

