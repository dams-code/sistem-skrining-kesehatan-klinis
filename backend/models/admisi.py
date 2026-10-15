from sqlalchemy import String, Integer, ForeignKey, DateTime, func, Enum as sqlEnum
from sqlalchemy.orm import relationship, mapped_column, Mapped
from core.database import Base
from enum import Enum
from models.pasien import Pasien
from models.user import User
from models.klinis import Klinis
from typing import Optional

class StatusAdmisi(str, Enum):
    TERDAFTAR = "terdaftar"
    BATAL_PERIKSA = "batal"


class Admisi(Base):
    __tablename__ = "admisi"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    rm_id: Mapped[int] = mapped_column(ForeignKey("pasien.rm"), index=True, nullable=False)
    pasien_ref: Mapped["Pasien"] = relationship("Pasien", back_populates="admisi_ref", lazy='selectin')

    eps: Mapped[int] = mapped_column(Integer, index=True, nullable=False)

    dokter_id: Mapped[int] = mapped_column(ForeignKey("users.id"), nullable=False)
    user_ref: Mapped["User"] = relationship("User", back_populates="admisi_ref", lazy="selectin")

    nama_petugas: Mapped[str] = mapped_column(String(255), nullable=False)
    status_admisi: Mapped[StatusAdmisi] = mapped_column(sqlEnum(StatusAdmisi), nullable=False)

    klinis_ref: Mapped["Klinis"] = relationship("Klinis", back_populates="admisi_ref")

    created_at: Mapped[DateTime] = mapped_column(DateTime, server_default=func.now())
    created_by: Mapped[str] = mapped_column(String(50))
    modified_at: Mapped[Optional[DateTime]] = mapped_column(DateTime, onupdate=func.now(), nullable=True)
    modified_by: Mapped[Optional[str]] = mapped_column(String(50), nullable=True)


