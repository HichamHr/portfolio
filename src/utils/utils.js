export function filesize(size) {
    const i = Math.floor(Math.log(size) / Math.log(1024));
    return (
        (size / Math.pow(1024, i)).toFixed(2) * 1 +
        ' ' +
        ['B', 'kB', 'MB', 'GB', 'TB'][i]
    );
}


const CLIENT_ID = '406561475650-h08jir1mgnc5fiqe327e8tsjhh0ks9l2.apps.googleusercontent.com'
const CLIENT_SECRET = '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'
const REDIRECT_URI = 'https://developers.google.com/oauthplayground'
const REFRESH_TOKEN = '1//04Y6Si60SmCceCgYIARAAGAQSNwF-L9Ir6nkMv_nQfSJPZQDlLxpreta3pg3dfWrDkyfyHcQ66xAXRFyMwz3pox9_-3gBqQ_qFHQ'

export {CLIENT_ID,CLIENT_SECRET,REDIRECT_URI,REFRESH_TOKEN}