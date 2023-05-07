import "./styles/theme.css"
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from "react-router-dom";
import {LoginPage} from "./pages/auth/login/LoginPage";
import {RegisterPage} from "./pages/auth/register/RegisterPage";
import {SurveyPage} from "./pages/survey/SurveyPage";
import {HomePage} from "./pages/home/HomePage";
import {useState} from "react";
import {authContext} from "./pages/auth/auth";

import {HomePageLogged} from "./pages/home/logged/HomePageLogged"
import {ChatPage} from "./pages/chat/ChatPage"

const JWT_KEY = "jwt"

function App() {
    const [authState, setAuthState] = useState({jwt: localStorage.getItem(JWT_KEY)})

    const login = (jwt) => {
        setAuthState({jwt: jwt})
        localStorage.setItem(JWT_KEY, jwt)
    }

    const logout = () => {
        setAuthState({jwt: null})
        localStorage.removeItem(JWT_KEY)
    }

    const router = createBrowserRouter(
        createRoutesFromElements([
            <Route path="/" element={<HomePage/>}/>,
            <Route path="/login" element={<LoginPage/>}/>,
            <Route path="/register" element={<RegisterPage/>}/>,
            <Route path="/survey" element={<SurveyPage/>}/>,
            <Route path="/main" element={<HomePageLogged/>}/>,
            <Route path="/chat" element={<ChatPage/>}/>,
        ])
    )
    return (
        <authContext.Provider value={{authState, login, logout}}>
            <div className="app">
                <RouterProvider router={router}/>
            </div>
        </authContext.Provider>
    );
}

export default App;
export const appName = "Burza Mózgów"
export const apiUrl = "http://localhost:8081/api"
