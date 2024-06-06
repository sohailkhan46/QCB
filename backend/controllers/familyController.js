const user_model = require("../models/user");
const family_model = require("../models/familyMember");

const addFamilymember=async(req ,res)=>{
     try {
        const userId = req.extractedUserId;
            const {name , age , gender , phone_no} = req.body;
            
            const user = await user_model.findById(userId);
            if(!user){
                return res.status(400).json({message : "No such user exists"});
            }

            const familyMember = new family_model({ member_name:name, member_age : age, member_gender:gender, member_phone : phone_no, creator : userId});
            familyMember.save();
            return res.status(201).json({message : "Family member added successfully"});

     } catch (error) {
        return res.status(500).json({message: error.message});
     }
};

const getFamilyMembers=async(req ,res)=>{
    try {
        const userId = req.extractedUserId;
        const user = await user_model.findById(userId);
        if(!user){
            return res.status(400).json({message : "No such user exists"});
        }

        const familyMembers = await family_model.find({creator: userId});
        return res.status(200).json({familyMembers});
    }
        catch(error){
            return res.status(500).json({message: error.message});
        }
};


module.exports={addFamilymember , getFamilyMembers};