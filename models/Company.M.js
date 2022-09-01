const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const CompanySchema = mongoose.Schema({
    email: String,
    password: String,
    NameCampny: String,
    AddressAll: String,
    Mobail: String
})

const Company = mongoose.model('Company', CompanySchema)



const SignupCampany = async(data) => {
    try {
        let company = await Company.findOne({ email: data.email })
        if (company) {
            return Promise.reject('The company is already registered')
        } else {

            let hashing = await bcrypt.hash(data.password, 10)
            let companys = new Company({
                email: data.email,
                password: hashing,
                NameCampny: data.NameCompany,
                AddressAll: data.FullAddress,
                Mobail: data.Mobail
            })
            let savecompany = await companys.save()
            return savecompany
        }
    } catch (err) {
        console.log(err)
        return err
    }
}

const LoginCampany = async(data) => {
    try {
        let company = await Company.findOne({ email: data.Email })
        console.log(company)
        if (!company) {
            return Promise.reject('The company not already registered')
        } else {
            console.log(company)
            let compare = await bcrypt.compare(data.Password, company.password)
            console.log(compare, 'cccccccccccc')
            if (!compare) {
                return Promise.reject('Worng password')

            } else {
                return { id: company._id, NameCampny: company.NameCampny }
            }
        }
    } catch (err) {
        console.log(err)
        return err
    }
}

let company_google = async(data) => {
    try {

        let company_google = await Company.findOne({ email: data.email })
        if (company_google == null) {
            let Companys = new Company({
                email: data.email,
                FirstName: data.given_name + data.family_name,
            })
            return await Companys.save()
        }
        return company_google
    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    SignupCampany,
    LoginCampany,
    company_google
}