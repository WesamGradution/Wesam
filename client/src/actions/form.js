import * as api from "../API"

export const getForms = () => async(dispatch) => {

    try {
        const {data} = await api.fetchForm();
        
        dispatch({type:"FETCH_ALL",payload:data})
    } catch (error) {
        console.log(error.message)
        
    }

}

export const createForm = (post) => async(dispatch) => {

    try {
        const {data} = await api.createForm(post);
        dispatch({type:"CREATE",payload:post})
    } catch (error) {
        console.log(error.message)
        
    }

}