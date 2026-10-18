from pydantic import BaseModel, ConfigDict
from datetime import datetime

from typing import Generic, TypeVar, Optional

T = TypeVar("T")

class UserResponse(BaseModel):
    id: int
    username: str
    nama_depan: str
    nama_belakang: str | None = None
    no_telp: str
    alamat: str
    status: bool = True

    jabatan_id: int
    nama_jabatan: str | None = None
    kategori: str | None = None
    prefix: str | None = None
    suffix: str | None = None

    paramedis_id: int | None = None
    no_str: str | None
    no_sip: str | None
    nama: str | None

    created_at: datetime
    created_by: str
    modified_at: datetime | None = None
    modified_by: str | None = None

    model_config = ConfigDict(from_attributes=True)

class UpdatePasswordUser(BaseModel):
    password_baru: str
    password_lama: str

class UserCreate(BaseModel):
    username: str
    nama_depan: str
    nama_belakang: str | None
    password: str
    no_telp: str
    alamat: str
    status: bool = True
    jabatan_id: int
    paramedis_id: int | None=None

class UserUpdate(BaseModel):
    nama_depan: str | None
    nama_belakang: str | None
    no_telp: str | None
    alamat: str | None
    jabatan_id: int
    paramedis_id: int

class Token(BaseModel):
    access_token: str
    token_type: str
    username: str

class ResultUser(BaseModel, Generic[T]):
    status: int
    pesan: str
    data: Optional[T] = None
    data_token: Optional[Token] = None

