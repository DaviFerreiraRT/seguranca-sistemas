const crypto = require('crypto');

function enviar(mensagem, segredo, chave) {

    salt = crypto.randomBytes(16);
    iv = crypto.randomBytes(16);
    key = crypto.pbkdf2Sync(chave + segredo, salt, 100000, 256 / 8, 'sha256');

    cifrado = crypto.createCipheriv('aes-256-cbc', key, iv);

    cifrado.write(mensagem);
    cifrado.end()

    encriptar = cifrado.read();
    console.log({
        iv: iv.toString('base64'),
        salt: salt.toString('base64'),
        encriptado: encriptar.toString('base64'),
    });
    return Buffer.concat([salt, iv, encriptar,]).toString('base64') + `\n${mensagem}`
}

function receber(mensagemCifrada, segredo, chave) {

    encriptado = Buffer.from(mensagemCifrada, 'base64');
    const salt_len = iv_len = 16;

    salt = encriptado.slice(0, salt_len);
    iv = encriptado.slice(0 + salt_len, salt_len + iv_len);
    key = crypto.pbkdf2Sync(chave + segredo, salt, 100000, 256 / 8, 'sha256');

    decifrado = crypto.createDecipheriv('aes-256-cbc', key, iv);

    decifrado.write(encriptado.slice(salt_len + iv_len));
    decifrado.end();

    decriptado = decifrado.read();
    if (decriptado == mensagem) { return decriptado.toString() };

}

let mensagem = "meu texto para ser criptografado"
let chave = "13aba3vg234asdb"
let segredo = "9816y2398aljdnlçkjadn"


mensagemCifrada = enviar(mensagem, segredo, chave)
mensagemDecifrada = receber(mensagemCifrada, segredo, chave)

console.log("Mensagem cifrada: " + mensagemCifrada)
console.log("Mensagem Decifrada: " + mensagemDecifrada)