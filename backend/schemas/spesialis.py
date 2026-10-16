from pydantic import BaseModel, ConfigDict
from datetime import datetime
from typing import Generic, TypeVar, Optional

T = TypeVar("T")
class SpesialisBase(BaseModel):
    nama: str

class SpesialisResponse(BaseModel):
    nama: str
    created_at: datetime
    created_by: str
    modify_at: datetime | None
    modify_by: str | None

    model_config = ConfigDict(from_attributes=True)

class ResultSpesialis(BaseModel, Generic[T]):
    status: int
    pesan: str
    data: Optional[T] = None