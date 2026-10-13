const Backend_Url = 'http://127.0.0.1:8000';

export const fetchBackEndApi = async (endpoint) => {
    try{
        const response = await fetch(`${Backend_Url}${endpoint}`)

        if(!response.ok){
            throw new Error(`Get FastAPI Endpoint Error, ${response.status}`);
        }

        return await response.json();
    } catch(error){
        console.error("Gagal melakukan fetch data: ", error);
        throw error;
    }
}
