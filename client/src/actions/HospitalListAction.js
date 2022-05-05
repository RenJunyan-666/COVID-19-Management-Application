import axios from 'axios'

function loadHospitals(){
    return (dispatch)=>{
        axios.get('http://localhost:8000/hospitals').then(res=>{
            //console.log(res.data)
            dispatch({
                type:"load-hospitals",
                payload:res.data
            })
        }).catch(err=> console.log(err))
    }
}

export default loadHospitals