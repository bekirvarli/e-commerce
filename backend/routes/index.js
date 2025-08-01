const express = require("express");
const router = express.Router();

//diğer rota dosyalarını içe aktarioyurz.
const productRoute = require("./products.js");
const categoryRoute = require("./categories.js");
const AuthRoute = require("./auth.js");


// her rotayı ilgili yol alında kullanıyoruz

router.use("/categories", categoryRoute);
router.use("/auth", AuthRoute);
router.use("/products", productRoute);


module.exports = router;
