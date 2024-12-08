const multer = require('multer');
const path = require('path');

// Настройки хранения файлов
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'static'); // Папка для сохранения загруженных файлов
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Уникальное имя файла
    }
});

// Создаем multer middleware
const upload = multer({ storage });

module.exports = upload;
