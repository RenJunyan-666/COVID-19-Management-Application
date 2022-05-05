import React, { useRef, useState, useEffect } from 'react'
import useAuth from '../hooks/useAuth';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Navbar from '../components/loginComponents/NavBar'
import './style/Login.scss';

import axios from '../api/axios';
const LOGIN_URL= '/auth';

const Login = () => {
    const { setAuth } = useAuth();

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd])

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const response = await axios.post(LOGIN_URL,
                JSON.stringify({email:user, password: pwd}),
                {
                    headers: { 'Content-Type': 'application/json' },
                    // withCredentials: true
                }
            );
            console.log(JSON.stringify(response?.data))
            const accessToken = response?.data?.accessToken;
            const roles = response?.data?.roles;
            setAuth( {user, pwd, roles, accessToken });
            setUser(" ");
            setPwd(" ");
            const idresp = await axios.get(`http://localhost:8000/useraccounts/${user}`)
            console.log(JSON.stringify(idresp?.data));
            const id = JSON.stringify(idresp.data)
            console.log(id);
            if(roles.includes(5150)) {
                navigate('/hospital');
            } else {
                navigate(from,{replace: true , state:{idddd: id, email:user, flag:0}});
            }
        } catch (err) {
            if (!err?.response) {
                setErrMsg(' No Server Response ');
            } else if (err.reponse?.status === 400) {
                setErrMsg( ' Missing Username or Password');
            } else if (err.reponse?.status === 401) {
                setErrMsg( ' Unauthorized ');
            } else {
                setErrMsg( ' Login Failed ');
            }
            errRef.current.focus();
        }
    }


   
        return (
            <section className='bd'>
                <Navbar />
                <h1 className='ttl3'>COVID-19 Test/Vaccine Appointment System</h1>
            <section className='container'>
                <section className='total'>
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"}
                        aria-live="assertive">{errMsg}</p>
                    <h1 className='ttl'>Sign In</h1>
                    <form onSubmit={handleSubmit} className='ff'>
                        <label className='ttl2' htmlFor='username'>Username:</label>
                        <input className='inpt'
                            type="text"
                            id="username"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setUser(e.target.value)}
                            value={user}
                            required
                        />
                        <label className='ttl2' htmlFor='password'>Password:</label>
                        <input className='inpt'
                            type="password"
                            id="password"
                            onChange={(e) => setPwd(e.target.value)}
                            value={pwd}
                            required
                        />
                        <button className='btn'>Sign In</button>
                    </form>
                    <p className='pp'>
                        Need an Account?<br />
                        <span className="line">
                            {/*router link */}
                            <a className='aa' href="http://localhost:3000/register">Sign Up</a>
                        </span>
                    </p>
                </section>
        </section>
        </section>

    )
}

export default Login