import sys
import asyncio
from pathlib import Path
from core.database import AsyncLocalSession
from sqlalchemy import select
from models.jabatan import Jabatan
from models.user import User
from models.paramedis import Paramedis
from models.spesialis import Spesialis
from models.admisi import Admisi
from models.pasien import Pasien
from models.klinis import Klinis

sys.path.append(str(Path(__file__).resolve().parent.parent))

async def SeedJabatan():

    async with AsyncLocalSession() as sesi_db:
        try:

            list_spesialis = [
                "Penyakit Dalam",
                "Anak",
                "Syaraf",
                "Umum"
            ]

            for nama_spesialis in list_spesialis:
                query = select(Spesialis).where(Spesialis.nama == nama_spesialis)
                result = await sesi_db.execute(query)
                cek_spesialis = result.scalars().first()

                if not cek_spesialis:
                    spesialis = Spesialis(
                        nama = nama_spesialis,
                        created_by="sistem"
                    )
                    sesi_db.add(spesialis)

            list_jabatan = [
                {
                    "nama_jabatan": "DOKTER_SPESIALIS", 
                    "kategori": "MEDIS"
                },
                {
                    "nama_jabatan": "DOKTER_UMUM",
                    "kategori": "MEDIS"
                },
                {
                    "nama_jabatan": "PERAWAT",
                    "kategori": "MEDIS"
                },
                {
                    "nama_jabatan": "ADMIN",
                    "kategori": "NON_MEDIS"
                },
                {
                    "nama_jabatan": "HR",
                    "kategori": "NON_MEDIS"
                },
                {
                    "nama_jabatan": "SUPERADMIN",
                    "kategori": "NON_MEDIS"
                }
            ]

            for data_jabatan in list_jabatan:
                query = select(Jabatan).where(Jabatan.nama_jabatan == data_jabatan["nama_jabatan"])

                result = await sesi_db.execute(query)

                cek_jabatan = result.scalars().first()

                if not cek_jabatan:
                    jabatan = Jabatan(
                        nama_jabatan = data_jabatan["nama_jabatan"],
                        kategori = data_jabatan["kategori"],
                        created_by = "sistem"
                    )
                    sesi_db.add(jabatan)

            await sesi_db.commit()

        except Exception as e:
            await sesi_db.rollback()
            print(f"Terjadi kesalahan seed data jabatan, ERR: {e}")


if __name__ == "__main__":
    asyncio.run(SeedJabatan())
