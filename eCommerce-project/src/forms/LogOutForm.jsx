import './AuthForms.css'

export function LogoutModal({ onConfirm, onCancel }) {
    return (
        <div className="auth" onClick={onCancel}>
            <div className="logout-modal" onClick={(e) => e.stopPropagation()}>
                <button className="auth__close" onClick={onCancel}>×</button>

                <div className="logout-modal__icon">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                        <path d="M16 17L21 12L16 7" stroke="#dc2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M21 12H9" stroke="#dc2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M9 21H5C3.89543 21 3 20.1046 3 19V5C3 3.89543 3.89543 3 5 3H9" stroke="#dc2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </div>

                <h2 className="logout-modal__title">Вийти з акаунту?</h2>
                <p className="logout-modal__subtitle">Вам потрібно буде увійти знову, щоб отримати доступ до акаунту</p>

                <div className="logout-modal__actions">
                    <button className="logout-modal__cancel" onClick={onCancel}>Скасувати</button>
                    <button className="logout-modal__confirm" onClick={onConfirm}>Вийти</button>
                </div>
            </div>
        </div>
    );
}
