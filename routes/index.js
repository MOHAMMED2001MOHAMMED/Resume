var express = require('express');
var router = express.Router();
const { controller, controllerpost, index, employment, search, DeleteCategoryFromControler } = require('../controller/index.C')

const { isAdmin, Admin } = require('./check/checkuser')

/* GET home page. */
router.get(['/', '/home'], index);

//router.get('/index', index)
router.get('/Controller', Admin, controller)
router.post('/Controller', Admin, controllerpost)
router.get('/employment/:id', employment)
router.get('/search', search)
router.post('/Controller/Delete', DeleteCategoryFromControler)





module.exports = router;