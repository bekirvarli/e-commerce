const express = require("express");
const router = express.Router();

//tum urunlerı getirme - read/all

router.get("/", async(req, res) =>
{
    res.send("ürünler getirildi");
})
module.exports = router;

