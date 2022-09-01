const express = require('express');
const router = express.Router();

const {requireSignin, isAdmin, isAuth} = require('../controllers/auth')
const {create, productById, read, remove, update, listRelated, list, listCategories, listBySearch, photo, listSearch} = require('../controllers/product')
const {userById} = require('../controllers/user')


router.post('/product/create/:userId',requireSignin,isAuth,isAdmin, create);
router.post("/products/by/search", listBySearch);
router.get("/products/search", listSearch);
router.get('/product/:productId', read)
router.get('/products/related/:productId', listRelated);
router.get('/products/categories', listCategories);
router.get('/products', list)
router.get("/product/photo/:productId", photo);
router.put('/product/:productId/:userId',requireSignin,isAuth,isAdmin, update);
router.delete('/product/:productId/:userId',requireSignin,isAuth,isAdmin, remove);

router.param('userId', userById)
router.param('productId', productById)


module.exports = router