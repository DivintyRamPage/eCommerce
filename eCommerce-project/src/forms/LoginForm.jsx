import './AuthForms.css'
import { useState } from 'react';
import axios from 'axios';

export function LoginForm({ onClose, onSwitchToSignUp, onSuccess }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false)

    async function handleSubmit(e) {
        e.preventDefault()
        setError('')
        setLoading(true)

        try {
            const response = await axios.post(`/api/auth/login`, {
                email,
                password
            });
            const data = response.data
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            alert(`Вітаємо, ${data.user.name || data.user.email}`);
            onSuccess(data.user);
        } catch (error) {
            setError(error.response?.data?.error || 'Не вдалося з\'єднатись із сервером')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="auth" onClick={onClose}>
            <div className="auth__card" onClick={(e) => e.stopPropagation()}>
                <button className="auth__close" onClick={onClose}>×</button>

                <div className="auth__logo">
                    <img src="/images/Logo.png"  />
                </div>

                <h2 className="auth__title">Ласкаво просимо</h2>
                <p className="auth__subtitle">Увійдіть, щоб продовжити</p>

                <form onSubmit={handleSubmit}>
                    <div className="auth__field">
                        <label htmlFor="email">Email</label>
                        <input id="email" type="email" placeholder="name@example.com" required value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>

                    <div className="auth__field">
                        <label htmlFor="password">Пароль</label>
                        <input id="password" type="password" placeholder="••••••••" value={password} required onChange={(e) => setPassword(e.target.value)} />
                    </div>

                    {error && <p className='auth__error'>{error}</p>}

                    <button type="submit" className="auth__submit" disabled={loading}>{loading ? 'Заходимо...' : 'Увійти'}</button>
                </form>

                <p className="auth__switch">
                    Немає акаунту?
                    <a className="auth__switch-link" onClick={onSwitchToSignUp}>Зареєструватись</a>
                </p>
            </div>
        </div>
    );
}

export default LoginForm;