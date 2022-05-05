const userListReducer = (preState = {
    userList:[]
}, action)=>{
    let newState = {...preState} 
    switch(action.type){
        case "load-users":
            newState.userList = action.payload
            return newState
        default:
            return preState
    }
}

export default userListReducer