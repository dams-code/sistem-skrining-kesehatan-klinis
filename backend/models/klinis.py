from core.database import Base
from sqlalchemy import String, DateTime, func, ForeignKey
from sqlalchemy.dialects.postgresql import JSONB
from sqlalchemy.orm import Mapped, mapped_column, relationship
from typing import Optional, Dict, Any, TYPE_CHECKING
from datetime import datetime

if TYPE_CHECKING:
    from models.admisi import Admisi

class Klinis(Base):
    __tablename__ = "klinis"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    admisi_id: Mapped[int] = mapped_column(ForeignKey("admisi.id"), index=True, nullable=False)

    form: Mapped[str] = mapped_column(String(255), index=True, nullable=False)

    data: Mapped[Dict[str, Any]] = mapped_column(JSONB, nullable=False)

    admisi_ref: Mapped["Admisi"] = relationship("Admisi", back_populates="klinis_ref", lazy="selectin")

    created_at: Mapped[datetime] = mapped_column(DateTime, server_default=func.now())
    created_by: Mapped[str] = mapped_column(String(50))
    modified_at: Mapped[Optional[datetime]] = mapped_column(DateTime, onupdate=func.now(), nullable=True)
    modified_by: Mapped[Optional[str]] = mapped_column(String(50), nullable=True)
