import { useEffect, useState } from "react";
import {getSpesialis, tambahSpesialis, editSpesialis, getSpesialisId} from '../../services/spesialis/Spesialis';
import Swal from 'sweetalert2';
import { FiEdit, FiPlus, FiSearch, FiTrash2 } from "react-icons/fi";
import Modal from '../../components/Modal';

export default function ListSpesialis(){

    const [dataSpesialis, setDataSpesialis] = useState([]);
    const [cariData, setCariData] = useState('');

    const [idSpesialis, setIdSpesialis] = useState('');
    const [namaSpesialis, setNamaSpesialis] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    const getDataSpesialis = async() => {
        const result = await getSpesialis(cariData);

        if(result && !result.success){
            Swal.fire({
                icon: "error",
                title: "Gagal get data spesialis",
                text: result?.pesan,
                timer: 2000,
                showConfirmButton: false
            });
            setDataSpesialis([]);

            return;
        }

        setDataSpesialis(result?.data?.data || []);
    }

    useEffect(() => {
        getDataSpesialis();
    }, [cariData])

    const dataNamaSpesialis = {
        nama: namaSpesialis
    }

    const handleTambahSpesialis = async(e) => {
        e.preventDefault();

        setErrorMsg('');

        if (namaSpesialis.toString().length > 0 && namaSpesialis !== undefined && namaSpesialis !== null){
            const result = await tambahSpesialis(dataNamaSpesialis);

            if(result.success){
                Swal.fire({
                    icon: "success",
                    title: "Tambah Data Spesialis Berhasil",
                    text: `Data spesialis ${namaSpesialis} berhasil ditambahkan`,
                    timer: 2000,
                    showConfirmButton: false
                });

                setNamaSpesialis('');

                await getDataSpesialis();

            } else {
                setErrorMsg(`Tambah Data Spesialis Gagal, cek kembali data yang diinput ${result.pesan}`)
                            
                Swal.fire({
                    icon: "error",
                    title: "Tambah Data Spesialis Gagal",
                    text: result.pesan
                });

                return;
            }
        } else {
            setErrorMsg(`Tambah Data Spesialis Gagal, Nama Spesialis Tidak Boleh Kosong`)
                            
            Swal.fire({
                icon: "error",
                title: "Tambah Data Spesialis Gagal",
                text: `Terjadi Kesalahan Tambah Data Spesialis ${result.pesan}`
            });

            return;
        }

    }

    const handleEditSpesialis = async(e) => {
        e.preventDefault();

        setErrorMsg('');
        
        if (namaSpesialis.toString().length > 0 && namaSpesialis !== undefined && namaSpesialis !== null){
            
            const result = await editSpesialis(idSpesialis, dataNamaSpesialis);

            if(result.success){

                const modalElement = document.getElementById("EditSpesialis");
                const modalInstance = bootstrap.Modal.getInstance(modalElement);

                if(modalInstance){
                    modalInstance.hide();
                }

                Swal.fire({
                    icon: "success",
                    title: "Edit Data Spesialis Berhasil",
                    text: `Edit Data spesialis ${namaSpesialis} berhasil`,
                    timer: 2000,
                    showConfirmButton: false
                });

                setNamaSpesialis('');

                await getDataSpesialis();

            } else {
                setErrorMsg(`Edit Data Spesialis Gagal, cek kembali data yang diinput ${result.pesan}`)
                            
                Swal.fire({
                    icon: "error",
                    title: "Edit Data Spesialis Gagal",
                    text: result.pesan
                });

                return;
            }
        } else {
            setErrorMsg(`Edit Data Spesialis Gagal, Nama Spesialis Tidak Boleh Kosong`)
                            
            Swal.fire({
                icon: "error",
                title: "Edit Data Spesialis Gagal",
                text: `Terjadi Kesalahan Edit Data Spesialis ${result.pesan}`
            });

            return;
        }

    }

    const handleGetSpesialisId = async(id) => {

        setErrorMsg('');

        const result = await getSpesialisId(id);

        if(result && result.success){
            setIdSpesialis(result?.data?.data.id || null);
            setNamaSpesialis(result?.data?.data.nama || "");
        } else {
            Swal.fire({
                icon: "error",
                title: "Get Data Spesialis Gagal",
                text: result.pesan,
                timer: 2000,
                showConfirmButton: false
            });

                        console.error(result);
        }

        
    }

    return (
        <div className="card border-0 shadow-sm rounded-4 p-4 bg-white">
            <div className="d-flex flex-column flex-md-row justify-content-between align-item-md-center gap-3 mb-2">
                <>
                    <h4 className="fw-bold mb-1 text-dark">Data Spesialis</h4>
                </>
            </div>

            <div style={{borderTop: "1px solid #ccc", marginBottom: '1rem'}}></div>

            <div className="d-flex align-items-center gap-2 flex-wrap">
                <div className="input-group input-group-sm" style={{width: '350px'}}>
                    <span className="input-group-text bg-light border-end-0 text-muted">
                        <FiSearch size={16} />
                    </span>
                    <input
                        type="text"
                        className="form-control bg-light shadow-none ps-1"
                        placeholder="Cari Spesialis"
                        value={cariData}
                        onChange={(e) => setCariData(e.target.value)}
                    />
                </div>

                <button className="btn btn-sm btn-primary d-flex align-items-center gap-1 px-3 shadow-none fw-medium" data-bs-toggle="modal" data-bs-target="#TambahSpesialis">
                    <FiPlus size={16}/>
                    <span>Tambah Spesialis</span>
                </button>
            </div>
            
            <div className="table-responsive mt-3">
                <table className="table table-hover align-middle mb-0">
                <thead>
                    <tr className="bg-light text-secondary border-bottom">
                        <th className="p-3 border-0 rounded-start-3 text-muted fw-semibold small" style={{width: '70px'}}>No</th>
                        <th className="p-3 border-0 text-muted fw-semibold small text-start">Nama Spesialis</th>
                        <th className="p-3 border-0 rounded-end-3 text-muted fw-semibold small text-center" style={{width: '120px'}}>Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        dataSpesialis.length > 0 ? (
                        
                            dataSpesialis.map((spesialis, index) => (
                                <tr key={spesialis.id || index} className="border-bottom">
                                    <td className="px-3 py-2 text-secondary fw-medium small">
                                        {index + 1}
                                    </td>
                                    <td className="px-3 py-2 fw-medium text-dark text-start">
                                        {spesialis.nama}
                                    </td>
                                    <td className="px-3 py-1 text-center">
                                        <div className="d-flex justify-content-center gap-2">
                                            <button className="btn btn-sm btn-outline-primary border-0 bg-primary bg-opacity-10 text-primary p-2 rounded-2 d-flex align-items-center justify-content-center shadow-none" data-bs-toggle="modal" data-bs-target="#EditSpesialis" onClick={() => handleGetSpesialisId(spesialis.id)}>
                                                <FiEdit size={15}/>
                                            </button>

                                            <button className="btn btn-sm btn-outline-danger border-0 bg-danger bg-opacity-10 text-danger p-2 rounded-2 d-flex align-items-center justify-content-center shadow-none">
                                                <FiTrash2 size={15}/>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            )) 
                        ) : (
                            <tr>
                                <td colSpan="4" className="text-center py-5 text-muted">
                                    <p className="mb-0 fw-medium">Data spesialis Tidak ada / Tidak ditemukan</p>
                                </td>
                            </tr>
                        )
                    }
                </tbody>
                </table>
            </div>

            <Modal id="TambahSpesialis" judul="Tambah Data Spesialis">
                <form onSubmit={handleTambahSpesialis}>
                     <div className="mb-3 text-start">
                        <label className="form-label fw-semibold">Nama Spesialis</label>
                        <input type="text" className="form-control" value={namaSpesialis} onChange={(e) => setNamaSpesialis(e.target.value)} />
                    </div>

                    {errorMsg && (
                        <p style={{color: '#ef4444', fontSize: '13px', textAlign: 'center', marginTop: '14px', lineHeight: '1.4'}}>{errorMsg}</p>
                    )}

                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Batal</button>
                        <button type="Submit" className="btn btn-primary">Simpan</button>
                    </div>
                </form>
            </Modal>

            <Modal id="EditSpesialis" judul="Edit Data Spesialis">
                <form onSubmit={handleEditSpesialis}>
                    <div className="mb-3 text-start">
                        <label className="form-label fw-semibold">Id Spesialis</label>
                        <input type="text" style={{width: '70px'}} className="fw-semibold text-center form-control" value={idSpesialis} onChange={(e) => setIdSpesialis(e.target.value)} readOnly disabled="True" />
                    </div>
                    <div className="mb-3 text-start">
                        <label className="form-label fw-semibold">Nama Spesialis</label>
                        <input type="text" className="form-control" value={namaSpesialis} onChange={(e) => setNamaSpesialis(e.target.value)} />
                    </div>

                    {errorMsg && (
                        <p style={{color: '#ef4444', fontSize: '13px', textAlign: 'center', marginTop: '14px', lineHeight: '1.4'}}>{errorMsg}</p>
                    )}

                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Batal</button>
                        <button type="Submit" className="btn btn-primary">Update</button>
                    </div>
                </form>
            </Modal>
        </div>
    )
}