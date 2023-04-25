export const changeTheme  = () => async(dispatch) =>{
    try {
        dispatch({
            type:"CHANGE_MODE"
        })
    } catch (error) {
        console.log(error.message)
        
    }
    
}

