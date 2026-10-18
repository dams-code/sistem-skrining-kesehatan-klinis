export const cek_auth_token = async (url, options={}) => {
    const token = localStorage.getItem("access_token");

    if(!token){
        throw new Error("TOken tidak ditemukan, Login terlebih dahulu");
    }

    options.headers = {
        ...options.headers,
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
    }

    try{
        const response = await fetch(url, options);

        if(response.status === 403){
            window.location.replace("/403.html");
            return null;

        }

        if(response.status === 401){
            localStorage.removeItem("access_token");

            window.location.href= "/login";
            return;
        }

        return response;

    } catch(error){

        console.error("Error cek auth token: ", error);
        
        throw error;
    }
}