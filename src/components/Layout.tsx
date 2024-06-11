import { FC } from "react";
import LoginForm from "./LoginForm";
import './Layout.css'

const Layout: FC = () => {

    return (
        <>
            <div className="wrapper">
                <LoginForm />
            </div>
        </>
    )
}

export default Layout