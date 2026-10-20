import Sidebar from '../../components/Sidebar';
import Navbar from '../../components/Navbar';
import { useState } from 'react';

import { LuArrowRight } from "react-icons/lu";

export default function MenuUtama() {

    const [menuAktif, setMenuAktif] = useState('set-dashboard');

    const [sidebarOpen, setSidebarOpen] = useState(true);

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    }

    return (
        <div className="d-flex min-vh-100 bg-light">
            <Sidebar toggleSidebar={toggleSidebar} cekSidebarOpen={sidebarOpen} menuAktif={menuAktif} setMenuAktif={setMenuAktif}/>

            <div className="flex-grow-1 d-flex flex-column overflow-hidden">

                <Navbar
                    namaProject = "Sistem Skrining Kesehatan Klinis"
                    username= "Dams"
                    nama_jabatan= "Super Admin"
                    status="online"
                />

                <div className="p-4 flex-grow-1 overflow-auto">
                    <p>layout form (on-progess)</p>
                </div>
            </div>
        </div>
    )
}