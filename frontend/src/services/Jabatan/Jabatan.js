const Backend_Url = import.meta.env.VITE_URL_Backend;

export const getJabatan = async(params = {}) => {
    try{

        const parameterQuery = new URLSearchParams();

        if (params.nama_jabatan) parameterQuery.append("nama_jabatan", params.nama_jabatan);
        if (params.kategori) parameterQuery.append("kategori", params.kategori);

        const queryString = parameterQuery.toString() ? `?${parameterQuery.toString()}`: '';

        const response = await fetch(`${Backend_Url}/jabatan${queryString}`);

        const data = await response.json();

        if(!response.ok){
            return {
                success: false,
                pesan: "Get Data Jabatan Gagal",
                detail: `Detail error ${data.detail}`
            }
        };

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

        const response = await fetch(`${Backend_Url}/jabatan/list-kategori`);

        if(!response.ok){

            return {
                success: false,
                pesan: "Get list kategori gagal",
                detail: `Detail Error ${response.detail}`
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

