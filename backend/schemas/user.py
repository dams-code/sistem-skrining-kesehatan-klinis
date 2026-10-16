from pydantic import BaseModel, ConfigDict
from datetime import datetime

from typing import Generic, TypeVar, Optional

T = TypeVar("T")

class UserResponse(BaseModel):
    id: int
    username: str
    nama_depan: str
    nama_belakang: str | None
    no_telp: str
    alamat: str
    status: bool = True

    jabatan_id: int
    nama_jabatan: str | None
    kategori: str | None
    prefix: str | None
    suffix: str | None

    paramedis_id: int
    no_str: str | None
    no_sip: str | None
    nama: str | None

    created_at: datetime
    created_by: str
    modified_at: datetime | None
    modified_by: str | None

    model_config = ConfigDict(from_attributes=True)

class UserPasssword(UserResponse):
    hashed_password: str

class UpdatePasswordUser(BaseModel):
    password_baru: str
    password_lama: str

class UserCreate(BaseModel):
    username: str
    nama_depan: str
    nama_belakang: str | None
    no_telp: str
    alamat: str
    status: bool = True
    jabatan_id: int
    paramedis_id: int | None

class UserUpdate(BaseModel):
    nama_depan: str | None
    nama_belakang: str | None
    no_telp: str | None
    alamat: str | None
    jabatan_id: int
    paramedis_id: int
    
class ResultUser(BaseModel, Generic[T]):
    status: int
    pesan: str
    data: Optional[T] = None

