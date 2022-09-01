const mongoose = require('mongoose')

const OrderSchema = mongoose.Schema({
    IdUser: String,
    FirstName: String,
    Category: String,
    Department: String,
    IdCompany: String,
    NameCompany: String
})


const order = mongoose.model('order', OrderSchema)


const InsertOrder = async(IdUser, FirstName, Category, Department, IdCompany, NameCompany) => {
    try {

        let OrderCompany = await order.findOne({ IdUser: IdUser.trim() })

        if (OrderCompany) {
            return Promise.reject('The User is Alredy')
        } else {
            let orders = new order({
                IdUser: IdUser.trim(),
                FirstName: FirstName,
                Category: Category,
                Department: Department,
                IdCompany: IdCompany,
                NameCompany: NameCompany
            })
            let Order = await orders.save()
            return Order
        }
    } catch (err) {
        console.log(err)
        return err
    }
}

const getOrders = async(IdCompany) => {
    try {

        let OrderCompany = await order.find({ IdCompany: IdCompany })

        return OrderCompany
    } catch (err) {
        return err
    }
}


const deleteOrder = async(id) => {
    try {

        console.log(id)
        let deletes = await order.deleteOne({ _id: id.trim() })
        console.log(deletes)
    } catch (err) {
        return err
    }
}


const getAllOrders = async() => {
    try {
        let AllOrders = await order.find({})
        console.log(AllOrders, 'assssssssssssssss')
        return AllOrders
    } catch (err) {
        return err
    }
}




module.exports = {
    InsertOrder,
    getOrders,
    deleteOrder,
    getAllOrders
}