const Backend_Url = import.meta.env.VITE_URL_Backend;

export const loginUser = async(username, password) => {
    try{

        const formData = new URLSearchParams();
        formData.append('username', username);
        formData.append('password', password);

        const response = await fetch(`${Backend_Url}/user/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: formData.toString()
        });

        const data = await response.json();

        if(!response.ok){
            return {
                success: false,
                pesan: "Login User Gagal",
                detail: `Detail Error ${data.pesan}`
            };
        }

        return {
            success: true,
            pesan: "Login User Berhasil",
            data: data
        }

    } catch(error){
        console.error(`Login Gagal ${error}`);

        return {
            success: false,
            pesan: `Tidak dapat terhubung ke FastAPI endpoint, ${error}`
        }
    }
}
