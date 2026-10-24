import {cek_auth_token} from '../../services/token/cek_token';

const Backend_Url = import.meta.env.VITE_URL_Backend;

export const getSpesialis = async (nama) => {

    try{
        const parameterQuery = new URLSearchParams();

        if(nama) parameterQuery.append("nama", nama);

        const queryString = parameterQuery.toString() ? `?${parameterQuery.toString()}`: '';

        const response = await cek_auth_token(`${Backend_Url}/spesialis${queryString}`);

        const data = await response.json();

        if(!response.ok && response.status === 403){
            return {
                success: false,
                pesan: "Akses ditolak, Anda tidak memiliki hak akses (HR dan Super Admin) untuk melihat, menambah atau mengubah data spesialis ini.",
                detail: `Detail error ${data.pesan}`
            }

        } else if(!response.ok){
            console.error(data);
            
            return {
                success: false,
                pesan: `Gagal load data spesialis, ${data.pesan}`
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
                pesan: "Akses ditolak, Anda tidak memiliki hak akses (HR dan Super Admin) untuk melihat, menambah atau mengubah data spesialis ini.",
                detail: `Detail error ${data.pesan}`
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

export const getSpesialisId = async(id) =>{
    
    try{
        const response = await cek_auth_token(`${Backend_Url}/spesialis/${id}`);

        const data = await response.json();

        if(!response.ok && response.status === 403){
            return {
                success: false,
                pesan: "Akses ditolak, Anda tidak memiliki hak akses (HR dan Super Admin) untuk melihat, menambah atau mengubah data spesialis ini.",
                detail: `Detail error ${data.pesan}`
            }

        } else if(!response.ok){
            console.error(data);
            
            return {
                success: false,
                pesan: `Gagal load data spesialis, ${data.pesan}`
            }
        }

        return {
            success: true,
            pesan: `Data spesialis Id ${id} berhasil ter-load`,
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

export const editSpesialis = async(id, dataNama) => {

    try{
        const response = await cek_auth_token(`${Backend_Url}/spesialis/${id}`, {
            method: "PUT",
            body: JSON.stringify(dataNama)
        });

        const data = await response.json();

        if(!response.ok && response.status === 403){
            return {
                success: false,
                pesan: "Akses ditolak, Anda tidak memiliki hak akses (HR dan Super Admin) untuk melihat, menambah atau mengubah data spesialis ini.",
                detail: `Detail error ${data.pesan}`
            }

        } else if(!response.ok){
            
            return {
                success: false,
                pesan: `Gagal tambah data spesialis, ${data.pesan}`
            }
        }

        return {
            success: true,
            pesan: "Edit Spesialis berhasil",
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