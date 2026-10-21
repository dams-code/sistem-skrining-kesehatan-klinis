import { useEffect, useState } from 'react';
import {getJabatan} from '../../services/Jabatan/Jabatan';
import Swal from 'sweetalert2';
import { FiSearch, FiFilter, FiPlus, FiEdit, FiDelete } from 'react-icons/fi';

export default function ListJabatan(){
    const [dataJabatan, setDataJabatan] = useState([]);
    const [cariData, setCariData] = useState('');

    useEffect(() => {
       const getDataJabatan = async() => {
            try{
                
                const result = await getJabatan({
                    nama_jabatan: cariData,
                    kategori: cariData
                });

                if(result && !result.success){
                    Swal.fire({
                        icon: "error",
                        title: "Gagal Get Data Jabatan",
                        text: result?.pesan,
                        timer: 2000,
                        showConfirmButton: false
                    });
                    setDataJabatan([]);

                    return;
                }

                setDataJabatan(result?.data?.data || []);
            } catch(err){
                console.error(`Gagal get data jabatan, ${err}`);
                setDataJabatan([]);
                Swal.fire({
                    icon: "error",
                    title: "Gagal get data jabatan",
                    text: err.message,
                    timer: 2000,
                    showConfirmButton: false
                });
            }
       }

       getDataJabatan();
    }, [cariData]);

    return (
        <div className="card border-0 shadow-sm rounded-4 p-4 bg-white">

            <div className="d-flex flex-column flex-md-row justify-content-between align-item-md-center gap-3 mb-2">
                <>
                    <h4 className="fw-bold mb-1 text-dark">Data Jabatan</h4>
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
                        placeholder="Cari jabatan"
                        value={cariData}
                        onChange={(e) => setCariData(e.target.value)}
                    />
                </div>

                <button className="btn btn-sm btn-primary d-flex align-items-center gap-1 px-3 shadow-none fw-medium">
                    <FiPlus size={16}/>
                    <span>Tambah Jabatan</span>
                </button>
            </div>
            
            <div className="table-responsive">
                <table className="table table-hover align-middle mb-0">
                <thead>
                    <tr className="bg-light text-secondary border-0">
                        <th className="p-3 border-0 rounded-start-3 text-muted fw-semibold small" style={{width: '70px'}}>No</th>
                        <th className="p-3 border-0 text-muted fw-semibold small text-start">Nama Jabatan</th>
                        <th className="p-3 border-0 text-muted fw-semibold small">Kategori</th>
                        <th className="p-3 border-0 rounded-end-3 text-muted fw-semibold small text-center" style={{width: '120px'}}>Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        dataJabatan.length > 0 ? (
                        
                            dataJabatan.map((jabatan, index) => (
                                <tr key={jabatan.id || index} className="border-bottom">
                                    <td className="p-3 text-secondary fw-medium small">
                                        {index + 1}
                                    </td>
                                    <td className="p-3 fw-medium text-dark text-start">
                                        {jabatan.nama_jabatan}
                                    </td>
                                    <td className="p-3 fw-medium">
                                        <span className="badge bg-primary bg-opacity-10 text-primary border border-primary-subtle px-3 py-2 rounded-pill fw-medium small">
                                            {jabatan.kategori || 'non-medis'}
                                        </span>
                                    </td>
                                    <td className="p-3 text-center">
                                        <div className="d-flex justify-content-center gap-2">
                                            <button className="btn btn-sm btn-outline-primary border-0 bg-primary bg-opacity-10 text-primary p-2 rounded-2 d-flex align-items-center justify-content-center shadow-none">
                                                <FiEdit size={15}/>
                                            </button>

                                            <button className="btn btn-sm btn-outline-danger border-0 bg-danger bg-opacity-10 text-danger p-2 rounded-2 d-flex align-items-center justify-content-center shadow-none">
                                                <FiDelete size={15}/>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            )) 
                        ) : (
                            <tr>
                                <td colSpan="4" className="text-center py-5 text-muted">
                                    <p className="mb-0 fw-medium">Data jabatan Tidak ada / Tidak ditemukan</p>
                                </td>
                            </tr>
                        )
                    }
                </tbody>
                </table>
            </div>
        </div>
    )
}