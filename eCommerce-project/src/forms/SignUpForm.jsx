import axios from 'axios'
import { useState } from 'react';
import './AuthForms.css'

export function SignUpForm({ onClose, onSwitchToLogIn, onSuccess }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();
        setError('')
        setLoading(true)
        try {
            const response = await axios.post(`/api/auth/register`, {
                name,
                email,
                password
            });
            const data = response.data
            localStorage.setItem('token', data.token)
            localStorage.setItem('user', JSON.stringify(data.user))
            alert(`Акаунт створено! Вітаємо, ${data.user.name || data.user.email}`)
            onSuccess();
        } catch (error) {
            setError(error.response?.data?.error || 'Не вдалося з\'єднатись із сервером')
        } finally {
            setLoading(false)
        }
    }







    return (
        <div className="auth">
            <div className="auth__card" onClick={(e) => e.stopPropagation}>

                <button className="auth__close" onClick={onClose}>×</button>
                <div className="auth__logo">
                    <img src="/images/Logo.png" />
                </div>

                <h2 className="auth__title">Створити акаунт</h2>
                <p className="auth__subtitle">Це займе менше хвилини</p>

                <form onSubmit={handleSubmit}>
                    <div className="auth__field">
                        <label htmlFor="name">Ім'я</label>
                        <input id="name" type="text" placeholder="Ваше ім'я" value={name} onChange={(e) => setName(e.target.value)} />
                    </div>

                    <div className="auth__field">
                        <label htmlFor="email">Email</label>
                        <input id="email" type="email" placeholder="name@example.com" required value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>

                    <div className="auth__field">
                        <label htmlFor="password">Пароль</label>
                        <input id="password" type="password" placeholder="Мінімум 6 символів" required minLength={6} value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>

                    {error && <p className='auth__error'>{error}</p>}

                    <button type="submit" className="auth__submit" disabled={loading}>{loading ? 'Створюємо акаунт...' : 'Зареєструватись'}</button>
                </form>

                <p className="auth__switch">
                    Вже є акаунт?
                    <a className="auth__switch-link" href="#" onClick={onSwitchToLogIn}>Увійти</a>
                </p>
            </div>
        </div>
    );
}
