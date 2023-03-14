import {useContext} from "react";
import {authContext} from "../auth/auth";
import {HomePagePreview} from "./preview/HomePagePreview";

export function HomePage() {
    const {authState} = useContext(authContext)
    return <div>
        {authState.jwt !== null ? <span className="display-large">Hello logged in user</span> : <HomePagePreview/>}
    </div>
}
