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