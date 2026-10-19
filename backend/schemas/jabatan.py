from pydantic import BaseModel, ConfigDict
from datetime import datetime
from typing import Optional, TypeVar, Generic

T = TypeVar("T")
class JabatanResponse(BaseModel):
    id: int
    nama_jabatan: str
    kategori: str
    created_at: datetime
    created_by: str
    modified_at: datetime | None
    modified_by: str | None

    model_config = ConfigDict(from_attributes=True)

class JabatanCreate(BaseModel):
    nama_jabatan: str
    kategori: str

class JabatanUpdate(BaseModel):
    nama_jabatan: str | None
    kategori: str | None

class ResultJabatan(BaseModel, Generic[T]):
    status: int
    pesan: str
    data: Optional[T] = None
