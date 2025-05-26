//LAYOUT PROFILE
import { Outlet } from "react-router-dom"
import Tabs from "@/components/profile/Tabs"

function ProfileLayout() {

    //---VIEW---//
    return (
        <>
            <Tabs />

            <Outlet />
        </>
    )
}

export default ProfileLayout;