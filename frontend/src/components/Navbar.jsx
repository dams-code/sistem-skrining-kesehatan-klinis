import { useState, useEffect } from "react";

export default function Navbar({namaProject = '', username= '', nama_jabatan= '', status=''}){
    const [waktu, setWaktu] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setWaktu(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const formatTanggal = waktu.toLocaleDateString("id-ID", {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    }).replace("pukul", "-");

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="shadow-sm container-fluid border-bottom border-dark-subtle pb-2 justify-content-between">
                <div className="col text-start">
                    <h5 className="fw-bold m-0 text-dark" style={{fontSize: '18px'}}>{namaProject}</h5>
                    <small className="text-secondary" style={{fontSize: '12px'}}>
                        <span className="fw-semibold text-secondary">{formatTanggal}</span>
                    </small>
                </div>

                <div className="d-flex align-items-center gap-3 me-3">
                    <div className="d-flex align-items-center gap-3">
                        <span className="badge bg-success bg-opacity-10 text-dark">
                            <span className="rounded-circle bg-success d-inline-block me-1 pulse" style={{width: '8px', height: '8px'}}></span> 
                            {status}
                        </span>
                        <span className="badge bg-primary bg-opacity-10 text-primary">{nama_jabatan}</span>
                    </div>
                </div>

                <div className="row">
                    <div className="col-12">
                        <button className="navbar-toggler ms-auto me-2" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent" aria-controls="navbarContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>

                        <div className="collapse navbar-collapse" id="navbarContent">
                            <ul className="nav nav-tabs">
                                <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle d-flex gap-2 align-items-center" data-bs-toggle="dropdown" role="button" aria-expanded="false" href="javascript:void(0);">
                                        <i className="bi bi-person-circle fs-5 text-primary"></i>
                                        <span>{username}</span>
                                    </a>
                                    <ul className="dropdown-menu dropdown-menu-end shadow-sm">
                                        <li><a className="dropdown-item" href="/editUser"><i className="bi bi-person-gear me-2"></i>Edit User</a></li>
                                        <li>
                                            <a className="dropdown-item bg-primary bg-opacity-10 text-primary" href="/gantiPassword">
                                                <i className="bi bi-key me-2"></i>Ganti Password
                                            </a>
                                        </li>
                                        <li><div className="hr opacity-25 dropdown-divider"></div></li>
                                        <li>
                                            <button className="dropdown-item text-danger" type="button">
                                                <i className="bi bi-box-arrow-right me-2"></i>Logout
                                            </button>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
                @keyframes setPulse{
                    0% {
                        transform: scale(0);
                        box-shadow: 0 0 0 0 rgba(25,135, 84, 0.7);
                    }
                    70% {
                        transform: scale(1);
                        box-shadow: 0 0 0 6px rgba(25, 135, 84, 0);
                    }
                    100% {
                        transform: scale(0.95);
                        box-shadow: 0 0 0 0 rgba(25,135, 84, 0);
                    }
                }

                .pulse{
                    animation: setPulse 1.4s infinite;
                }
            `}
            </style>
        </nav>
    )
}