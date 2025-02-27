const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Функция для генерации случайного отпечатка браузера
function generateFingerprint() {
    const browsers = ['Chrome', 'Firefox', 'Safari', 'Edge'];
    const os = ['Windows', 'MacOS', 'Linux', 'iOS', 'Android'];
    const languages = ['en-US', 'ru-RU', 'es-ES', 'fr-FR', 'de-DE'];

    const randomBrowser = browsers[Math.floor(Math.random() * browsers.length)];
    const randomOS = os[Math.floor(Math.random() * os.length)];
    const randomLanguage = languages[Math.floor(Math.random() * languages.length)];

    return {
        browser: randomBrowser,
        os: randomOS,
        language: randomLanguage,
        userAgent: `Mozilla/5.0 (${randomOS}; ${randomLanguage}) AppleWebKit/537.36 (KHTML, like Gecko) ${randomBrowser}/91.0.4472.124 Safari/537.36`
    };
}

// Middleware для обработки данных формы
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    const fingerprint = generateFingerprint();
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Antidetect Browser</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    margin: 20px;
                }
                iframe {
                    width: 100%;
                    height: 80vh;
                    border: 1px solid #ccc;
                    margin-top: 20px;
                }
                input[type="text"] {
                    width: 300px;
                    padding: 10px;
                    font-size: 16px;
                }
                button {
                    padding: 10px 20px;
                    font-size: 16px;
                    cursor: pointer;
                }
            </style>
        </head>
        <body>
            <h1>Текущий браузер/отпечаток:</h1>
            <p>Браузер: ${fingerprint.browser}</p>
            <p>ОС: ${fingerprint.os}</p>
            <p>Язык: ${fingerprint.language}</p>
            <p>User Agent: ${fingerprint.userAgent}</p>
            <p>Обновите страницу для изменения отпечатка.</p>

            <h2>Загрузить сайт:</h2>
            <form id="urlForm">
                <input type="text" id="urlInput" placeholder="Введите URL сайта (например, example.com)" required>
                <button type="submit">Загрузить</button>
            </form>

            <iframe id="siteFrame" src="" frameborder="0"></iframe>

            <script>
                document.getElementById('urlForm').addEventListener('submit', function(event) {
                    event.preventDefault();
                    let url = document.getElementById('urlInput').value.trim();
                    if (!url.startsWith('http://') && !url.startsWith('https://')) {
                        url = 'https://' + url;
                    }
                    document.getElementById('siteFrame').src = url;
                });
            </script>
        </body>
        </html>
    `);
});

app.listen(port, () => {
    console.log(`Сервер запущен на http://localhost:${port}`);
});
