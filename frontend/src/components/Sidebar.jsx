import React, {useState} from 'react';
import { 
    TbStethoscope, TbActivity, TbUsers, 
    TbBriefcase, TbLayoutDashboard, TbClipboardList
} from 'react-icons/tb';

import { LuArrowDown, LuArrowLeft, LuArrowRight } from "react-icons/lu";

export default function Sidebar({cekSidebarOpen, toggleSidebar}) {
    const [menuAktif, setMenuAktif] = useState("set-dashboard");

    const [masterDataOpen, setMasterDataOpen] = useState(true);
    const [manajemenPasienOpen, setManajemenPasienOpen] = useState(true);

    return (
        <div
            className="position-relative shadow-lg flex-shrink-0"
            style={{
                width: cekSidebarOpen ? '320px' : '0px',
                minWidth: cekSidebarOpen ? '200px' : '0px',
                backgroundColor: '#0c0d0e',
                minHeight: '100vh',
                overflow: 'hidden',
                transition: 'width 0.3s ease min-width 0.3s ease',
                whiteSpace: 'nowrap',
                zIndex: 100
            }}
        >
            <button
                onClick={toggleSidebar}
                className="btn btn-sm text-secondary position-absolute shadow d-flex align-items-center justify-content-center p-0 position-absolute"
                style={{
                    width:'32px', 
                    height: '32px',
                    top: '20px',
                    right: '-14px',
                    zIndex: 101,
                    backgroundColor: '#1d1f21',
                    border: '1px solid #3c4043',
                    color: '#a1a7ab'

                }}
            >
                {cekSidebarOpen ? <LuArrowLeft size={20} /> : <LuArrowRight size={20} />}
            </button>

            <div 
                className={`d-flex flex-column h-100 p-3 text-white ${cekSidebarOpen ? 'overflow-auto': 'overflow-hidden'}`}
                style={{
                    width: '280px',
                    opacity: cekSidebarOpen ? 1 : 0,
                    transition: 'opacity 0.2s ease'
                }}
            >
                <div className="d-flex align-items-center justify-content-between mb-3 px-1">
                    <div onClick={() => setMenuAktif('set-dashboard')} className={`d-flex align-items-center gap-2 px-2 py-2 rounded-3 cursor-pointer ${ 
                            menuAktif === 'set-dashboard' 
                                ? 'bg-secondary bg-opacity-25 text-white fw-medium' 
                                : 'text-secondary hover-bg'
                        }`}
                    >
                        <div className="rounded-2 d-flex align-items-center justify-content-center bg-secondary bg-opacity-25" style={{width: '24px', height: '24px'}}>
                            <TbLayoutDashboard size={18} className={menuAktif === 'set-dashboard' ? 'text-white' : 'text-secondary'} />
                        </div>
                        <span className='fs-6'>Dashboard</span>

                    </div>
                    <div style={{borderTop: "1px solid #4c4c4c", marginTop: "7px"}}></div>
                </div>

                <div className="mb-3">
                    <div className="text-secondary px-2 mb-1 text-start align-items-center d-flex justify-content-between cursor-pointer hover-white" style={{fontSize: '11px', letterSpacing: '0.5px', userSelect: 'none'}} onClick={() => setMasterDataOpen(!masterDataOpen)}>
                        <span style={{fontSize: '0.94rem'}} className="fw-semibold">Master Data</span>
                        <span style={{transform: masterDataOpen ? 'rotate(0deg)' : 'rotate(-90deg)', transition: 'transform 0.2s ease'}}><LuArrowDown size={16}/></span>
                    </div>
                    {
                        masterDataOpen && (
                            <div className="d-flex flex-column gap-1 mx-2 mt-2 dropdown-content"
                                style={{
                                    animation: 'fadeIn 0.26s ease-in-out forwards'
                                }}
                            >
                                <div 
                                    onClick={() => setMenuAktif('user')}
                                    className={`d-flex align-items-center gap-2 px-2 py-2 rounded-3 cursor-pointer ${
                                        menuAktif === 'user' ? 'bg-secondary bg-opacity-25 text-white fw-medium' : 'text-secondary hover-bg'
                                    }`}
                                >
                                    <TbUsers size={18} className={menuAktif === 'user' ? 'text-white' : 'text-secondary'} />
                                    <span className="small">User (Petugas)</span>
                                </div>

                                <div 
                                    onClick={() => setMenuAktif('paramedis')}
                                    className={`d-flex align-items-center gap-2 px-2 py-2 rounded-3 cursor-pointer ${
                                        menuAktif === 'paramedis' ? 'bg-secondary bg-opacity-25 text-white fw-medium' : 'text-secondary hover-bg'
                                    }`}
                                >
                                    <TbStethoscope size={18} className={menuAktif === 'paramedis' ? 'text-white' : 'text-secondary'} />
                                    <span className="small">Paramedis</span>
                                </div>

                                <div 
                                    onClick={() => setMenuAktif('jabatan')}
                                    className={`d-flex align-items-center gap-2 px-2 py-2 rounded-3 cursor-pointer ${
                                        menuAktif === 'jabatan' ? 'bg-secondary bg-opacity-25 text-white fw-medium' : 'text-secondary hover-bg'
                                    }`}
                                >
                                    <TbBriefcase size={18} className={menuAktif === 'jabatan' ? 'text-white' : 'text-secondary'} />
                                    <span className="small">Jabatan</span>
                                </div>

                                <div 
                                    onClick={() => setMenuAktif('spesialis')}
                                    className={`d-flex align-items-center gap-2 px-2 py-2 rounded-3 cursor-pointer ${
                                        menuAktif === 'spesialis' ? 'bg-secondary bg-opacity-25 text-white fw-medium' : 'text-secondary hover-bg'
                                    }`}
                                >
                                    <TbActivity size={18} className={menuAktif === 'spesialis' ? 'text-white' : 'text-secondary'} />
                                    <span className="small">Spesialis</span>
                                </div>
                            </div>
                        )
                    }
                </div>

                <div className="mb-3">
                    <div className="text-secondary text-start px-2 mb-1 align-items-center d-flex justify-content-between cursor-pointer hover-white" style={{fontSize: '11px', letterSpacing: '0.5px', userSelect: 'none'}} onClick={() => setManajemenPasienOpen(!manajemenPasienOpen)}>
                        <span style={{fontSize: '0.94rem'}} className="fw-semibold">Manajemen Pasien</span>
                        <span style={{transform: manajemenPasienOpen ? 'rotate(0deg)' : 'rotate(-90deg)', transition: 'transform 0.2s ease'}}><LuArrowDown size={16}/></span>
                    </div>

                    {
                        manajemenPasienOpen && (
                            <div className="d-flex flex-column gap-1 mx-2 mt-2" style={{animation: 'fadeIn 0.26s forwards'}}>
                                <div
                                    onClick={() => setMenuAktif('admisi')}
                                    className={`d-flex align-items-center gap-2 px-2 py-2 rounded-3 cursor-pointer ${
                                        menuAktif === 'admisi' ? 'bg-secondary bg-opacity-25 text-white fw-medium' : 'text-secondary hover-bg'
                                    }`}
                                >
                                    <TbClipboardList />
                                    <span className="small">Admisi Pasien</span>

                                </div>
                            </div>
                        )
                    }
                </div>
            </div>

            {
                <style>{`
                    .cursor-pointer {cursor: pointer;}    
                    .hover-bg:hover {background-color: rgba(255,255,255,0.05); color: #fff;}
                
                    @keyframes fadeIn{
                        0% {
                            opacity: 0;
                            transform: translateY(-6px);
                        }
                        100% {
                            opacity: 1;
                            transform: translateY(0);
                        }
                    }

                    .btn-primary:hover {
                        background-color: #3c4043 !important;
                        color: #fff !important;
                        border-color: #5f6368 !important;
                    }
                `}
                </style>
            }
        </div>
    )
}

