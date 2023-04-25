 const form =  (forms =[],action) => {
    switch (action.type) {
        case 'FETCH_ALL':
            return action.payload;
        case "CREATE":
            return [...forms,action.payload]
        default:
            return forms
    }
}

export default form;
