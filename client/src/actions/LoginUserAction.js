function getLoginUser(id, userList){
    let newUser = {}
    for(var i=0; i<userList.length; i++){
      if(id === userList[i]._id){
        newUser = userList[i]
        break
      }
    }
    //console.log(newUser)
    return {
        type:"login-user",
        payload:newUser
    }
}

export default getLoginUser