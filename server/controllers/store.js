import Store from "../models/store.js";

export const getStoreItem = async (req,res) =>{
    try {
        const sotreInfo = await Store.find()

        res.status(200).json(sotreInfo)
    } catch (error) {
        res.status(404).json({message:message.error})
        
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