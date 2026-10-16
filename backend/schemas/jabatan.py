from pydantic import BaseModel, ConfigDict
from datetime import datetime


class JabatanResponse(BaseModel):
    id: int
    nama_jabatan: str
    kategori: str
    prefix: str
    suffix: str
    created_at: datetime
    created_by: str
    modified_at: datetime | None
    modified_by: str | None

    model_config = ConfigDict(from_attributes=True)

class JabatanCreate(BaseModel):
    nama_jabatan: str
    kategori: str
    prefix: str
    suffix: str

class JabatanUpdate(BaseModel):
    nama_jabatan: str | None
    kategori: str | None
    prefix: str | None
    suffix: str | None


