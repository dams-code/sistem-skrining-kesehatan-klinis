from fastapi import APIRouter, Depends, Query
from sqlalchemy.ext.asyncio import AsyncSession
from core.database import get_database
from services.spesialis import SpesialisService
from schemas.spesialis import *
from typing import Annotated
from services.jabatan import CekJabatan
from models.jabatan import NamaJabatan

router_spesialis = APIRouter(prefix="/spesialis", tags=["Spesialis"])

@router_spesialis.get("", response_model=ResultSpesialis[list[SpesialisResponse]])
async def get_spesialis(nama: Annotated[str | None, Query()] = None, sesi_db: AsyncSession = Depends(get_database)):

    spesialisService = SpesialisService(sesi_db)

    return await spesialisService.get_spesialis(nama)

@router_spesialis.get("/{id}", response_model=ResultSpesialis[SpesialisResponse])
async def get_spesialis_id(id: int, sesi_db: AsyncSession = Depends(get_database)):

    spesialisService = SpesialisService(sesi_db)

    return await spesialisService.get_spesialis_id(id)

@router_spesialis.post("", response_model=ResultSpesialis[SpesialisResponse])
async def tambah_spesialis(spesialis: SpesialisBase, username_aktif: str = Depends(CekJabatan([NamaJabatan.HR])), sesi_db: AsyncSession = Depends(get_database)):

    spesialisService = SpesialisService(sesi_db)

    return await spesialisService.tambah_spesialis(spesialis, username_aktif)

@router_spesialis.put("/{id}", response_model=ResultSpesialis[SpesialisResponse])
async def update_spesialis(id: int, spesialis: SpesialisBase, username_aktif: str = Depends(CekJabatan([NamaJabatan.HR])), sesi_db: AsyncSession = Depends(get_database)):
    
    spesialisService = SpesialisService(sesi_db)

    return await spesialisService.update_spesialis(id, spesialis, username_aktif)