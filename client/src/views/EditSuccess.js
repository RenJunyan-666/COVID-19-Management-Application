import { useNavigate, useLocation } from "react-router-dom";
import "./style/Unauthorized.scss";

const EditSuccess = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const goBack = () => {
        console.log(location.state);
        const id = location.state.idddd;
        console.log('userid',id);
        // const [userid] = useState(id);
        const userid = id;
        console.log(userid);
        navigate('/', {state:{idddd: userid}});
    }

    return (
        <section className="bd">
        <section className="container">
            <section className="total">
                <h1 className="ttl">Profile Update Success</h1>
                <br />
                {/* <p className="pp">You do not have access to the requested page</p> */}
                <div className="flexGrow">
                    <button className="btn" onClick={goBack}>Go Back</button>
                </div>
            </section>
        </section>
        </section>
    )

}

export default EditSuccess;