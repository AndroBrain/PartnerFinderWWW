import "./styles/theme.css"
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from "react-router-dom";
import {LoginPage} from "./pages/auth/login/LoginPage";
import {RegisterPage} from "./pages/auth/register/RegisterPage";
import {SurveyPage} from "./pages/survey/SurveyPage";
import {HomePage} from "./pages/home/HomePage";
import {HomePageLogged} from "./pages/home/logged/HomePageLogged"
import {ChatPage} from "./pages/chat/ChatPage"

function App() {
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
        <div className="app">
            <RouterProvider router={router}/>
        </div>
    );
}

export default App;
export const appName = "Burza Mózgów"
export const apiUrl = "http://localhost:8081/api"
