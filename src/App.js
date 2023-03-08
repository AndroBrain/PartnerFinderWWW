import "./styles/theme.css"
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from "react-router-dom";
import {LoginPage} from "./pages/auth/login/LoginPage";

function App() {
    const router = createBrowserRouter(
        createRoutesFromElements([
            <Route path="/login" element={<LoginPage/>}/>,
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