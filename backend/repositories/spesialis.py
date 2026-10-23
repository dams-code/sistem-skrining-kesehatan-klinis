from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from models.spesialis import Spesialis
from schemas.spesialis import SpesialisBase
from datetime import datetime
from fastapi import HTTPException, status

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
            query = select(Spesialis).where(Spesialis.nama == spesialis.nama)

            result = await self.sesi_db.execute(query)

            cek_spesialis = result.scalars().first()

            if cek_spesialis:
                raise HTTPException(
                    status_code =status.HTTP_400_BAD_REQUEST,
                    detail=f"Spesialis dengan nama '{spesialis.nama}' sudah ada di sistem."
                )

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

    async def update_spesialis(self, id: int, spesialis: SpesialisBase, username_aktif: str):

        query = select(Spesialis).where(Spesialis.id == id)

        result = await self.sesi_db.execute(query)

        result_data_spesialis = result.scalar_one_or_none()

        if result_data_spesialis is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Spesialis dengan id '{id}' tidak ditemukan"
            )
        
        dataSpesialis = spesialis.model_dump(exclude_unset=True)

        for key, item in dataSpesialis.items():
            setattr(result_data_spesialis, key, item)

        result_data_spesialis.modified_at = datetime.now()
        result_data_spesialis.modified_by = username_aktif

        await self.sesi_db.commit()
        await self.sesi_db.refresh(result_data_spesialis)

        return result_data_spesialis


