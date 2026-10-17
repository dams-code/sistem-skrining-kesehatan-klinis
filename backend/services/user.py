
from repositories.user import UserRepository
from schemas.user import UserCreate
from sqlalchemy.ext.asyncio import AsyncSession
from schemas.user import ResultUser, UserResponse

from fastapi import HTTPException, status

class UserService:

    @staticmethod
    async def registrasi_user(registrasi_user: UserCreate, sesi_db: AsyncSession)-> ResultUser[UserResponse]:

        cek_user = await UserRepository.cek_user(registrasi_user, sesi_db)

        if cek_user is not None:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="User sudah terdaftar disistem"
            )

        if not registrasi_user.password or not registrasi_user.password.strip():
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Password User tidak boleh kosong"
            )

        hasil_registrasi_user = await UserRepository.buat_user(registrasi_user, sesi_db)

        if not hasil_registrasi_user:
            raise HTTPException(
                status_code = status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"Proses registrasi user gagal"
            )

        return ResultUser[UserResponse](
            status=status.HTTP_201_CREATED,
            pesan="Registrasi User Berhasil",
            data= UserResponse.model_validate(hasil_registrasi_user)
        )