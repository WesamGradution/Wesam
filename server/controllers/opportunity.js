import Opportunity from "../models/opportunity.js";

export const getOpportunity = async (req,res) =>{
    try {
        const opportunityInfo = await Opportunity.find()

        res.status(200).json(opportunityInfo)
    } catch (error) {
        res.status(404).json({message:"there are some problem with getOpprotunity controller"})
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