const loginUserReducer = (preState = {
    user:{}
}, action)=>{
    let newState = {...preState} 
    switch(action.type){
        case "login-user":
            newState.user = action.payload
            return newState
        default:
            return preState
    }
}

export default loginUserReducer