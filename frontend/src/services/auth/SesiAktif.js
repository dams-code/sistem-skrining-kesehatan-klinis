const Backend_Url = import.meta.env.VITE_URL_Backend;

import {cek_auth_token} from '../token/cek_token';

export const SesiAktif = async() => {
    try{

        const response = await cek_auth_token(`${Backend_Url}/user/aktif`);

        if(!response) return;

        const hasil = await response.json();

        console.log("user aktif: ", hasil.data.username);

        return {
            success: true,
            pesan: `Sesi aktif user ${hasil.data.username}`,
            data: hasil
        }
        
    } catch(err){

        console.error(`Cek Sesi User AKtif Gagal, ${err}`);

        return {
            success: false,
            pesan: `Cek Sesi User AKtif Gagal , ${err}`
        }
    }

}