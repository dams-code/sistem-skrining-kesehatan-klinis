import Sidebar from '../../components/Sidebar';
import Navbar from '../../components/Navbar';
import { useState } from 'react';
import ListJabatan from '../../pages/jabatan/Jabatan';
import ListSpesialis from '../spesialis/Spesialis';

import { LuArrowLeft, LuArrowRight } from "react-icons/lu";

export default function MenuUtama() {

    const [menuAktif, setMenuAktif] = useState('set-dashboard');

    const [sidebarOpen, setSidebarOpen] = useState(true);

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    }

    return (
        <div className="d-flex min-vh-100 bg-light position-relative">
            <Sidebar cekSidebarOpen={sidebarOpen} menuAktif={menuAktif} setMenuAktif={setMenuAktif}/>

            <button
                onClick={toggleSidebar}
                className="btn btn-sm text-secondary position-absolute shadow d-flex align-items-center justify-content-center p-0 position-absolute"
                style={{
                    width:'32px', 
                    height: '32px',
                    top: '24px',
                    left: sidebarOpen ? '304px' : '10px',
                    zIndex: 101,
                    backgroundColor: '#1d1f21',
                    border: '1px solid #3c4043',
                    color: '#a1a7ab',
                    transition: 'left 0.3s ease'

                }}
            >
                {sidebarOpen ? <LuArrowLeft size={20} /> : <LuArrowRight size={20} />}
            </button>

            <div className="flex-grow-1 d-flex flex-column overflow-hidden position-relative">

                <Navbar
                    namaProject = "Sistem Skrining Kesehatan Klinis"
                    status="online"
                    sidebarOpen={sidebarOpen}
                />

                <div className="p-4 flex-grow-1 overflow-auto">
                    {/* <p>layout form (on-progess)</p> */}
                    {menuAktif === 'jabatan' && <ListJabatan /> }

                    {menuAktif === 'spesialis' && <ListSpesialis />}

                </div>

                <div className="p-3 mb-2 position-absolute bottom-0 end-50 rounded-3" style={ sidebarOpen ? {left: '40%', width: 'max-content', backgroundColor: 'rgb(12, 13, 14)'} : {left: '42%', width: 'max-content', backgroundColor: 'rgb(12, 13, 14)'}}>
                    <p className="text-center fw-light align-content-center text-white fw-semibold">@2026 Damar Djati Wahyu Kemala</p>
                </div>
            </div>
        </div>
    )
}