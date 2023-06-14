import Store from "../models/store.js";
import User from "../models/user.js";
// get all store item just for wesam owener
export const getStoreItem = async (req,res) =>{
    
    try {
        const sotreInfo = await Store.find().populate("group_id")

        res.status(200).json(sotreInfo)
    } catch (error) {
        res.status(404).json({message:message.error})
        
    }
}


// get the items from the admin so he can view it in his dashboard

export const getAdminItem = async (req,res) =>{
    
    const adminId = req.params.id
    console.log("🚀 ~ file: store.js:22 ~ getAdminItem ~ adminId:", adminId)
    try {
        const sotreInfo = await Store.find({admin:adminId}).populate("group_id")

        res.status(200).json(sotreInfo)
    } catch (error) {
        res.status(404).json({message:error.message})
        
    }
}


export const getItem =  async (req,res)=>{

    
    try {
        const title = req.params.cardName
        console.log(title)
        
        const item = await Store.findOne({name:title})

        res.status(200).json(item)
        
    } catch (error) {
        res.status(404).json({message:error.message})
        
    }
}

export const postStoreItem = async (req,res) =>{
    const newStoreItem = req.body
    console.log("🚀 ~ file: store.js:16 ~ postStoreItem ~ newStoreItem:", newStoreItem)
    

    const saveNewStoreItem = new Store(newStoreItem)

    try {
        await saveNewStoreItem.save()
        res.status(201).json(saveNewStoreItem)
    } catch (error) {
        res.status(500).json({message:message.error})
        
    }
}


export const getUserProduct = async (req,res) =>{
    const { userId } = req.params;
    console.log("🚀 ~ file: store.js:70 ~ getUserProduct ~ userId:", userId)

    try {
      // Find the user document by id and populate the groups field
      const user = await User.findById(userId).populate("groups");
  
      // Check if the user exists
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      // Get the user groups array from the user document
      const userGroups = user.groups;
  
      // Check if the user has any groups
      if (userGroups.length === 0) {
        return res.status(200).json({ message: "No product" });
      }
  
      // Create an empty array to store the matching products
      const userProducts = [];
  
      // Loop through the user groups array and find all the products that have the same group_id
      for (const userGroup of userGroups) {
        // Find all the products that have the same group_id as the userGroup and populate the group_id field
        const products = await Store.find({ group_id: userGroup._id }).populate(
          "group_id"
        );
  
        // Push all the products to the userProducts array
        userProducts.push(...products);
      }
  
      // Return a success message with the userProducts array
      return res.status(200).json(userProducts);
    } catch (error) {
      // Handle any errors
      return res.status(500).json({ message: error.message });
    }
}