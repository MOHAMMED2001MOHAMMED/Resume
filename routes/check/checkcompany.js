const isCompany = (req, res, next) => {
    if (req.session.Companyid) next()
    else res.redirect('/Company/login')
}

const notCompany = (req, res, next) => {
    if (!req.session.Companyid) next()
    else res.redirect('/')
}


module.exports = {
    isCompany,
    notCompany
}