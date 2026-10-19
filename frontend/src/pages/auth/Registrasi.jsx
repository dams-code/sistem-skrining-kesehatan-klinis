import { useState } from 'react';
import {registrasiUser} from '../../services/auth/Registrasi';


export default function Registrasi(){
    const [username, setUsername] = useState('');
    const [namaDepan, setNamaDepan] = useState('');
    const [namaBelakang, setNamaBelakang] = useState('');
    const [password, setPassword] = useState('');
    const [noTelp, setNoTelp] = useState('');
    const [alamat, setAlamat] = useState('');
    const [statusUser, setStatusUser] = useState(true);
    const [jabatanId, setJabatanId] = useState(0);
    const [paramedisId, setParamedisId] = useState(0);

    const dataRegistrasi = {
        username: username,
        namaDepan: namaDepan,
        namaBelakang: namaBelakang,
        password: password,
        noTelp: noTelp,
        alamat: alamat,
        statusUser: statusUser,
        jabatanId: jabatanId,
        paramedisId: paramedisId
    };

    const [errorMsg, setErrorMsg] = useState('');
    const [loading, setLoading] = useState(false);

    const handleRegistrasi = async(e) => {
        e.preventDefault();

        setErrorMsg('');
        setLoading(true);

        const result = await registrasiUser(dataRegistrasi);

        setLoading(false);

        if (result.success){
            alert("Registrasi Berhasil");
            window.location.href = "/login";
            
        } else {

            setErrorMsg(`Registrasi Gagal, cek kembali data yang diinput ${result.pesan}`)
        }
    }

    return (
        <div className="container-fluid d-flex justify-content-center align-item-center">
            <div className="row col-md-6 mt-3 justify-content-center align-item-center">
                <div className="card shadow-sm p-3 mb-5 bg-body rounded">
                    <div className="card-body justify-content-center">
                        <form onSubmit={handleRegistrasi}>
                            <div className="row mb-1">
                                <div className="col-12">
                                    <a href="/login" className="d-flex gap-2">
                                        <i className="bi bi-arrow-bar-left align-content-center"></i>
                                        <p className="m-0 p-0 align-content-center">Login, jika sudah punya akun</p>
                                    </a>
                                </div>
                            </div>
                            
                            <div style={{borderTop: "1px solid #ccc", marginTop: "18px", paddingTop: "5px"}}></div>

                            <div className="row" style={{marginBottom: "1.5em", marginTop: "1.25rem"}}>
                                <div className="col-12 text-start">
                                    <h3 className="fs-2 fw-bold">Registrasi User</h3>
                                    <p className="fs-5 fw-light">Sistem Skrining Kesehatan Klinis</p>
                                </div>
                            </div>
                            <div className="row align-item-center d-grid mb-3">
                                <div className="col-3 text-start w-100">
                                    <label htmlFor="username" className="form-label fw-bold">Username</label>
                                </div>
                                <div className="col-auto">
                                    <input className="form-control" id="username"/>
                                </div>
                            </div>
                            <div className="row align-item-center d-grid mb-4">
                                <div className="col-3 text-start w-100">
                                    <label htmlFor="nama" className="form-label fw-bold text-start">Nama</label>
                                </div>
                                <div className="col-auto">
                                    <input type="text" className="form-control" id="nama"/>
                                </div>
                            </div>
                            <div className="row align-item-center d-grid mb-3">
                                <div className="col-3 w-100 text-start">
                                    <label htmlFor="password" className="form-label fw-bold">Password</label>
                                </div>
                                <div className="col-auto">
                                    <input type="password" className="form-control" id="password"/>
                                </div>
                            </div>
                            <div className="row align-item-center d-grid mb-3">
                                <div className="col-3 w-100 text-start">
                                    <label htmlFor="conf_password" className="form-label fw-bold">Konfirmasi Password</label>
                                </div>
                                <div className="col-auto">
                                    <input type="password" className="form-control" id="conf_password"/>
                                </div>
                            </div>
                            <div className="row align-item-center d-grid mb-4">
                                <div className="col-3 align-content-center w-100 text-start">
                                    <label htmlFor="list_role" className="form-label fw-bold">Jabatan</label>
                                </div>
                                <div className="col-auto">
                                <select className="form-select" id="list_jabatan"></select> 
                                </div>
                            </div> 

                            <div className="g-3">
                                <button className="btn btn-primary mx-auto" type="button" style={{width: "100%"}}>Registrasi</button>
                            </div>

                            <div style={{borderTop: "1px solid #ccc", marginTop: "18px", paddingTop: "5px"}}></div>

                            <p className="text-start fw-light">@2026 Damar Djati Wahyu Kemala</p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
