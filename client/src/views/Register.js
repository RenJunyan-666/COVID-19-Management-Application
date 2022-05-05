import { useRef, useState, useEffect } from "react";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Navbar from '../components/loginComponents/NavBar'
import React from 'react'
import axios from "../api/axios";
import './style/Register.scss';

const USER_REGEX = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/    ///^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const REGISTER_URL = '/register';

const Register = () => {
    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        const result = USER_REGEX.test(user);
        console.log(result);
        console.log(user);
        setValidName(result);
    }, [user])

    useEffect(() => {
        setValidPwd(PWD_REGEX.test(pwd));
        setValidMatch(pwd === matchPwd);
    }, [pwd, matchPwd])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd, matchPwd])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const v1 = USER_REGEX.test(user);
        const v2 = PWD_REGEX.test(pwd);
        if(!v1 || !v2) {
            setErrMsg("Invalid Entry");
            return;
        }
        try {
            const response = await axios.post(REGISTER_URL,
                JSON.stringify({ email: user, password: pwd,
                    userInfo:{
                        name:"",
                        gender:"",
                        age:"",
                        birth:"",
                        address:"",
                        phone:"",
                        email:user
                     },
                     vaccineInfo:{
                        patient:"",
                        orderDate:"",
                        location:"",
                        dose:"",
                        insurance:"",
                        vaccineType:"",
                        provider:"",
                        status:false
                     },
                     testInfo:{
                        patient:"",
                        orderDate:"",
                        location:"",
                        testType:"",
                        completedDate:"",
                        provider:"",
                        method:"",
                        result:"",
                        status:false
                    }
                 }),
                {
                    headers: { 'Content-Type': 'application/json' }//,
                    // withCredentials: true
                }
            );
            console.log(response.data)
            console.log(response.accessToken);
            console.log(JSON.stringify(response))
            setSuccess(true);
            //clear input fields
        } catch (err) {
            if(!err?.response) {
                setErrMsg( 'No Server Response' );
            } else if (err.response?.status === 409) {
                setErrMsg('Username Taken');
            } else {
                setErrMsg('Registration Failed')
            }
            errRef.current.focus();
        }
        
    }

    return (
        <>
        {success ? (
            <section className='bd'>
                <Navbar />
                <h1 className='ttl3'>COVID-19 Test/Vaccine Appointment System</h1>
            <section className="container">
            
            <section className="total">
                <h1 className="ttl">Registration Success</h1>
                <p className="pp">
                    <a className="aa" href="http://localhost:3000/login">Sign In</a>
                </p>
            </section>
            </section>
            </section>
        ) : (
            <section className='bd'>
                <Navbar />
                <h1 className='ttl3'>COVID-19 Test/Vaccine Appointment System</h1>
        <section className="container">
        <section className="total">
            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"}
                aria-live="assertive">{errMsg}</p>
            <h1 className="ttl">Register</h1>
            <form onSubmit={handleSubmit}>
                <label className="ttl2" htmlFor="username">
                    Username:
                    <span className={validName ? "valid" : "hide"}>
                        <FontAwesomeIcon icon={faCheck} />
                    </span>
                    <span className={validName || !user ? "hide" : "invalid"}>
                        <FontAwesomeIcon icon={faTimes} />
                    </span>
                </label>
                <br />
                <input className="inpt"
                    type="text"
                    id="username"
                    ref={userRef}
                    autoComplete="off"
                    onChange={(e) => setUser(e.target.value)}
                    required
                    aria-invalid={validName ? "false" : "true"}
                    onFocus={() => setUserFocus(true)}
                    onBlur={() => setUserFocus(false)}
                />
                <p id="uidnote" className={userFocus && user &&
                    !validName ? "instructions" : "offscreen"}>
                    <FontAwesomeIcon icon={faInfoCircle} />
                    Please enter valid email address.<br />
                    example: xxx@163.com.<br />
                    Letters, numbers, underscores, hyphens allowed.
                </p>
                <br />
                <label className="ttl2" htmlFor="password">
                    Password:
                    <FontAwesomeIcon icon={faCheck} className={validPwd ? "valid" : "hide"} />
                    <FontAwesomeIcon icon={faTimes} className={validPwd || !pwd ? "hide" : "invalid"} />
                </label>
                <br />
                <input className="inpt"
                    type="password"
                    id="password"
                    onChange={(e) => setPwd(e.target.value)}
                    value={pwd}
                    required
                    aria-invalid={validPwd ? "false" : "true"}
                    aria-describedby="pwdnote"
                    onFocus={() => setPwdFocus(true)}
                    onBlur={() => setPwdFocus(false)}
                />
                <p id="pwdnote" className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>

                    <FontAwesomeIcon icon={faInfoCircle} />
                    8 to 24 characters.<br />
                    Must include uppercase and lowercase letters, a number and a special character.<br />
                    Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
                </p>
                <br />
                <label className="ttl2" htmlFor="confirm_pwd">
                    Confirm Password:
                    <span className={validMatch && matchPwd ? "valid" : "hide"}>
                        <FontAwesomeIcon icon={faCheck} />
                    </span>
                    <span className={validMatch || !matchPwd ? "hide" : "invalid"}>
                        <FontAwesomeIcon icon={faTimes} />
                    </span>
                </label>
                <br />
                <input className="inpt"
                    type="password"
                    id="confirm_pwd"
                    onChange={(e) => setMatchPwd(e.target.value)}
                    required
                    aria-invalid={validMatch ? "false" : "true"}
                    aria-describedby="confirmnote"
                    onFocus={(() => setMatchFocus(true))}
                    onBlur={() => setMatchFocus(false)}
                />
                <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
                    <FontAwesomeIcon icon={faInfoCircle} />
                    Must match the first password input field.
                </p>
                <br />
                <button className="btn2" disabled={!validName || !validPwd || !validMatch ? true : false}>Sign Up</button>
                <br />
                <p className="pp">
                    Already registered?<br />
                    <span className="line">
                    {/*router link */}
                    <a className="aa" href="http://localhost:3000/login">Sign In</a>
                    </span>
                </p>
            </form>
        </section>
        </section>
        </section>
        )}
        </>
    )
}

export default Register