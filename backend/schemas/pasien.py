from pydantic import BaseModel, ConfigDict

from datetime import datetime

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
    nama_depan: str | None=None
    nama_belakang: str | None=None
    jenis_kelamin: str | None=None
    golongan_darah: str | None=None
    alamat: str | None=None
    no_telp: str | None=None


