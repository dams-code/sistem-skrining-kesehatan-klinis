from psycopg.errors import IdleInTransactionSessionTimeout
from pydantic import BaseModel, ConfigDict
from typing import Generic, TypeVar, Optional
from datetime import datetime

T = TypeVar("T")
class PasienResponse(BaseModel):
    id: int
    rm: int
    nama_depan: str
    nama_belakang: str | None
    jenis_kelamin: str
    golongan_darah: str
    alamat: str | None
    no_telp: str
    status: bool

    created_at: datetime
    created_by: str
    modified_at: datetime | None
    modified_by: str | None

    model_config = ConfigDict(from_attributes=True)

class PasienCreate(BaseModel):
    rm: int
    nama_depan: str
    nama_belakang: str | None
    jenis_kelamin: str
    golongan_darah: str
    alamat: str | None
    no_telp: str
    status: bool = True

class PasienUpdate(BaseModel):
    nama_depan: str | None
    nama_belakang: str | None
    jenis_kelamin: str | None
    golongan_darah: str | None
    alamat: str | None
    no_telp: str | None

class ResultPasien(BaseModel, Generic[T]):
    status: int
    pesan: str
    data: Optional[T] = None
