
from repositories.user import UserRepository
from schemas.user import UserCreate
from sqlalchemy.ext.asyncio import AsyncSession
from schemas.user import ResultUser, UserResponse

from fastapi import HTTPException, status

class UserService:

    def __init__(self, sesi_db: AsyncSession):
        self.sesi_db = sesi_db

    async def registrasi_user(self, registrasi_user: UserCreate)-> ResultUser[UserResponse]:

        userRepository = UserRepository(self.sesi_db)

        cek_user = await userRepository.cek_user(registrasi_user)

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

        hasil_registrasi_user = await userRepository.buat_user(registrasi_user)

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