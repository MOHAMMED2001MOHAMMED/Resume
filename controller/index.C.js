//const { Addcategory, getcategory } = require('../models/Controller.M')
const { getemployment, getcatogery, researchs } = require('../models/Users.M')
const { getUser } = require('../models/Users.M')
const { getOrders } = require('../models/Orders.M')
const { getcategorys, DeleteCategory, Addcategory } = require('../models/Controller.M')

const index = async(req, res, next) => {
    try {

        if (!req.query.category || req.query.category == 'all') {
            let getcate = await getcategorys()
            let getusers = await getUser()

            let arr = []
            for (let i = 0; i < getcate.length; i++) {
                arr.push(getcate[i].department)
            }
            let arr1 = []
            for (let i = 0; i < arr.length; i++) {
                for (let e = 0; e < arr.length; e++) {
                    if (arr1.length == 0) {
                        arr1.push(arr[e])
                    } else if (!arr1.includes(arr[e])) {
                        arr1.push(arr[e])

                    }
                }
            }


            res.render('index', {
                isAdmin: req.session.isAdmin,
                isUser: req.session.userId,
                isCompany: req.session.Companyid,
                department: arr1,
                getcate: getcate,
                getusers: getusers,
                ErrOrder: req.flash('ErrOrder'),
                title: 'm'

            });
        } else {
            let getcate = await getcategorys()

            let getusers = await getcatogery(req.query.category)


            let arr = []
            for (let i = 0; i < getcate.length; i++) {
                arr.push(getcate[i].department)
            }
            let arr1 = []
            for (let i = 0; i < arr.length; i++) {
                for (let e = 0; e < arr.length; e++) {
                    if (arr1.length == 0) {
                        arr1.push(arr[e])
                    } else if (!arr1.includes(arr[e])) {
                        arr1.push(arr[e])

                    }
                }
            }


            res.render('index', {
                isAdmin: req.session.isAdmin,
                isUser: req.session.userId,
                isCompany: req.session.Companyid,
                department: arr1,
                getcate: getcate,
                getusers: getusers,
                ErrOrder: req.flash('ErrOrder')

            });
        }
    } catch (err) {
        console.log(err)
    }
}

const controller = async(req, res, next) => {
    let success = req.flash('success')
    let Failure = req.flash('Failure')
    let getCategory = await getcategorys()

    res.render('controller', {
        isAdmin: req.session.isAdmin,
        isUser: req.session.userId,
        isCompany: req.session.Companyid,
        success: success,
        Failure: Failure,
        getcategorys: getCategory
    })

}


const controllerpost = (req, res, next) => {

    Addcategory(req.body).then(resulte => {

        req.flash('success', "successfully registered")
        res.redirect('/controller')
    }).catch(err => {
        console.log(err)
        req.flash('Failure', err)
        res.redirect('/controller')
    })


}

const employment = async(req, res, next) => {
    try {

        let employment = await getemployment(req.params.id)

        res.render('employment', {
            employment: employment,
            isAdmin: req.session.isAdmin,
            isUser: req.session.userId,
            isCompany: req.session.Companyid,
        })
    } catch (err) {
        console.log(err)
    }
}


const search = async(req, res, next) => {
    try {

        let search = await researchs(req.query.search)

        if (search.length >= 1) {
            res.render('search', {
                employment: search,
                isAdmin: req.session.isAdmin,
                isUser: req.session.userId,
                isCompany: req.session.Companyid,
            })
        } else {
            res.render('search', {
                employment: false,
                isAdmin: req.session.isAdmin,
                isUser: req.session.userId,
                isCompany: req.session.Companyid,
            })
        }

    } catch (err) {
        console.log(err)
    }
}

const DeleteCategoryFromControler = async(req, res) => {
    try {

        let DC = await DeleteCategory(req.body.id)
        res.redirect('/controller')
        console.log(DC)
    } catch (err) {
        return err

    }
}



module.exports = {
    controller,
    controllerpost,
    index,
    employment,
    search,
    DeleteCategoryFromControler
}