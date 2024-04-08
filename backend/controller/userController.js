const User = require("../models/User");

const userController =
{
    getAlluser: async (req,res) =>
    {
        try{
            const user = await User.find();
            res.status(200).json(user)
        }catch(err)
        {
            res.status(500).json(err)
        }
    },
    deleteUser : async (req,res)=>
    {
        try {
            const  user = await User.findById(req.params.id);
            // User.findByIdAndDelete xoa luon trong database
            // User.findByIdAndUpdate tim kiem va cap nhap lai id 
            res.status(200).json(`da xoa thanh cong` )

        } catch (error) {
            res.status(500).json(error)
            
        }
    }
}

module.exports = userController;