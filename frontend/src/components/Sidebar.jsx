import React, {useState} from 'react';
import { 
    TbStethoscope, TbActivity, 
    TbUsers, TbBriefcase, TbLayoutDashboard
} from 'react-icons/tb';

export default function Sidebar() {
    const [menuAktif, setMenuAktif] = useState("set-dashboard");

    return (
        <div
            className="p-3 text-white shadow-lg"
            style={{
                width: '300px',
                backgroundColor: '#0c0d0e',
                minHeight: '100vh'
            }}
        >
            <div className="d-flex flex-column gap-1 mb-3">
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
                <div className="text-secondary px-2 mb-1 d-flex justify-content-between align-items-center" style={{fontSize: '11px', letterSpacing: '0.5px'}}>
                    <span className="fs-6">Master Data</span>
                </div>
                <div className="d-flex flex-column gap-1 mx-2 mt-2">
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
            </div>

            {
                <style>{`
                    .cursor-pointer {cursor: pointer;}    
                    .hover-bg:hover {background-color: rgba(255,255,255,0.05); color: #fff;}
                `}
                </style>
            }
        </div>
    )
}

