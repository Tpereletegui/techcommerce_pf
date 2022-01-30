const { Router } = require("express");
const products = require("./products");
const product = require("./product");
const cart = require("./cart");
const categories = require('./helpers/category')
const category = require('./helpers/category')
const brand = require('./helpers/brand')
const brands = require('./helpers/brands')
const review = require('./helpers/review')
const user = require("./user");
const checkout = require("./checkout");
const wishlist = require("./WishList");

//const user = require("../controllers/User/user");

//importing the routes
//const productPostingRoute = require('../controllers/Products/PostProduct.js')

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/categories", categories);
router.use("/brands", brands);
router.use("/product", product);
router.use("/products", products);
// router.use(posts);
router.use("/user", user);
//router.use('/', productPostingRoute)
router.use('/categories', category)

router.use('/brand', brand)
router.use('/cart', cart)
router.use('/checkout', checkout)
//router.use('/user', user)

// router.use('/review', review)
router.use('/wishlist',wishlist)

module.exports = router;
