const mongoose = require('mongoose')
const bcrept = require('bcrypt')
const { reject } = require('bcrypt/promises')



const SchemaUser = mongoose.Schema({
    Email: String,
    Password: String,
    FirstName: { type: String, default: "" },
    LastNmae: { type: String, default: "" },
    Age: Number,
    AddressAll: { type: String, default: "" },
    City: { type: String, default: "" },
    Skills: [String],
    Mobail: { type: String, default: "" },
    Facebook: { type: String, default: "" },
    Linkedin: { type: String, default: "" },
    Githup: { type: String, default: "" },
    Upwork: { type: String, default: "" },
    Freelancer: { type: String, default: "" },
    TheField: { type: String, default: "" },
    Specialization: { type: String, default: "" },
    YearsExperience: { type: String, default: "" },
    image: { type: String, default: "muhammad.jpg" },
    languges: [String],
    TheUniversity: { type: String, default: "" },
    degree: { type: String, default: "" },
    Department: { type: String, default: "" },
    Gender: { type: String, default: "" },
    MartialStatus: { type: String, default: "" },
    Nationality: { type: String, default: "" },
    Domicile: { type: String, default: "" },
    Experience: [],
    isDataCV: {
        type: Boolean,
        default: false
    },
    employeetime: {
        type: String,
        default: ""
    },
    CommentCertificate: {
        type: String,
        default: ""
    },
    CertificateName: {
        type: String,
        default: ""
    },
    Campus: {
        type: String,
        default: ""
    },
    MartialStatus: {
        type: String,
        default: ""
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    Category: {
        type: String,
        default: ""
    }





})

const user = mongoose.model('User', SchemaUser)


const signup = (data) => {

    return new Promise((resolve, reject) => {
        if (data.email == '') reject('The Email is Empty')
        else {
            user.findOne({ Email: data.email }).then(users => {
                if (users) {
                    console.log('the user is ')
                    reject('The user is already registered')
                } else {
                    bcrept.hash(data.password, 10).then(hashPass => {
                        console.log(hashPass)
                        let User = new user({
                            Email: data.email,
                            Password: hashPass,
                            Age: data.Age,
                        })
                        resolve(User.save())

                    })

                }
            })
        }
    })

}

const login = (data) => {
    return new Promise((resolve, reject) => {
        user.findOne({ Email: data.Email }).then(users => {

            if (!users) {
                reject('User is not registered')
            } else {
                console.log(users)

                bcrept.compare(data.Password, users.Password).then(comparepass => {
                    console.log(comparepass)
                    if (!comparepass) {
                        reject('wrong password')
                    } else {

                        return resolve({
                            id: users._id,
                            FirstName: users.FirstName,
                            imageuser: users.image,
                            isDataCV: users.isDataCV,
                            isAdmin: users.isAdmin
                        })
                    }
                })
            }
        })
    })
}


const InsertData = (data, images) => {

    console.log(data, 'sssssssssssdeeeeeeeeeeeeeeeeas');
    return new Promise((resolve, reject) => {
        const id = data.id.trim()


        console.log(data.Skills)
        console.log(data.languages)

        let User = {
            degree: data.Department,
            Specialty: data.Specialty,
            Department: data.Department,
            FirstName: data.FirstName,
            Specialization: data.Specialization,
            FirstName: data.FirstName,
            LastNmae: data.LastNmae,
            Nationality: data.Nationality,
            Domicile: data.Domicile,
            Address: data.Address,
            Mobail: data.Mobile,
            AddressAll: data.Address,
            City: data.City,
            Skills: data.Skills,
            languges: data.languages,
            isDataCV: true,
            Facebook: data.Facebook,
            Upwork: data.Upwork,
            Linkedin: data.linkedin,
            Githup: data.Githup,
            Freelancer: data.Freelancer,
            employeetime: data.employeetime,
            CommentCertificate: data.CommentCertificate,
            CertificateName: data.CertificateName,
            Gender: data.Gender,
            Campus: data.Campus,
            MartialStatus: data.MartialStatus,
            image: images,
            Category: data.Category,
            Experience: data.Experience

        }
        user.updateOne({ _id: id }, { $set: User }).then(users => {
            if (users) {

                resolve({
                    id: id,
                    FirstName: data.FirstName,
                    imageuser: images,
                    isDataCV: true
                })

            } else {
                reject('not found user')
            }
        })
    })
}

const getcatogery = async(category) => {
    try {
        console.log(category)
        let getcatogreies = await user.find({ Category: category })
        console.log(getcatogreies)
        return getcatogreies
    } catch (err) {
        return err
    }
}

const getProfile = async(id) => {
    try {
        let users = await user.findById(id)
        console.log('ssssss')
        return users
    } catch (err) {
        return Promise.reject(err)
    }
}

const getUser = async() => {
    try {
        let users = await user.find({ isAdmin: false }, {
            FirstName: true,
            Age: true,
            Skills: true,
            Specialization: true,
            languges: true,
            degree: true,
            Department: true,
            Gender: true,
            Nationality: true,
            employeetime: true,
            CommentCertificate: true,
            CertificateName: true,
            Campus: true,
            Experience: true,
            Category: true,
            isDataCV: true
        })
        return users
    } catch (err) {
        return err
    }
}


const getemployment = async(id) => {
    try {
        let users = await user.findById(id, {
            FirstName: true,
            Age: true,
            Skills: true,
            Specialization: true,
            languges: true,
            degree: true,
            Department: true,
            Gender: true,
            Nationality: true,
            employeetime: true,
            CommentCertificate: true,
            CertificateName: true,
            Campus: true,
            Experience: true,
            Category: true
        })
        return users
    } catch (err) {
        return err
    }
}


const researchs = async(research) => {
    let rr = `${research}`
    console.log(rr)
    let r = new RegExp(rr, 'i')
    console.log(r)
    let users = await user.find({
        $or: [{ City: { $regex: r } },
            { Gender: { $regex: r } },
            { Category: { $regex: r } },
            { Nationality: { $regex: r } },
            { degree: { $regex: r } },
            { employeetime: { $regex: r } },
            { Campus: { $regex: r } },
            { languges: { $regex: r } },
            /*{ Experience: { $regex: r } },*/
            { Skills: { $regex: r } },
        ]
    }, {
        FirstName: true,
        Age: true,
        Skills: true,
        Specialization: true,
        languges: true,
        degree: true,
        Department: true,
        Gender: true,
        Nationality: true,
        employeetime: true,
        CommentCertificate: true,
        CertificateName: true,
        Campus: true,
        Category: true,
        Experience: true
    })
    console.log(users, 'uerssssssssssssssssssssssssssssssssssssssssssssssssssss')
    return users
}



const login_google = async(data) => {
    try {
        console.log(data.photos[0], 'phptoooooooooooo');
        let user_google = await user.findOne({ Email: data.email })
        if (user_google == null) {
            let users = new user({
                Email: data.email,
                FirstName: data.given_name,
                LastNmae: data.family_name,
                image: data.photos[0].value,
                password: await bcrept.hash(Math.random(), 10)
            })
            return await users.save()
        }
        return user_google
    } catch (err) {
        console.log(err);
    }
}





module.exports = {
    signup,
    login,
    InsertData,
    getProfile,
    getUser,
    getemployment,
    getcatogery,
    researchs,
    login_google

}