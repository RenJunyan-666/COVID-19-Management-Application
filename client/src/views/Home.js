import { useNavigate, Link } from "react-router-dom";
import { useContext, useEffect } from "react";
import AuthContext from "../context/AuthProvider";
import { useLocation } from 'react-router-dom';
import React, { useState } from 'react'
import Navbar from "../components/homeComponents/NavBar";
import axios from "axios";
import "./style/Home.scss";
import { Layout } from 'antd'

const Home = () => {
    const { setAuth } = useContext(AuthContext);
    const navigate = useNavigate();
    let location = useLocation();

    const[users, setUsers] = useState();
    const[user, setUser] = useState();

    const { Header, Footer, Sider, Content } = Layout;

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();
        const getUsers = async () => {
            try{
                const response = await axios.get('/useraccounts') ;
                console.log(response.data);
                isMounted && setUsers(response.data);
            } catch (err) {
                console.error(err);
            }
        }

        getUsers();
        

        return () => {
            isMounted = false;
            controller.abort();
        }
    }, [])





    function handletClick() {    
        console.log(location.state);
        var id = location.state.idddd;
        console.log('userid',id);
        id = id.replace("\"","").replace("\"","");
        const userid = id;
        console.log(userid);

        navigate('/test',{replace: true , state:{idd: userid, flag: 0}});
    }
    function handlevClick() {
        console.log(location.state);
        var id = location.state.idddd;
        console.log('userid',id);
        id = id.replace("\"","").replace("\"","");
        const userid = id;
        console.log(userid);    
        navigate('/vaccine',{replace: true , state:{iddd: userid, flag: 0}});
    }

    function handlepClick() {
        var id = location.state.idddd;
        id = id.replace("\"","").replace("\"","");
        console.log(id);
            for(var prop in users){
                var user = users[prop]
                if(user._id == id){
                    setUser(user);
                    console.log(user);
                } else {console.log("no")}
            }
        document.getElementById("userInfo").style.display="block";
        document.getElementById("hbtn").style.display="block";
        document.getElementById("cbtn").style.display="none";
    }

    function handlehClick() {
        document.getElementById("userInfo").style.display="none";
        document.getElementById("hbtn").style.display="none";
        document.getElementById("cbtn").style.display="block";
    }

    function handleuClick() {
        document.getElementById("editInfo").style.display="block";
        document.getElementById("nameinpt").value=`${!user.userInfo.name?"":user.userInfo.name}`;
        document.getElementById("geninpt").value=`${!user.userInfo.gender?"":user.userInfo.gender}`;
        document.getElementById("ageinpt").value=`${!user.userInfo.age?"":user.userInfo.age}`;
        document.getElementById("birthinpt").value=`${!user.userInfo.birth?"":user.userInfo.birth}`;
        document.getElementById("addinpt").value=`${!user.userInfo.address?"":user.userInfo.address}`;
        document.getElementById("phoneinpt").value=`${!user.userInfo.phone?"":user.userInfo.phone}`;
        document.getElementById("emailinpt").value=`${!user.userInfo.email?"":user.userInfo.email}`;
    }
    function handlesClick() {
        var name = document.getElementById("nameinpt").value;
        var gender = document.getElementById("geninpt").value;
        var age = document.getElementById("ageinpt").value;
        var birth = document.getElementById("birthinpt").value;
        var address = document.getElementById("addinpt").value;
        var phone = document.getElementById("phoneinpt").value;
        var ema = document.getElementById("emailinpt").value;

        var r = window.confirm("Do you want to submit changes?");
        if (r == true) {
            var id = location.state.idddd;
            id = id.replace("\"","").replace("\"","");
            console.log(id);
            for(var prop in users){
                var user = users[prop]
                if(user._id == id){
                    var userid = user._id;
                    try{
                        axios.put(`/useraccounts/${userid}`,{
                            userInfo:{
                                name:name,
                                gender:gender,
                                age:age,
                                birth:birth,
                                address:address,
                                phone:phone,
                                email:ema
                              }
                        });
                        alert("Submited!")
                    } catch (err) {
                        console.error(err);
                    }
                } else {console.log("no")}
            }
            document.getElementById("userInfo").style.display="none";
            document.getElementById("editInfo").style.display="none";
            document.getElementById("hbtn").style.display="none";
            document.getElementById("cbtn").style.display="block"
            navigate('/editsuccess', {replace: true , state:{idddd: id, flag: 0}})
        } else {
           window.alert("Submition canceld");
    }

        

    }
    function handlecClick() {
        document.getElementById("editInfo").style.display="none";

    }

    const signout = async () => {
        // if used in more components, this should be in context 
        // axios to /logout endpoint 
        setAuth({});
        navigate('/login');
    }

    const logout = async () => {
        var r = window.confirm("Do you want to logout?");
        if (r == true) {
            var id = location.state.idddd;
            id = id.replace("\"","").replace("\"","");
            console.log(id);
            for(var prop in users){
                var user = users[prop]
                if(user._id == id){
                    var userid = user._id;
                    try{
                        const response = await axios.delete(`/useraccounts/${userid}`) ;
                        console.log(response.data);
                        alert("Logout!")
                    } catch (err) {
                        console.error(err);
                    }
                } else {console.log("no")}
            }
            navigate('/login');
        } else {
           window.alert("Logout canceld");
    }
        
    }


    return (


                
        <Layout className="homeBackground"> 

            <section className="homeBackground">
                <Navbar />

                <a className='homeTitle3'>COVID-19 Test/Vaccine Appointment System</a>

                <Sider style={{background:"rgba(0,0,128,0.8)"}} 
                    width={"375px"}>
                        
                    <section className='containerHome'>
                    
                        <section className="totalHome">
                            <h1 className="homeHome">Home</h1>
                            <br />
                            <p className="welcomeHome">Welcome!</p>
                            
                            <button className="btnHome" type="button" onClick={handletClick}>Go Test    </button>
                            <br />
                            <button className="btnHome" type="button" onClick={handlevClick}>Go Vaccine    </button>
                            <br />
                            <button id="cbtn" className="btnHome" type="button" onClick={handlepClick} style={{display:"block"}}>Check My Profile    </button>
                            <button id="hbtn" className="btnHome" type="button" onClick={handlehClick} style={{display:"none"}}>Hide My Profile</button>

                            <br />

                            
                            <div className="flexGrow">
                                <button button className="btnHome" onClick={signout}>Sign Out</button>
                            </div>
                            <br />
                            <div className="flexGrow">
                                <button button className="btnHome" onClick={logout}>Log Out</button>
                            </div>
                        </section>
                    
                    </section>
                </Sider>

                

                <div>
                    <div id="userInfo"  style={{display:"none"}}  className='profile'>
                        <p className="pp">Name: {!user?"not loaded":user.userInfo.name}</p>
                        <p className="pp">Gender: {!user?"not loaded":user.userInfo.gender}</p>
                        <p className="pp">Age: {!user?"not loaded":user.userInfo.age}</p>
                        <p className="pp">Birthday: {!user?"not loaded":user.userInfo.birth}</p>
                        <p className="pp">Address: {!user?"not loaded":user.userInfo.address}</p>
                        <p className="pp">Phone: {!user?"not loaded":user.userInfo.phone}</p>
                        <p className="pp">Email: {!user?"not loaded":user.userInfo.email}</p>
                        <button className="btnHome" onClick={handleuClick}>Edit My Profile</button>  
                    </div>
                </div>

                <div>                                
                    <div id="editInfo" style={{display:"none"}}  className='profile2'>
                        <p className="homeInputLabel">Name: {!user?"not loaded":user.userInfo.name}</p>
                        <input id="nameinpt" className="inpt" type="text" style={{ marginBottom: "6px", marginTop:"-2px", height:"33px", width:"300px" }}></input>
                        <p className="homeInputLabel">Gender: {!user?"not loaded":user.userInfo.gender}</p>
                        <input id="geninpt" className="inpt" type="text" style={{ marginBottom: "6px", marginTop:"-2px", height:"33px", width:"300px" }}></input>
                        <p className="homeInputLabel">Age: {!user?"not loaded":user.userInfo.age}</p>
                        <input id="ageinpt" className="inpt" type="text" style={{ marginBottom: "6px", marginTop:"-2px", height:"33px", width:"300px" }}></input>
                        <p className="homeInputLabel">Birthday: {!user?"not loaded":user.userInfo.birth}</p>
                        <input id="birthinpt" className="inpt" type="date" style={{ marginBottom: "6px", marginTop:"-2px", marginLeft:"10px", height:"33px", width:"300px"}}></input>
                        <p className="homeInputLabel">Address: {!user?"not loaded":user.userInfo.address}</p>
                        <input id="addinpt" className="inpt" type="text" style={{ marginBottom: "6px", marginTop:"-2px", height:"33px", width:"300px" }}></input>
                        <p className="homeInputLabel">Phone: {!user?"not loaded":user.userInfo.phone}</p>
                        <input id="phoneinpt" className="inpt" type="text" style={{ marginBottom: "6px", marginTop:"-2px", height:"33px", width:"300px" }}></input>
                        <p className="homeInputLabel">Email: {!user?"not loaded":user.userInfo.email}</p>
                        <input id="emailinpt" className="inpt" type="text" style={{ marginBottom: "6px", marginTop:"-2px", height:"33px", width:"300px" }}></input>
                        
                        <p>
                            <button className="btnSubmit" onClick={handlesClick}>Submit</button>
                            <button className="btnCancel" onClick={handlecClick}>Cancel</button>  
                        </p>
                        
                    </div>
                    <br />
                </div>
            </section>
        </Layout>
    )
}

export default Home