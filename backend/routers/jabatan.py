from fastapi import APIRouter, Depends, Query
from typing import Annotated
from schemas.jabatan import JabatanResponse, ResultJabatan
from sqlalchemy.ext.asyncio import AsyncSession
from services.jabatan import JabatanService, CekJabatan
from core.database import get_database
from models.jabatan import NamaJabatan

router_jabatan = APIRouter(prefix="/jabatan", tags=["Jabatan"])

@router_jabatan.get("", response_model=ResultJabatan[list[JabatanResponse]], dependencies=[Depends(CekJabatan([NamaJabatan.HR, NamaJabatan.SUPERADMIN]))])
async def get_jabatan(nama_jabatan: Annotated[str | None, Query()] = None, kategori: Annotated[str | None, Query()] = None, sesi_db: AsyncSession = Depends(get_database)):
    jabatanService = JabatanService(sesi_db)

    return await jabatanService.get_jabatan(nama_jabatan, kategori)

@router_jabatan.get("/list-kategori", dependencies=[Depends(CekJabatan([NamaJabatan.HR, NamaJabatan.SUPERADMIN]))])
async def list_kategori(sesi_db: AsyncSession = Depends(get_database)):

    jabatanService = JabatanService(sesi_db)

    return await jabatanService.list_kategori()


@router_jabatan.get("/{id}", response_model=ResultJabatan[JabatanResponse], dependencies=[Depends(CekJabatan([NamaJabatan.HR, NamaJabatan.SUPERADMIN]))])
async def get_jabatan_id(id: int, sesi_db: AsyncSession = Depends(get_database)):

    jabatanService = JabatanService(sesi_db)

    return await jabatanService.get_jabatan_id(id)

