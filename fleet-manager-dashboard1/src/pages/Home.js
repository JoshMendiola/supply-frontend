import {useAuth} from "../context/AuthContext.js";
import {useState} from "react";
import Login from "../components/Login.js";
import Register from "../components/Register.js";
import Sidebar from "../components/Sidebar";

const Home = () => {
    const { username } = useAuth()
    const [showLogin, setShowLogin] = useState(true); // State to toggle between login and register

    return (
        <>
            <Sidebar/>
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
                                <Login/>
                                {/* Add a button or a link that when clicked, will change showLogin to false */}
                                <button onClick={() => setShowLogin(false)} className="toggle-form">
                                    Don't have an account? Create one
                                </button>
                            </>
                        ) : (
                            <>
                                <Register/>
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