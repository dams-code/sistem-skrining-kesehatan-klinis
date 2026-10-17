from sqlalchemy.orm import relationship, Mapped, mapped_column
from sqlalchemy import String, func, ForeignKey, DateTime
from core.database import Base
from datetime import datetime
from typing import Optional, TYPE_CHECKING

if TYPE_CHECKING:
    from models.user import User
    from models.spesialis import Spesialis

class Paramedis(Base):
    __tablename__ = "paramedis"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    kode_dokter: Mapped[str] = mapped_column(String(6), index=True, unique=True)
    
    no_str: Mapped[str] = mapped_column(String(50), unique=True, nullable=False)
    no_sip: Mapped[str] = mapped_column(String(50), unique=True, nullable=False)

    nama_depan: Mapped[str] = mapped_column(String(100), nullable=False)
    nama_belakang: Mapped[str] = mapped_column(String(100), nullable=True)

    prefix: Mapped[Optional[str]] = mapped_column(String(10), nullable=False)
    suffix: Mapped[Optional[str]] = mapped_column(String(30), nullable=False)

    spesialis_id: Mapped[int] = mapped_column(ForeignKey("spesialis.id"))
    spesialis_ref: Mapped["Spesialis"] = relationship("Spesialis", back_populates="paramedis_ref", lazy="selectin")

    @property
    def nama(self) -> str | None:
        return self.spesialis_ref.nama if self.spesialis_ref else None

    user_ref: Mapped["User"] = relationship("User", back_populates="paramedis_ref")

    created_at: Mapped[datetime] = mapped_column(DateTime, server_default=func.now())
    created_by: Mapped[str] = mapped_column(String(50))
    modified_at: Mapped[Optional[datetime]] = mapped_column(DateTime, onupdate=func.now(), nullable=True)
    modified_by: Mapped[Optional[str]] = mapped_column(String(50), nullable=True)


