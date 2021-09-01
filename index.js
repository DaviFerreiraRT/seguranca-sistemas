var cryptico = require("cryptico");


function algoritmo(mensagem) {
    this.bits = 2048;
    this.mensagem = mensagem;
    
    this.chaveRSA = cryptico.generateRSAKey(this.mensagem, this.bits);
    this.chavePublicaRSA = cryptico.publicKeyString(this.chaveRSA);

    this.encriptar = function (mensagem) {
        var result = cryptico.encrypt(mensagem, this.chavePublicaRSA);
        return result.cipher;
    };

    this.decifrar = function (mensagem) {
        var result = cryptico.decrypt(mensagem, this.chaveRSA);
        return result.plaintext;
    };
}
var mensagem = "mensagem a ser cifrada"
var encriptar = new algoritmo(mensagem);

var mensagemCriptada = encriptar.encriptar(mensagem);
var mensagemDecifragem = encriptar.decifrar(mensagemCriptada);

console.log('');
console.log("Mensagem original: " + mensagem)
console.log('');
console.log('Encriptada: ' + mensagemCriptada)
console.log('');
console.log('Decifrada: ' + mensagemDecifragem)
console.log('');


 /*
    Após se definir a quantidade de bits que a chave irá ter, e também a mensagem
    devemos gerar uma chave RSA e também uma chave publica,
    após isto, utiliza-se as funções de criptografia e decifragem a biblioteca cryptico
    que já fazem todo o processo tanto de criptografagem e decifragem das mensagens.


    2- O padrão PCKS-8 é uma sintaxe padrão para armazenar as chaves privadas,
        esse padrão pode ser encriptado com uma passphrase, que é uma sequencia utilizada de letras ou um
        texto que garante o acesso a um dispositivo.
        Esse padrão utiliza o formato de encode base64, ou seja
        o resultado da chave privada, se torna um "hash" de 64 bits

    3-Sim, no método generateRSAKey()
 */