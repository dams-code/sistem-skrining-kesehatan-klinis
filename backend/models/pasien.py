
from sqlalchemy.orm import mapped_column, Mapped, relationship
from sqlalchemy import String, Boolean, Integer, DateTime, func, Enum as sqlEnum
from core.database import Base
from enum import Enum
from typing import Optional, TYPE_CHECKING
from datetime import datetime

if TYPE_CHECKING:
    from models.admisi import Admisi
class GolonganDarah(str, Enum):
    A = "A"
    B = "B"
    O = "O"
    AB = "AB"

class JenisKelamin(str, Enum):
    L = "L"
    P = "P"

class Pasien(Base):
    __tablename__ = "pasien"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    rm: Mapped[int] = mapped_column(Integer, unique=True, index=True)
    nama_depan: Mapped[str] = mapped_column(String(100), nullable=False, index=True)
    nama_belakang: Mapped[str] = mapped_column(String(100), nullable=True)
    jenis_kelamin: Mapped[JenisKelamin] = mapped_column(sqlEnum(JenisKelamin), nullable=False)
    golongan_darah: Mapped[GolonganDarah] = mapped_column(sqlEnum(GolonganDarah), nullable=False)
    alamat: Mapped[Optional[str]] = mapped_column(String(255), nullable=True)
    no_telp: Mapped[str] = mapped_column(String(14), nullable=False)
    status: Mapped[bool] = mapped_column(Boolean, default=True)

    admisi_ref: Mapped["Admisi"] = relationship("Admisi", back_populates="pasien_ref")

    created_at: Mapped[datetime] = mapped_column(DateTime, server_default=func.now())
    created_by: Mapped[str] = mapped_column(String(50))
    modified_at: Mapped[Optional[datetime]] = mapped_column(DateTime, onupdate=func.now(), nullable=True)
    modified_by: Mapped[Optional[str]] = mapped_column(String(50), nullable=True)