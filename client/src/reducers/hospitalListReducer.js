const hospitalListReducer = (preState = {
    hospitalList:[]
}, action)=>{
    let newState = {...preState} 
    switch(action.type){
        case "load-hospitals":
            newState.hospitalList = action.payload
            return newState
        default:
            return preState
    }
}

export default hospitalListReducer