import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'

import PulseLoader from 'react-spinners/PulseLoader'
import { setCredentials } from './authSlice'
import { useDispatch } from 'react-redux'
import { useLoginMutation } from './authApiSlice'
import usePersist from '../../hooks/usePersist'

const Login = () => {
    const userRef = useRef() // set the focus on the username input when the component loads
    const errRef = useRef() // focus on the error message if there is one
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [errMsg, setErrMsg] = useState('')
    const [persist, setPersist] = usePersist()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [login, { isLoading }] = useLoginMutation()

    useEffect(() => {
        userRef.current?.focus()
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [username, password])


    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            // Attempt to log in
            const { accessToken } = await login({ username, password }).unwrap();
    
            // Dispatch the access token to Redux
            dispatch(setCredentials({ accessToken }));
    
            // Clear the input fields
            setUsername('');
            setPassword('');
    
            // Navigate to the dashboard
            navigate('/dash');
        } catch (err) {
            // Log the error for debugging
            console.error('Login error:', err);
    
            // Handle specific error cases
            if (!err?.status) {
                setErrMsg('No Server Response');
            } else if (err.status === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg(err.data?.message || 'Login Failed');
            }
    
            // Focus on the error message element if it exists
            errRef?.current?.focus();
        }
    };
    
    const handleUserInput = (e) => setUsername(e.target.value)
    const handlePwdInput = (e) => setPassword(e.target.value)
    const handleToggle = () => setPersist(prev => !prev) // checkbox to persist login
    const errClass = errMsg ? "errmsg" : "offscreen"

    //if (isLoading) return <p>Loading...</p>
    if (isLoading) return <PulseLoader color={"#FFF"} />
    
    const content = (
        <section className="public">
            <header>
                <h1>Employee Login</h1>
            </header>
            <main className="login">
                <p ref={errRef} className={errClass} aria-live="assertive">{errMsg}</p>

                <form className="form" onSubmit={handleSubmit}>
                    <label htmlFor="username">Username:</label>
                    <input
                        className="form__input"
                        type="text"
                        id="username"
                        ref={userRef}
                        value={username}
                        onChange={handleUserInput}
                        autoComplete="off"
                        required
                    />

                    <label htmlFor="password">Password:</label>
                    <input
                        className="form__input"
                        type="password"
                        id="password"
                        onChange={handlePwdInput}
                        value={password}
                        required
                    />
                    <button className="form__submit-button">Sign In</button>
                    <label htmlFor="persist" className="form__persist">
                        <input
                            type="checkbox"
                            className="form__checkbox"
                            id="persist"
                            onChange={handleToggle}
                            checked={persist}
                        />
                        Trust This Device
                    </label>
                </form>
            </main>
            <footer>
                <Link to="/">Back to Home</Link>
            </footer>
        </section>
    )

    return content
}
export default Login