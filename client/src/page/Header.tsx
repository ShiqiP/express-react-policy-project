import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useContext, useState } from "react";
import Dialog from "../components/Dialog"
import Login from "./Login";
import usePublic from "../methods/public";
import { LoginContext } from "../context/LoginContext";

function Header() {
    const loginContext = useContext(LoginContext)
    const authContext = useContext(AuthContext);
    const { logout } = usePublic();
    const [logoutVisible, setLogoutVisible] = useState(false);

    const handleLogout = () => {
        logout()
        setLogoutVisible(false)
    }

    const handleLogoutClose = () => {
        setLogoutVisible(false)
    }
    const logoutDialogProps = {
        isOpen: logoutVisible,
        onClose: handleLogoutClose,
        closeIcon: false
    }

    const handleLoginClose = () => {
        loginContext.setState(pre => { return { ...pre, loginVisible: false } })
    }
    const loginDialogProps = {
        isOpen: loginContext.state.loginVisible,
        onClose: handleLoginClose,
    }

    const handleAvatarClick = () => {
        if (!authContext.state.isAuth)
            loginContext.setState(pre => { return { ...pre, loginVisible: true } })
        else {
            setLogoutVisible(true)
        }
    }

    return (
        <>
            <div className="sticky top-0 flex justify-between items-center bg-blue-50 h-18 px-8 py-3">
                <div>
                    <Link to="/">
                        <span className="text-sky-800 font-bold text-3xl cursor-pointer">MIU Policies</span>
                    </Link>
                </div>
                <div onClick={handleAvatarClick} className="rounded-full bg-sky-800 h-12 w-12 flex justify-center items-center">
                    <div className="cursor-pointer text-white font-bold">
                        {authContext.state.fullName.substring(0, 5) || "Guest"}
                    </div>
                </div>
            </div>
            <Dialog {...loginDialogProps}>
                {/* Body Slot */}
                <div slot="body">
                    <Login onClose={handleLoginClose} />
                </div>
            </Dialog>
            <Dialog {...logoutDialogProps}>
                {/* Body Slot */}
                <div slot="body" className="px-8 text-gray-800 font-bold">
                    Do you want to log out?
                </div>

                {/* Footer Slot */}
                <div slot="footer" className="flex justify-end space-x-2">
                    <button
                        onClick={handleLogoutClose}
                        className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 "
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleLogout}
                        className="px-4 py-2 bg-sky-800 text-white rounded "
                    >
                        Log out
                    </button>
                </div>
            </Dialog>
        </>
    );
}

export default Header;