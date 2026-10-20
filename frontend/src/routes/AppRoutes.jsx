import {Routes, Route, Navigate} from 'react-router-dom';
import Login from '../pages/auth/Login';
import Registrasi from '../pages/auth/Registrasi';
import MenuUtama from '../pages/menu_utama/Menu';

export default function AppRoutes(){
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<Login/>} />
            <Route path="/registrasi" element={<Registrasi/>} />
            <Route path="/menu" element={<MenuUtama/>} />
        </Routes>
    )
}