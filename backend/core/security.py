
import os
import jwt
from datetime import timezone, datetime, timedelta
from fastapi import HTTPException, status
from dotenv import load_dotenv
from schemas.token import TokenData
from jwt.exceptions import InvalidTokenError, ExpiredSignatureError
from pathlib import Path

pathEnv = Path(__file__).resolve().parent.parent.parent / ".env"

load_dotenv(dotenv_path=pathEnv)

GET_SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = "HS256"

class JWTToken:
    if GET_SECRET_KEY is None:
        raise RuntimeError("File .env tidak ditemukan")

    @staticmethod
    def create_access_token(data: dict, expires_delta: timedelta | None=None):
        encode_data = data.copy()

        if expires_delta:
            expires = datetime.now(timezone.utc) + expires_delta
        else:
            expires = datetime.now(timezone.utc) + timedelta(minutes=15)

        if len(GET_SECRET_KEY.encode("UTF-8")) < 32:
            raise ValueError("Secret key pendek, set minim 32 karakter")

        encode_data.update({"exp": expires})

        jwt_encode = jwt.encode(encode_data, GET_SECRET_KEY, algorithm=ALGORITHM)

        return jwt_encode


    @staticmethod
    def verify_access_token(token:str) -> TokenData:
 
        try:
            payload = jwt.decode(token, GET_SECRET_KEY, algorithms=[ALGORITHM])

            username = payload.get('sub')

            if username is None:
                raise HTTPException(
                    status_code=status.HTTP_401_UNAUTHORIZED,
                    detail = "Validasi kridensial token gagal",
                    headers={"WWW-Authenticate": "Bearer"}
                )
            
            token_data = TokenData(username)

            return token_data

        except ExpiredSignatureError:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Token expired, Login dahulu",
                headers={"WWW-Authenticate": "Bearer"}
            )
            
        except InvalidTokenError:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail = "Validasi kridensial token gagal",
                headers={"WWW-Authenticate": "Bearer"}
            )
        