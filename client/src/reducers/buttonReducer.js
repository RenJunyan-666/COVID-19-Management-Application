const buttonReducer = (preState = {
    show:true
}, action)=>{
    let newState = {...preState} //不能直接对原状态进行修改
    switch(action.type){
        case "hide-btn":
            newState.show = false
            return newState
        case "show-btn":
            newState.show = true
            return newState
        default:
            return preState
    }
}

export default buttonReducer