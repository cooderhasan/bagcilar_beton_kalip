const http = require('http');

function checkUrl(path) {
    return new Promise((resolve, reject) => {
        http.get({
            hostname: 'localhost',
            port: 3012,
            path: path,
            method: 'HEAD'
        }, (res) => {
            console.log(`GET ${path} -> Status: ${res.statusCode}, Location: ${res.headers.location}`);
            resolve();
        }).on('error', (e) => {
            console.error(`Error on ${path}:`, e.message);
            resolve();
        });
    });
}

async function main() {
    await checkUrl('/admin');
    await checkUrl('/admin/login');
}

main();
