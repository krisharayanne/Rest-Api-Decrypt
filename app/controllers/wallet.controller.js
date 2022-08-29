require("dotenv").config();
const CircularJSON = require('circular-json')
const fs = require('fs')
const envfile = require('envfile')
const sourcePath = '.env'
// const encryptionService = require("./encryptPrivateKey.js")
const decryptionService = require("./decryptPrivateKey.js")
// const walletService = require("./generateWallet.js")
// const balanceService = require("./getAvaxBalance.js")
// const tokenService = require("./transferToken.js")
// const gasService = require("./estimateGasFee.js")
// const avaxService = require("./transferAvax.js")

// Decrypt encrypted private key
async function apiDecryptPrivateKey(req, res) {
  // Validate request
  if (!req.body.encryptedPrivateKey) {
    res.status(400).send({ message: "Please send encrypted private key!" });
    return;
  }

  // Decrypt private key function
  let encryptedPrivateKey = Buffer.from(req.body.encryptedPrivateKey.toString(), 'base64');
  let decryptedPrivateKey = await decryptPrivateKey(encryptedPrivateKey);

  if(decryptedPrivateKey.errorMessage) {
    res.status(400).send({ message: decryptedPrivateKey });
  }
  else{
  decryptedPrivateKey = decryptedPrivateKey.toString();
  console.log('\n Decrypted Private Key (Controller): ', decryptedPrivateKey)

  let decryptedPrivateKeyObject = {
    "decryptedPrivateKey": decryptedPrivateKey
  }
  res.status(200).send({ message: decryptedPrivateKeyObject });
  }

}

async function decryptPrivateKey(encryptedPrivateKey){
    // decrypt Ebric user's encrypted private key using cryptographic private key
    let decryptedPrivateKey = decryptionService.decryptPrivateKey(encryptedPrivateKey)
    return decryptedPrivateKey;
}

module.exports = {
    apiDecryptPrivateKey
}