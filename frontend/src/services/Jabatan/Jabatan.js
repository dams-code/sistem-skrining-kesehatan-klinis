const Backend_Url = import.meta.env.VITE_URL_Backend;

export const getJabatan = async(params = {}) => {
    try{

        const parameterQuery = new URLSearchParams();

        if (params.nama_jabatan) parameterQuery.append("nama_jabatan", params.nama_jabatan);
        if (params.kategori) parameterQuery.append("kategori", params.kategori);

        const queryString = parameterQuery.toString() ? `?${parameterQuery.toString()}`: '';

        const response = await fetch(`${Backend_Url}/jabatan${queryString}`);

        if(!response.ok){
            return {
                success: false,
                pesan: "Get Data Jabatan Gagal",
                detail: `Detail error ${response.detail}`
            }
        };

        const result = await response.json();

        return {
            success: true,
            pesan: "Data Jabatan berhasil terload",
            data: result
        };

    } catch(error){
        return {
            success: false,
            pesan: "Tidak dapat terhubung ke FastAPI endpoint"
        };
    }
}

