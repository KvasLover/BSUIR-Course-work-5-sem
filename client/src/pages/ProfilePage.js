import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { Context } from '..'; // Импортируем контекст, где хранится UserStore
//import { uploadImage } from '../http'; // Импортируем функцию для загрузки изображения

const ProfilePage = observer(() => {
    const { user } = useContext(Context); // Получаем доступ к UserStore

    // Проверяем, авторизован ли пользователь
    if (!user.isAuth) {
        return <h2>Вы не авторизованы. Пожалуйста, войдите в систему.</h2>;
    }

    /*const handleImageUpload = async (event) => {
        const file = event.target.files[0]; // Получаем выбранный файл
        if (!file) return;

        const formData = new FormData();
        formData.append('image', file); // Добавляем файл в FormData

        try {
            // Отправляем запрос на сервер для загрузки изображения
            const response = await uploadImage(formData);
            user.setUser({ ...user.user, img: response.img }); // Обновляем данные пользователя с новым изображением
            alert('Изображение успешно загружено!');
        } catch (error) {
            console.error('Ошибка при загрузке изображения:', error);
            alert('Не удалось загрузить изображение.');
        }
    };*/
/*{user.user.img && <img src={user.user.img} alt="Профиль" width="100" />} {}
<input 
type="file" 
accept="image/*" 
onChange={handleImageUpload} 
style={{ display: 'none' }} 
id="file-upload" 
/>
<label htmlFor="file-upload" style={{ cursor: 'pointer', color: '#007BFF' }}>
Загрузить изображение профиля
</label> */
    return (
        <div className="profile-page">
            <h1>Личный кабинет</h1>
            <div className="user-info">
                <h2>Информация о пользователе</h2>
                <p><strong>Имя:</strong> {user.user.username || 'Не указано'}</p>
                <p><strong>Email:</strong> {user.user.email || 'Не указано'}</p>
                <p><strong>Баланс:</strong> {user.user.balance || 'Не указано'}</p>
            </div>
        </div>
    );
});

export default ProfilePage;
