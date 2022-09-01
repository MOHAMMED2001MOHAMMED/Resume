var express = require('express');
var router = express.Router();
const { Orders, PostOrders, Ordersid, OrderDelete, OrdersAdmin } = require('../controller/Orders.C')
const { isCompany, notCompany } = require('./check/checkcompany')
const { Admin } = require('./check/checkuser')
router.get('/', isCompany, Orders)
router.get('/:id', isCompany, Ordersid)
router.post('/', isCompany, PostOrders)
router.post('/OrderDelete', OrderDelete)
router.get('/OrdersAdmin/All', Admin, OrdersAdmin)
    //router.post('/OrdersAdmin', Admin, OrdersAdmin)
module.exports = router