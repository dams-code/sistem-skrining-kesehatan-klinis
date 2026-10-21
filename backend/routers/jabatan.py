from fastapi import APIRouter, Depends, Query
from typing import Annotated
from schemas.jabatan import JabatanResponse, ResultJabatan
from sqlalchemy.ext.asyncio import AsyncSession
from services.jabatan import JabatanService
from core.database import get_database

router_jabatan = APIRouter(prefix="/jabatan", tags=["Jabatan"])

@router_jabatan.get("", response_model=ResultJabatan[list[JabatanResponse]])
async def get_jabatan(nama_jabatan: Annotated[str | None, Query()] = None, kategori: Annotated[str | None, Query()] = None, sesi_db: AsyncSession = Depends(get_database)):
    jabatanService = JabatanService(sesi_db)

    return await jabatanService.get_jabatan(nama_jabatan, kategori)

@router_jabatan.get("/{id}", response_model=ResultJabatan[JabatanResponse])
async def get_jabatan_id(id: int, sesi_db: AsyncSession = Depends(get_database)):

    jabatanService = JabatanService(sesi_db)

    return await jabatanService.get_jabatan_id(id)


