
from sqlalchemy import select, or_, String
from sqlalchemy.ext.asyncio import AsyncSession
from models.jabatan import Jabatan

class JabatanRepository:

    def __init__(self, sesi_db: AsyncSession):
        self.sesi_db = sesi_db

    async def get_jabatan(self, nama_jabatan: str | None, kategori: str | None):

        query = select(Jabatan)

        conditions = []

        if nama_jabatan is not None:
            conditions.append(Jabatan.nama_jabatan.ilike(f"%{nama_jabatan}%"))

        if kategori is not None:
            conditions.append(Jabatan.kategori.ilike(f"%{kategori}%"))

        if conditions:
            query = query.where(or_(*conditions))

        result = await self.sesi_db.execute(query)

        return result.scalars().all()

    async def get_jabatan_id(self, id: int):

        query = select(Jabatan).where(Jabatan.id == id)

        result = await self.sesi_db.execute(query)

        return result.scalar_one_or_none()


