module.exports = app => {
    const wallets = require("../controllers/wallet.controller.js");
    var router = require("express").Router();

    // Decrypt encrypted private key
    router.post("/", wallets.apiDecryptPrivateKey);
   
    app.use('/api/wallets', router);
  };