import React from 'react';
import '../styles/ModalForIdSearch.css'; // Импортируем стили для модального окна

const ModalForIdSearch = ({ isOpen, onClose, onSubmit, title }) => {
    const [id, setId] = React.useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (id) {
            onSubmit(id);
            setId(''); // Очистка поля после отправки
        }
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>{title}</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Введите ID"
                        value={id}
                        onChange={(e) => setId(e.target.value)}
                    />
                    <button type="submit">Найти</button>
                    <button type="button" onClick={onClose}>Закрыть</button>
                </form>
            </div>
        </div>
    );
};

export default ModalForIdSearch;
