from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import String, func, DateTime
from core.database import Base
from typing import Optional, TYPE_CHECKING

if TYPE_CHECKING:
    from models.paramedis import Paramedis

class Spesialis(Base):
    __tablename__ = "spesialis"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    nama: Mapped[str] = mapped_column(String(50), unique=True, nullable=False, index=True)

    paramedis_ref: Mapped["Paramedis"] = relationship("Paramedis", back_populates="spesialis_ref")
    
    created_at: Mapped[DateTime] = mapped_column(DateTime, server_default=func.now())
    created_by: Mapped[str] = mapped_column(String(50))
    modified_at: Mapped[Optional[DateTime]] = mapped_column(DateTime, onupdate=func.now(), nullable=True)
    modified_by: Mapped[Optional[str]] = mapped_column(String(50), nullable=True)
