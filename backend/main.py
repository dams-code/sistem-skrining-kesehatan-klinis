from fastapi.responses import JSONResponse
from fastapi import HTTPException, FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from routers.user import router_user
from routers.jabatan import router_jabatan
from routers.spesialis import router_spesialis
import models

app = FastAPI()

@app.exception_handler(HTTPException)
async def set_format_json_handler(request: Request, exc: HTTPException):
    return JSONResponse(
        status_code = exc.status_code,
        content={
            "status": exc.status_code,
            "pesan": str(exc.detail),
            "data": None
        }
    )

app.include_router(router_user)
app.include_router(router_jabatan)
app.include_router(router_spesialis)

# @app.get("/")
# async def cek_main():
#     return {"pesan": "Test"}


origins = [
    "http://127.0.0.1:8000",
    "http://localhost:8080",
    "http://localhost:5173",
    "http://localhost:3000",
]

app.add_middleware(CORSMiddleware, allow_origins=origins, allow_credentials=True, allow_methods=["*"], allow_headers=["*"])
