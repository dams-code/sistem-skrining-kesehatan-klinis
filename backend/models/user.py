from core.database import Base
from sqlalchemy.orm import relationship, mapped_column, Mapped
from sqlalchemy import String, Boolean, ForeignKey, Integer, DateTime, func
from typing import Optional, TYPE_CHECKING

if TYPE_CHECKING:
    from models.admisi import Admisi
    from models.jabatan import Jabatan
    from models.paramedis import Paramedis


class User(Base):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    username: Mapped[str] = mapped_column(String(50),unique=True, nullable=False, index=True)
    hashed_password: Mapped[str] = mapped_column(String(255))
    nama_depan: Mapped[str] = mapped_column(String(100), nullable=False)
    nama_belakang: Mapped[str] = mapped_column(String(100), nullable=True)
    no_telp: Mapped[int] = mapped_column(Integer)
    alamat: Mapped[str] = mapped_column(String(200))
    status: Mapped[bool] = mapped_column(Boolean, default=True)

    jabatan_id: Mapped[int] = mapped_column(ForeignKey("jabatan.id"))
    jabatan_ref: Mapped["Jabatan"] = relationship("Jabatan", back_populates="user_ref", lazy="selectin")

    @property
    def nama_jabatan(self) -> str | None:
        return self.jabatan_ref.nama_jabatan if self.jabatan_ref else None

    @property
    def kategori(self) -> str | None:
        return self.jabatan_ref.kategori if self.jabatan_ref else None

    @property
    def prefix(self) -> str | None:
        return self.jabatan_ref.prefix if self.jabatan_ref else None

    @property
    def suffix(self) -> str | None:
        return self.jabatan_ref.suffix if self.jabatan_ref else None

    paramedis_id: Mapped[int] = mapped_column(ForeignKey("paramedis.id"))
    paramedis_ref: Mapped[Optional["Paramedis"]] = relationship("Paramedis", back_populates="user_ref", lazy="selectin", uselist=False)

    admisi_ref: Mapped["Admisi"] = relationship("Admisi", back_populates="user_ref")

    created_at: Mapped[DateTime] = mapped_column(DateTime, server_default=func.now())
    created_by: Mapped[str] = mapped_column(String(50))
    modified_at: Mapped[Optional[DateTime]] = mapped_column(DateTime, onupdate=func.now(), nullable=True)
    modified_by: Mapped[Optional[str]] = mapped_column(String(50), nullable=True)

 



