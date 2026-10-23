import {cek_auth_token} from '../../services/token/cek_token';

const Backend_Url = import.meta.env.VITE_URL_Backend;

export const getSpesialis = async (nama) => {

    try{
        const parameterQuery = new URLSearchParams();

        if(nama) parameterQuery.append("nama", nama);

        const queryString = parameterQuery.toString() ? `?${parameterQuery.toString()}`: '';

        const response = await fetch(`${Backend_Url}/spesialis${queryString}`);

        const data = await response.json();

        if(!response.ok){
            return {
                success: false,
                pesan: "Gagal load data spesialis",
                detail: `Detail error ${data.detail}`
            }
        }

        return {
            success: true,
            pesan: "Data Spesialis berhasil terload",
            data: data
        }

    } catch(error){
        console.error(error);

        return {
            success: false,
            pesan: `Tidak dapat terhubung ke FastAPI endpoint ${error}`
        }
    }
} 

export const tambahSpesialis = async(dataNama) => {

    try{

        const response = await cek_auth_token(`${Backend_Url}/spesialis`, {
            method: "POST",
            body: JSON.stringify(dataNama)
        });

        const data = await response.json();

        if(!response.ok && response.status === 403){
            return {
                success: false,
                pesan: "Akses ditolak, Anda tidak memiliki hak akses (HR) untuk menambah atau mengubah data spesialis ini.",
                detail: `Detail error ${data.detail}`
            }

        } else if(!response.ok){
            console.error(data);
            
            return {
                success: false,
                pesan: `Gagal tambah data spesialis, ${data.pesan}`
            }
        }

        return {
            success: true,
            pesan: `Data spesialis ${dataNama.nama} berhasil ditambahkan`,
            data: data
        }

    } catch(error){
        console.error(error);
        
        return {
            success: false,
            pesan: `Tidak dapat terhubung ke FastAPI endpoint ${error}`
        };
    }
}