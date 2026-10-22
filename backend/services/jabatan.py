from repositories.jabatan import JabatanRepository
from schemas.jabatan import ResultJabatan, JabatanResponse
from fastapi import HTTPException, status, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from models.jabatan import Kategori, NamaJabatan
from services.user import UserService
from enum import Enum
from core.database import get_database
from fastapi.security import OAuth2PasswordBearer
from typing import Annotated

class JabatanService:

    def __init__(self, sesi_db: AsyncSession):
        self.sesi_db = sesi_db

    async def get_jabatan(self, nama_jabatan: str | None, kategori: str | None)-> ResultJabatan[list[JabatanResponse]]:

        jabatanRepository = JabatanRepository(self.sesi_db)

        get_data_jabatan = await jabatanRepository.get_jabatan(nama_jabatan, kategori)

        if get_data_jabatan is None or len(get_data_jabatan) == 0:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Data jabatan tidak ditemukan"
            )

        pesan = ""

        data_jabatan = [JabatanResponse.model_validate(jabatan) for jabatan in get_data_jabatan]

        if nama_jabatan is not None:
            pesan += f"Pencarian Data Jabatan dengan nama awalan {nama_jabatan} ditemukan"
        elif kategori is not None:
            pesan += f"Pencarian Data Jabatan dengan kategori awalan {kategori} ditemukan"
        else:
            pesan += f"Data Jabatan berhasil terload (total {len(data_jabatan)} Data)"

        return ResultJabatan[list[JabatanResponse]](
            status=status.HTTP_200_OK,
            pesan=pesan,
            data= data_jabatan
        )

    async def get_jabatan_id(self, id: int)-> ResultJabatan[JabatanResponse]:

        jabatanRepository = JabatanRepository(self.sesi_db)

        get_data_jabatan_id = await jabatanRepository.get_jabatan_id(id)

        if get_data_jabatan_id is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail= f"Data Jabatan Id {id} tidak ditemukan"
            )

        return ResultJabatan[JabatanResponse](
            status=status.HTTP_200_OK,
            pesan= f"Data Jabatan Id {id} ditemukan",
            data = JabatanResponse.model_validate(get_data_jabatan_id)
        )

    async def list_kategori(self):
        jabatanRepository = JabatanRepository(self.sesi_db)

        dataKategori = [{"label": data.name, "value": data.value} for data in Kategori]

        return {
            "status": status.HTTP_200_OK,
            "pesan": "Data list kategori ditemukan",
            "data": dataKategori
        }

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/user/login")

def CekJabatan(jabatan: list[NamaJabatan]):
    
    async def cekData(token: Annotated[str, Depends(oauth2_scheme)], sesi_db: AsyncSession = Depends(get_database)):
        
        userService = UserService(sesi_db)

        jabatan_user = await userService.user_aktif(token)
        
        user_data = jabatan_user.data if hasattr(jabatan_user, "data") else jabatan_user
        nama_jabatan_user = user_data.nama_jabatan

        list_jabatan = [r.value if isinstance(r, Enum) else str(r) for r in jabatan]

        if nama_jabatan_user not in list_jabatan:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail=f"Akses ditolak, Halaman ini hanya dapat diakses oleh user dengan jabatan {list_jabatan}"
            )

        return user_data.username

    return cekData

