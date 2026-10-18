
import {loginUser} from '../../services/auth/Login'
import {useState} from 'react'

export default function Login(){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [loading, setLoading] = useState(false);
    
    const handleLogin = async(e) => {
        e.preventDefault();
        setErrorMsg('');
        setLoading(true);

        const result = await loginUser(username, password);

        setLoading(false);

        if(result.success){
            alert("Login Berhasil");

            localStorage.setItem("access_token", result.data_token.access_token);
            window.location.href = "/menu"
        } else {
            setErrorMsg(result.message);
        }
    };

    return (
        <div style={{minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#ffffff', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'}}>
            <div className="container-fluid d-flex justify-content-center align-items-center">
                <div className="row col-md-6 mt-3 justify-content-center align-items-center">
                    <div className="card shadow-sm p-3 mb-5 bg-body rounded">
                        <div className="card-body justify-content-center">
                            <form onSubmit={handleLogin} style={{display: 'flex', flexDirection: 'column', gap: '12px'}}>
                                <div className="row" style={{marginBottom: '2.5em', marginTop: '1.25rem'}}>
                                    <div className="col-12 text-start">
                                        <h3 className="fs-2 fw-bold">Log in</h3>
                                        <p className="fs-5 fw-light">Sistem Skrining Kesehatan Klinis</p>
                                    </div>
                                </div>
                                
                                <div className="row align-item-center d-grid mb-3">
                                    <label className="text-start ps-1 mt-2">Username</label>
                                    <input  type="text" placeholder="Masukan Username" 
                                            className="form-control"s
                                            value={username} 
                                            onChange={(e) => setUsername(e.target.value)} 
                                            required 
                                    />
                                </div>

                                <div className="row align-item-center d-grid mb-3">
                                    <label className="text-start ps-1 mt-2">Password</label>
                                    <input  type="password" placeholder="Masukkan password"
                                            className="form-control"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                    />
                                </div>

                                <div className="g-3">
                                    <button type="Login" disabled={loading} className="btn btn-primary" style={{width: '100%'}}>
                                        {loading ? 'Tunggu..' : 'Lanjut'}
                                    </button>
                                </div>
                            </form>

                            {errorMsg && (
                                <p style={{ color: '#ef4444', fontSize: '13px', textAlign: 'center', marginTop: '14px', lineHeight: '1.4' }}>
                                {errorMsg}
                                </p>
                            )}

                            <div style={{ textAlign: 'center', marginTop: '16px', fontSize: '13px' }}>
                                <a href="#forgot" style={{ color: '#6b7280', textDecoration: 'underline' }}>Lupa password?</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}