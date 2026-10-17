from sqlalchemy.orm import relationship, Mapped, mapped_column
from sqlalchemy import String, DateTime, func, Enum as sqlEnum
from core.database import Base
from datetime import datetime
from enum import Enum
from typing import Optional, TYPE_CHECKING

if TYPE_CHECKING:
    from models.user import User
class NamaJabatan(str, Enum):
    DOKTER_SPESIALIS = "Dokter Spesialis"
    DOKTER_UMUM = "Dokter Umum"
    PERAWAT = "Perawat"
    ADMIN = "Admin"
    HR = "HR"
    SUPERADMIN = "Super Admin"
    
class Jabatan(Base):
    __tablename__ = "jabatan"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    
    nama_jabatan: Mapped[NamaJabatan] = mapped_column(sqlEnum(NamaJabatan), nullable=False, index=True)

    kategori: Mapped[str] = mapped_column(String(20), default="NON_MEDIS")
    user_ref: Mapped["User"] = relationship("User", back_populates="jabatan_ref")

    created_at: Mapped[datetime] = mapped_column(DateTime, server_default=func.now())
    created_by: Mapped[str] = mapped_column(String(50))
    modified_at: Mapped[Optional[datetime]] = mapped_column(DateTime, onupdate=func.now(), nullable=True)
    modified_by: Mapped[Optional[str]] = mapped_column(String(50), nullable=True)

