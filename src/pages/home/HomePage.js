import {useContext} from "react";
import {authContext} from "../auth/auth";
import {HomePagePreview} from "./preview/HomePagePreview";
import {HomePageLogged} from "./logged/HomePageLogged";

export function HomePage() {
    const {authState} = useContext(authContext)
    return <div>
        {authState.jwt !== null ? <HomePageLogged/> : <HomePagePreview/>}
    </div>
}
