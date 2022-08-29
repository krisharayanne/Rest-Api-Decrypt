var path = require('path');
const fs = require("fs");
const crypto = require("crypto");

function decryptPrivateKey (encryptedPrivateKey) {

  try{
  return crypto.privateDecrypt(
    {
      key: fs.readFileSync(path.resolve('app/controllers/private_key.pem'), 'utf8'),
      // In order to decrypt the data, we need to specify the
      // same hashing function and padding scheme that we used to
      // encrypt the data in the previous step
      padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
      oaepHash: 'sha256'
    },
    encryptedPrivateKey
  );
  }
  catch(error) {

      let errorObject = {
        "errorMessage" : error
      }
      return errorObject;

  }

}

module.exports = {
    decryptPrivateKey
}