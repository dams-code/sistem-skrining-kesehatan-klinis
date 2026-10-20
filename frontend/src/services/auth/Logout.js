const Backend_Url = import.meta.env.VITE_URL_Backend;

export const LogoutUser = async () => {
    const get_token = localStorage.getItem("access_token");

    if(!get_token){
        window.location.replace("/login");
        return;
    }

    try{
        const response = await fetch(`${Backend_Url}/user/logout`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${get_token}`
            }
        });

        if(response.ok){
            localStorage.removeItem("access_token");

            return {
                success: true,
                kategori: "Sudah Logout",
                pesan: "Anda sudah logout"
            }

        } else {
            localStorage.removeItem("access_token");

            return {
                success: false,
                kategori: "Sesi Telah Berakhir",
                pesan: "Sesi telah berakhir, silahkan login kembali"
            }
        }
        
    } catch(err){

        console.error(`Gagal logout, ${err}`);

        localStorage.removeItem("access_token");
        window.location.replace("/login");

        return {
            success: false,
            kategori: "Gagal Logout",
            pesan: `Proses Logout gagal, ${err}`
        }
    }
}