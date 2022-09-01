const e = require('connect-flash')
const { InsertOrder, getOrders, deleteOrder, getAllOrders } = require('../models/Orders.M')
const nodemailer = require('nodemailer')

const Ordersid = async(req, res, next) => {
    try {
        console.log(req.params.id)
        let order = await getOrders(req.params.id)

        res.render('Orders', {
            order: order,
            isAdmin: req.session.isAdmin,
            isUser: req.session.userId,
            isCompany: req.session.Companyid,

        })
    } catch (err) {

    }
}
const Orders = async(req, res, next) => {
    try {

        let order = await getOrders(req.session.Companyid)

        res.render('Orders', {
            order: order,
            isAdmin: req.session.isAdmin,
            isUser: req.session.userId,
            isCompany: req.session.Companyid,

        })
    } catch (err) {

    }

}

const PostOrders = async(req, res, next) => {
    try {

        if (req.session.Companyid) {

            let Order = await InsertOrder(req.body.id, req.body.FirstName, req.body.Category, req.body.Department, req.session.Companyid, req.session.NameCampny)


            res.redirect('/Orders')
        } else {
            res.redirect('/Company/login')
        }

    } catch (err) {

        req.flash('ErrOrder', err)
        res.redirect('/')
    }

}


const OrderDelete = async(req, res, next) => {

    let deletes = await deleteOrder(req.body.OrderDelete)
    res.redirect('/Orders')
}


const OrdersAdmin = async(req, res, next) => {
    let getAll = await getAllOrders()

    res.render('OrdersAll', {
        isAdmin: req.session.isAdmin,
        isUser: req.session.userId,
        isCompany: req.session.Companyid,
        order: getAll

    })
}


module.exports = {
    Orders,
    PostOrders,
    Ordersid,
    OrderDelete,
    OrdersAdmin
}