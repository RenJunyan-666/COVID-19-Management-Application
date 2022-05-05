const hospitalReducer = (preState = {
    hospital:"non-chosen hospital"
}, action)=>{
    let newState = {...preState} //不能直接对原状态进行修改
    switch(action.type){
        case "chosen-hospital":
            newState.hospital = action.payload
            return newState
        default:
            return preState
    }
}

export default hospitalReducer