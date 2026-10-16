from pydantic import BaseModel, ConfigDict
from datetime import datetime
from typing import Generic, TypeVar, Optional

T = TypeVar("T")

class ParamedisResponse(BaseModel):
    id: int
    no_str: str
    no_sip: str

    spesialis_id: int
    nama: str

    created_at: datetime
    created_by: str
    modified_at: datetime | None
    modified_by: str | None

class ParamedisCreate(BaseModel):
    no_str: str
    no_sip: str
    spesialis_id: int

class ParamedisUpdate(BaseModel):
    no_str: str | None
    no_sip: str | None
    spesialis_id: int

class ResultParamedis(BaseModel, Generic[T]):
    status: int
    pesan: str
    data: Optional[T] = None