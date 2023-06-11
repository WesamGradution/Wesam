import Opportunity from "../models/opportunity.js";
import mongoose from "mongoose";
import User from "../models/user.js";
export const getOpportunity = async (req,res) =>{
    const admin_id = req.params.id
    
    try {

       
        const opportunityInfo = await Opportunity.find().populate("group_id")
        console.log("🚀 ~ file: opportunity.js:6 ~ getOpportunity ~ opportunityInfo:",JSON.stringify(opportunityInfo,null,2) )
        
        // Define a test function that takes an opportunity object and returns true if the admin_id is in the admins array of the group_id field
        const isAdmin = (opportunity) => {
          // Get the first element of the group_id array, which is an object
          const group = opportunity.group_id[0];
          // Check if the admins array of the group includes the admin_id
          return group.admins.includes(admin_id);
        };

        // Filter the opportunityInfo array using the test function
        const filteredOpportunityInfo = opportunityInfo.filter(isAdmin);

        // Send the filtered array as the response
        res.status(200).json(filteredOpportunityInfo)
    } catch (error) {
        res.status(404).json({message:"there are some problem with getOpprotunity controller"})
    }

}

export const getOpportunityById = async (req,res) =>{
    const id  = req.params.id
    try {
        const opportunityInfo = await Opportunity.findById(id).populate("attemps")
        
       
        

        res.status(200).json(opportunityInfo.attemps)
    } catch (error) {
        res.status(404).json({message:"there are some problem with getOpprotunity controller"})
    }

}

// show the opportunites to the user ( the reguler user)

export const getOpportunitiesUser = async (req,res) =>{
    try {
        // Get the user's _id from the request params
        const userId = req.params.id;
        
        // Convert the userId to an ObjectId type
        const objectId = new mongoose.Types.ObjectId(userId);
      
        // Find the user document by _id
        const user = await User.findById(objectId);

        // Find and populate the opportunities that have the user's groups in their group_id array
        const opportunities = await Opportunity.find({ group_id: { $in: user.groups } }).populate("group_id")
        

        // Create a new object with only the fields you want from the first opportunity
        const opp = Object.assign([], opportunities); // Use Object.assign method to copy properties

        console.log("🚀 ~ file: opportunity.js:68 ~ filteredOpportunities ~ filteredOpportunities:", opp)

        // Send back the opportunity as a JSON response
        res.json(opp);
      } catch (error) {
        // Handle any errors
        res.status(500).json({ message: error.message });
      }
}

// leting the user join the opportunities
export const getUserJoinOpportunity = async (req,res) =>{
    const {_id:oppId,userId} = req.body
  
    try {
      // Get the user id and opportunity id from the path parameters
     
  
      // Find the opportunity by id
      const opportunity = await Opportunity.findById(oppId);
  
      // Check if the opportunity was found
      if (!opportunity) {
        return res.status(404).json({ message: "Opportunity not found" });
      }
  
      // Check if the user is already in the opportunity
      if (opportunity.attemps.includes(userId)){
          return res.status(400).json({ message: "you already in the opportunites" });
      }
  
      // Update the opportunity with the new user
      // Use $push to add the user id to the members array
      // Use $inc to decrement the user limit by one
      // Use new: true to return the updated document
      const updatedOpportunity = await Opportunity.findByIdAndUpdate(
          oppId,
        {
          $push: { attemps: userId },
          $inc: { userLimit: -1 },
        },
        { new: true }
      );
  
      // Send back the updated opportunity
      res.status(200).json(updatedOpportunity);
    } catch (error) {
      // Handle any errors
      res.status(500).json({ message: error.message });
    }
   
    
  
  }
  


export const deleteOpportunity  = async (req,res) =>{
    const ids = req.body
    try {
        await Opportunity.deleteMany({_id:{$in:ids}})
        res.status(200).json({message:"opprotunities deleted successfully"})
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

export const postOpportunity = async (req,res) =>{
    const newOpprtunity = req.body;
    console.log("🚀 ~ file: opportunity.js:16 ~ postOpportunity ~ newOpprtunity:", newOpprtunity)
    
    const saveNewOpportunity = new Opportunity(newOpprtunity)

    try {
        await saveNewOpportunity.save()

        res.status(201).json(saveNewOpportunity)
    } catch (error) {
        res.status(500).json({message:error.message})
        
    }
}