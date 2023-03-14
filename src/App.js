import "./styles/theme.css"
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from "react-router-dom";
import {LoginPage} from "./pages/auth/login/LoginPage";
import {RegisterPage} from "./pages/auth/register/RegisterPage";
import {SurveyPage} from "./pages/survey/SurveyPage";
import {HomePage} from "./pages/home/HomePage";
import {useState} from "react";
import {authContext} from "./pages/auth/auth";

function App() {
    const [authState, setAuthState] = useState({jwt: localStorage.getItem("jwt")})

    const login = (jwt) => {
        setAuthState({jwt: jwt})
        localStorage.setItem("jwt", jwt)
    }

    const router = createBrowserRouter(
        createRoutesFromElements([
            <Route path="/" element={<HomePage/>}/>,
            <Route path="/login" element={<LoginPage/>}/>,
            <Route path="/register" element={<RegisterPage/>}/>,
            <Route path="/survey" element={<SurveyPage/>}/>,
        ])
    )
    return (
        <authContext.Provider value={{authState, login}}>
            <div className="app">
                <RouterProvider router={router}/>
            </div>
        </authContext.Provider>
    );
}

export default App;
export const appName = "Burza Mózgów"
export const apiUrl = "https://localhost:44321/api"
