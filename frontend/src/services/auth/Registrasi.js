const Backend_Url = import.meta.env.VITE_URL_Backend;

export const registrasiUser = async (DataUser) => {
    try{
        const response = await fetch(`${Backend_Url}/user/registrasi`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(DataUser),
        });

        const data = await response.json();

        if(!response.ok){
            return {
                success: false,
                pesan: "Registrasi User Gagal",
                detail: `Detail Error ${data.pesan}`
            };
        }

        return {
            success: true,
            pesan: "Registrasi User Sukses",
            data: data
        };
    } catch(error){
        console.error(`Registrasi Gagal ${error}`);
        
        return {
            success: false,
            pesan: `Tidak dapat terhubung ke FastAPI endpoint, ${error}`
        }
    }
}