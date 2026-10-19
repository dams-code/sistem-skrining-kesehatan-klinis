import { useState } from 'react';
import {registrasiUser} from '../../services/auth/Registrasi';


export default function Registrasi(){
    const [username, setUsername] = useState('');
    const [namaDepan, setNamaDepan] = useState('');
    const [namaBelakang, setNamaBelakang] = useState('');
    const [password, setPassword] = useState('');
    const [konfirmPassword, setKonfirmPassword] = useState('');
    const [noTelp, setNoTelp] = useState('');
    const [alamat, setAlamat] = useState('');
    const [statusUser, setStatusUser] = useState(true);
    const [jabatanId, setJabatanId] = useState(0);
    const [pilihJabatan, setPilihJabatan] = useState()
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

        if (dataRegistrasi.password !== confirmPassword){
            alert("Password harus sama dengan konfirmasi password");
            return;
        }

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
            <div className="row col-md-12 mt-3 justify-content-center align-item-center">
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
                            <div className="row g-3">
                                <div className="col-md-6 text-start">
                                    <div className="mb-3">
                                        <label className="form-label fw-bold">Username</label>
                                        <input  
                                            type="text" 
                                            className="form-control" 
                                            value={username}
                                            onChange={(e) => setUsername(e.target.value)}
                                            placeholder="Masukkan username"
                                            required
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label fw-bold text-start">Nama Depan</label>
                                        <input  
                                            type="text" 
                                            className="form-control"
                                            value={namaDepan}
                                            onChange={(e) => setNamaDepan(e.target.value)}
                                            placeholder="Masukkan nama depan"
                                            required
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label fw-bold">Nama Belakang</label>
                                        <input  
                                            type="text" 
                                            className="form-control"
                                            value={namaBelakang}
                                            onChange={(e) => setNamaBelakang(e.target.value)}
                                            placeholder="Masukkan nama belakang"
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label fw-bold">No Telepon</label>
                                        <input  
                                            type="text" 
                                            className="form-control"
                                            value={noTelp}
                                            onChange={(e) => setNoTelp(e.target.value)}
                                            placeholder="Contoh: 08123456789"
                                        />
                                    </div>
                                </div>

                                <div className="col-md-6 text-start">
                                    <div className="mb-3">
                                        <label className="form-label fw-bold">Password</label>
                                        <input  
                                            type="password" 
                                            className="form-control" 
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            placeholder="Minimal 6 karakter"
                                            required
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label fw-bold">Konfirmasi Password</label>
                                        <input  
                                            type="password" 
                                            className="form-control"
                                            value={konfirmPassword}
                                            onChange={(e) => setKonfirmPassword(e.target.value)}
                                            placeholder="Input ulang password"
                                            required
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label fw-bold">Alamat</label>
                                        <input  
                                            type="text" 
                                            className="form-control"
                                            value={alamat}
                                            onChange={(e) => setAlamat(e.target.value)}
                                            placeholder="Alamat domisili lengkap"
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="list_jabatan" className="form-label fw-bold">Jabatan / Hak Akses</label>
                                        <select 
                                            className="form-select" 
                                            id="list_jabatan"
                                            value={pilihJabatan} 
                                            onChange={(e) => setPilihJabatan(e.target.value)}
                                            required
                                        >
                                            <option value="">-- Pilih Jabatan --</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            {errorMsg && (
                                <p style={{color: '#ef4444', fontSize: '13px', textAlign: 'center', marginTop: '14px', lineHeight: '1.4'}}>{errorMsg}</p>
                            )}

                            <div className="g-3 text-end mt-4">
                                <button className="btn btn-primary mx-auto" type="button">Registrasi</button>
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
