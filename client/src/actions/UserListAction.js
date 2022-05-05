import axios from 'axios'

function loadUsers(){
    return (dispatch)=>{
        axios.get('http://localhost:8000/useraccounts').then(res=>{
            //console.log(res.data)
            dispatch({
                type:"load-users",
                payload:res.data
            })
        }).catch(err=> console.log(err))
    }
}

export default loadUsers