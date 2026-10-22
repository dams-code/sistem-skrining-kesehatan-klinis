from repositories.spesialis import SpesialisRepository
from sqlalchemy.ext.asyncio import AsyncSession
from schemas.spesialis import *
from fastapi import HTTPException, status

class SpesialisService:

    def __init__(self, sesi_db: AsyncSession):

        self.sesi_db = sesi_db

    async def get_spesialis(self, nama: str | None)-> ResultSpesialis[list[SpesialisResponse]]:

        spesialisRepositories = SpesialisRepository(self.sesi_db)

        get_data_spesialis = await spesialisRepositories.get_spesialis(nama)

        if get_data_spesialis is None or len(get_data_spesialis) == 0:
            
            raise HTTPException(
                status_code=status.HTTP_200_OK,
                detail="Data spesialis tidak ditemukan"
            )

        pesan = ""

        data_spesialis = [SpesialisResponse.model_validate(spesialis) for spesialis in get_data_spesialis]

        if nama is not None:
            pesan += f"Data spesialis dengan nama awalan {nama} ditemukan"
        else:
            pesan += f"Data Spesialis berhasil terload (total {len(data_spesialis)} Data)"

        return ResultSpesialis[list[SpesialisResponse]](
            status=status.HTTP_200_OK,
            pesan=pesan,
            data=data_spesialis
        )

    async def get_spesialis_id(self, id: int) -> ResultSpesialis[SpesialisResponse]:

        spesialisRepository = SpesialisRepository(self.sesi_db)

        get_data_spesialis_id = await spesialisRepository.get_spesialis_id(id)

        if get_data_spesialis_id is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Data spesialis id {id} tidak ditemukan"
            )

        return ResultSpesialis[SpesialisResponse](
            status=status.HTTP_200_OK,
            pesan=f"Data spesialis id {id} ditemukan",
            data=SpesialisResponse.model_validate(get_data_spesialis_id)
        )

    async def tambah_spesialis(self, spesialis: SpesialisBase, username_aktif: str) -> ResultSpesialis[SpesialisResponse]:

        try:
            spesialisRepository = SpesialisRepository(self.sesi_db)

            result_data_spesialis = await spesialisRepository.tambah_spesialis(spesialis, username_aktif)

            if result_data_spesialis is None:
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail="Gagal Tambah Data Spesialis"
                )

            return ResultSpesialis[SpesialisResponse](
                status=status.HTTP_201_CREATED,
                pesan=f"Tambah Data Spesialis Berhasil",
                data=result_data_spesialis
            )

        except Exception as e:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"Gagal Tambah Data Spesialis, {e}"
            )

