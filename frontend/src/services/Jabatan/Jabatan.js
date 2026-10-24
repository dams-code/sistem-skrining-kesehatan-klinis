import { cek_auth_token } from "../token/cek_token";

const Backend_Url = import.meta.env.VITE_URL_Backend;

export const getJabatan = async(params = {}) => {
    try{

        const parameterQuery = new URLSearchParams();

        if (params.nama_jabatan) parameterQuery.append("nama_jabatan", params.nama_jabatan);
        if (params.kategori) parameterQuery.append("kategori", params.kategori);

        const queryString = parameterQuery.toString() ? `?${parameterQuery.toString()}`: '';

        const response = await cek_auth_token(`${Backend_Url}/jabatan${queryString}`);

        const data = await response.json();

        if(!response.ok && response.status === 403){
            return {
                success: false,
                pesan: "Akses ditolak, Anda tidak memiliki hak akses (HR dan Super Admin) untuk melihat, menambah atau mengubah data Jabatan ini.",
                detail: `Detail error ${data.pesan}`
            }

        } else if(!response.ok){
            
            return {
                success: false,
                pesan: `Gagal Get Data Jabatan, ${data.pesan}`
            }
        }

        return {
            success: true,
            pesan: "Data Jabatan berhasil terload",
            data: data
        };

    } catch(error){
        console.error(error);
        
        return {
            success: false,
            pesan: `Tidak dapat terhubung ke FastAPI endpoint ${error}`
        };
    }
}

export const getListKategori = async() => {
    try{

        const response = await cek_auth_token(`${Backend_Url}/jabatan/list-kategori`);

        if(!response.ok && response.status === 403){
            return {
                success: false,
                pesan: "Akses ditolak, Anda tidak memiliki hak akses (HR dan Super Admin) untuk melihat, menambah atau mengubah data Jabatan ini.",
                detail: `Detail error ${data.pesan}`
            }

        } else if(!response.ok){
            
            return {
                success: false,
                pesan: `Gagal Get list kategori, ${data.pesan}`
            }
        }

        const result = await response.json();

        return {
            success: true,
            pesan: "Data list kategori berhasil ter-load",
            data: result
        }

    } catch(error){
        console.error(error);

        return {
            success: false,
            pesan: `Tidak dapat terhubung ke FastAPI endpoint ${error}`
        }
    }
}

