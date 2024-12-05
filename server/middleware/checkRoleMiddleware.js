const CurrentUser = require('../currentUser');

module.exports = function (role) {
    return function (req, res, next) {
        if (req.method === "OPTIONS") {
            return next();
        }

        try {
            const user = CurrentUser.getUser(); // Получаем текущего пользователя
            
            if (!user) {
                return res.status(401).json({
                    message: `Не авторизован. Текущий пользователь: ${JSON.stringify(user)}`
                });
            }

            // Проверяем роль пользователя
            const userRole = user.user ? user.user.role : undefined; // Получаем роль из вложенного объекта

            if (userRole !== role) { // Сравниваем с требуемой ролью
                return res.status(401).json({
                    message: `Нет доступа. Текущий пользователь: ${JSON.stringify(user)}. Роль: ${userRole}.`,
                    userrole: userRole,
                    role: role
                });
            }

            next(); // Если все проверки пройдены, продолжаем выполнение
        } catch (e) {
            console.error(e); // Логируем ошибку для отладки
            res.status(401).json({
                message: `Не авторизован. Ошибка: ${e.message}`
            });
        }
    };
};
