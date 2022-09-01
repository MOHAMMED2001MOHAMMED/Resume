const mongoose = require('mongoose')

const CategorySchema = mongoose.Schema({
    department: String,
    category: String
})

const Categorys = mongoose.model('Category', CategorySchema)

const Addcategory = async(data) => {
    try {
        let cate = new Categorys({
            department: data.Department,
            category: data.Category
        })
        let resulte = await cate.save()
        return resulte
    } catch (err) {
        return err
    }
}

const getcategorys = async() => {
    try {
        let cato = await Categorys.find({})
        
        return cato
    } catch (err) {
        return err
    }
}

// DELETE CATEGORY ---

const DeleteCategory = async (id) => {
    try {
        let cate = await Categorys.deleteOne({_id:id})
        console.log(cate)
    } catch(err) {
        return err
    }

}


module.exports = {
    Addcategory,
    getcategorys,
    DeleteCategory
}