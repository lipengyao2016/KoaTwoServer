
var crypto = require('crypto');
var fs = require('fs');

function testEncryMD5() {
    var content = 'lipeng';
    var md5 = crypto.createHash('md5');
    md5.update(content);
    var sign = md5.digest('hex');
    console.log(sign);
}

function testDecryMD5() {
    var content = 'lipeng';
    var verifysign = crypto.createHash('md5').update(content, 'utf8').digest("hex");
    console.log(verifysign);

}

function  testRSA() {

    var privatePem = fs.readFileSync('./pem/rsa_private_key.pem');
    var publicPem = fs.readFileSync('./pem/rsa_public_key.pem');
    var privateKey = privatePem.toString();
    var pubkey = publicPem.toString();
    var data = "china";
//加密
  /*  var sign = crypto.createSign('RSA-SHA256');
    sign.update(data);
    var sig = sign.sign(privateKey, 'hex');
    console.log(sig);

   // sig = '929047c735a0b856d0df8ff57b91fbc0f41c92c03e3fb1022ed16cfd19874c2f5bb9a2289d3b72c6971b83352f71a989d75e30cc3583b0805160d131e8c575b68d5bfbdbca5c897532e9190105e855970d01187e9f48af1e1c17e711273ed12b5d6a313d399a6a86a9051714b06f3e51911a138a506a92b68a5446146e8add3b';

//解密
    var verify = crypto.createVerify('RSA-SHA256');
    verify.update(data);
    var orignData = verify.verify(pubkey, sig, 'hex');
    console.log(orignData);*/

    var buf = new Buffer(data);
    var cryData = crypto.publicEncrypt({key:publicPem,padding:crypto.RSA_PKCS1_PADDING},buf);
    console.log(cryData);

    var dedata = crypto.privateDecrypt({key:privatePem,passphrase:'',padding:crypto.RSA_PKCS1_PADDING},cryData);
    console.log('decrypted data='+dedata.toString());

}

//testRSA();

//testDecryMD5();

export {testDecryMD5,testRSA};