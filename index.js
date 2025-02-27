const express = require('express');
     const app = express();
     const port = process.env.PORT || 3000;

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

     app.get('/', (req, res) => {
         const fingerprint = generateFingerprint();
         res.send(`
             <h1>Текущий браузер/отпечаток:</h1>
             <p>Браузер: ${fingerprint.browser}</p>
             <p>ОС: ${fingerprint.os}</p>
             <p>Язык: ${fingerprint.language}</p>
             <p>User Agent: ${fingerprint.userAgent}</p>
             <p>Обновите страницу для изменения отпечатка.</p>
         `);
     });

     app.listen(port, () => {
         console.log(`Сервер запущен на http://localhost:${port}`);
     });
