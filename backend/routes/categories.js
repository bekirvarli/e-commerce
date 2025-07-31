const express = require("express");
const router = express.Router();

//tum urunlerı getirme

router.get("/", async(req, res) =>
{
    res.send("kategoriler getirildi");
})

module.exports = router;

