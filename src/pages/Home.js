import {useAuth} from "../context/AuthContext.js";
import {useState} from "react";
import Login from "../components/Login.js";
import Register from "../components/Register.js";
import Navbar from "../components/Navbar";
import {useNavigate} from "react-router-dom";

const Home = () => {
    const { username } = useAuth()
    const [showLogin, setShowLogin] = useState(true); // State to toggle between login and register
    const navigate = useNavigate(); // Create an instance of useNavigate
    // Assuming you have a method to call when login is successful
    const onLoginSuccess = () => {
        navigate('/fleetdashboard'); // Redirect to the dashboard
    };

    // Assuming you have a method to call when registration is successful
    const onRegisterSuccess = () => {
        navigate('/fleetdashboard'); // Redirect to the dashboard
    };

    return (
        <>
            <Navbar/>
            <div id="title-and-links" className="centered-flex">
                <div className="title">
                    <h1 className="ihaul-style"> Fleet Management</h1>
                    <h2 className="ihaul-style">WeGo Transportation</h2>
                </div>
            </div>

            <div className="home-child">
                {username ? null : (
                    <div className="login-div">
                        {showLogin ? (
                            <>
                                <Login onLoginSuccess={onLoginSuccess}/>
                                {/* Add a button or a link that when clicked, will change showLogin to false */}
                                <button onClick={() => setShowLogin(false)} className="toggle-form">
                                    Don't have an account? Create one
                                </button>
                            </>
                        ) : (
                            <>
                                <Register onRegisterSuccess={onRegisterSuccess}/>
                                {/* Add a button or a link that when clicked, will change showLogin to true */}
                                <button onClick={() => setShowLogin(true)} className="toggle-form">
                                    Have an account? Login
                                </button>
                            </>
                        )
                        }
                    </div>
                )}
            </div>

        </>
    );
}
export default Home;