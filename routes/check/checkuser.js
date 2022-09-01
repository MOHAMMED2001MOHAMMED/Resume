const isuser = (req, res, next) => {
    if (req.session.userId) next()
    else res.redirect('/users/login')
}

const notuser = (req, res, next) => {
    if (!req.session.userId) next()
    else res.redirect('/users/profile')
}


const isDatacv = (req, res, next) => {
    if (req.session.isDataCV) next()
    else res.redirect('/users/cvuser')
}

const isAdmin = (req, res, next) => {
    if (req.session.isAdmin) res.redirect('/')
    else next()
}

const Admin = (req, res, next) => {
    //console.log(req.session.isAdmin)
    if (req.session.isAdmin) next()
    else res.redirect('/')
}



module.exports = {
    isuser,
    isDatacv,
    notuser,
    isAdmin,
    Admin
}