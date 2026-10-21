
from datetime import timedelta
from repositories.user import UserRepository
from schemas.user import UserCreate
from sqlalchemy.ext.asyncio import AsyncSession
from schemas.user import ResultUser, UserResponse
from fastapi.security import OAuth2PasswordRequestForm
from fastapi import HTTPException, status
from helpers.helper_password import verify_password
from core.security import JWTToken

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

    async def login(self, form_data: OAuth2PasswordRequestForm) -> ResultUser[UserResponse]:

        userRepository = UserRepository(self.sesi_db)

        result_data_user = await userRepository.login_user(form_data)

        if result_data_user is None:
            raise HTTPException(
                status_code = status.HTTP_401_UNAUTHORIZED,
                detail=f"Username {form_data.username} tidak ditemukan",
                headers={"WWW-Authenticate": "Bearer"}
            )

        if not verify_password(form_data.password, result_data_user.hashed_password):
            raise HTTPException(
                status_code = status.HTTP_401_UNAUTHORIZED,
                detail=f"Password yang dimasukan salah",
                headers={"WWW-Authenticate": "Bearer"}
            )

        data_user = {
            "sub": result_data_user.username
        }

        access_token = JWTToken.create_access_token(data_user, expires_delta=timedelta(hours=1))

        return ResultUser[UserResponse](
            status=status.HTTP_200_OK,
            pesan=f"User {form_data.username} berhasil login",
            data=UserResponse.model_validate(result_data_user),
            data_token = {
                "access_token": access_token,
                "token_type": "bearer",
                "username":form_data.username
            }
        )

    async def logout(self, token: str)-> ResultUser[None]:

        try:
            cek_token = JWTToken.verify_access_token(token)

            return ResultUser[None](
                status=status.HTTP_200_OK,
                pesan="Anda berhasil logout"
            )

        except HTTPException as e:

            return ResultUser[None](
                status=status.HTTP_401_UNAUTHORIZED,
                pesan=e.detail
            )
            
    async def user_aktif(self, token: str)-> ResultUser[UserResponse]:

        userRepository = UserRepository(self.sesi_db)

        cek_token = JWTToken.verify_access_token(token)

        if cek_token is not None:
            
            result_data_user = await userRepository.user_aktif(cek_token.username)

            if result_data_user is None:
                raise HTTPException(
                    status_code=status.HTTP_404_NOT_FOUND,
                    detail="Username tidak ada / belum registrasi"
                )

            return ResultUser[UserResponse](
                status=status.HTTP_200_OK,
                pesan=f"User {cek_token} ditemukan",
                data=UserResponse.model_validate(result_data_user)
            )

        else:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail=f"Token expired, Login dahulu"
            )

