import { ChangeEvent, FormEvent, useContext, useState } from "react";
import usePublic from "../methods/public";
import { LoginContext } from "../context/LoginContext";
import { usePopup } from "../context/PopupContext";

function Login({ onClose }: { onClose: Function }) {
    // shiqipam@gmail.com
    const [formData, setFormData] = useState({ email: "", fullName: "" });
    const [validForm, setValidForm] = useState({ email: true, fullName: true });
    const loginContext = useContext(LoginContext)
    const { showPopup } = usePopup();

    const { login, signup } = usePublic();

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }
    const isValidEmail = (value: string) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
    }
    const isValidEmpty = (value: string) => {
        return value !== null && value !== undefined && value.trim() !== ""
    }
    const handleBlur = (e, validFunc: Function) => {
        const { name, value } = e.target;
        setValidForm(pre => { return { ...pre, [name]: validFunc(value) } })
    }
    const checkForm = () => {
        setValidForm({ email: isValidEmail(formData.email), fullName: isValidEmpty(formData.fullName) })
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        checkForm()
        if (!validForm.email) return

        const { email } = formData;
        login({ email }).then(() => {
            onClose()
            showPopup("Login successfully!")
        }).catch(() => { })

    }
    const handleSignUp = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        checkForm()
        if (!Object.keys(validForm).every(key => formData[key])) return

        const { email, fullName } = formData;
        signup({ email, fullName }).then(() => {
            onClose()
            showPopup("Enjoy your journey!")
        }).catch(() => { })
    }
    const handleChangeType = (e) => {
        e.preventDefault()
        loginContext.setState(pre => { return { ...pre, type: pre.type === 0 ? 1 : 0 } });
    }


    return (
        <>
            <div className="w-80 p-x">
                {loginContext.state.type === 0 && <>
                    <div className="mb-5">
                        <span className="text-2xl font-bold  pr-3">Log in</span>
                        <span className="text-sky-800 font-bold text-3xl cursor-pointer">MIU Policies</span>
                    </div>
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-3">
                        <div >
                            <input className="border border-sky-300 text-lg px-3 py-1 w-full h-10 rounded" name="email" value={formData.email} placeholder="Email" onChange={handleChange} onBlur={(e) => handleBlur(e, isValidEmail)} />
                            <p className={`mb-1 text-sm text-red-600 ${validForm.email ? 'invisible' : 'visible'}`} >Please enter a valid email address.</p>
                        </div>
                        <button className="bg-sky-800 text-white text-lg py-1 font-bold rounded" type="submit">Login</button>
                        <button className="bg-sky-800 text-white text-lg py-1 font-bold rounded" onClick={handleChangeType}>Sign up</button>
                    </form>
                </>
                }
                {loginContext.state.type !== 0 && <>
                    <div className="mb-5">
                        <span className="text-2xl font-bold  pr-3">Sign up</span>
                        <span className="text-sky-800 font-bold text-3xl cursor-pointer">MIU Policies</span>
                    </div>
                    <form onSubmit={handleSignUp} className="grid grid-cols-1 gap-3">
                        <div>
                            <input className="border w-full border-sky-300 text-lg px-3 py-1  h-10 rounded" name="email" value={formData.email} onChange={handleChange} placeholder="Email" onBlur={(e) => handleBlur(e, isValidEmail)} />
                            <p className={`mb-1 text-sm text-red-600 ${validForm.email ? 'invisible' : 'visible'}`} >Please enter a valid email address.</p>
                            <input className="border w-full border-sky-300 text-lg px-3 py-1  h-10 rounded" name="fullName" value={formData.fullName} onChange={handleChange} onBlur={(e) => handleBlur(e, isValidEmpty)} placeholder="FullName" />
                            <p className={`mb-1 text-sm text-red-600 ${validForm.fullName ? 'invisible' : 'visible'}`} >Please enter fullName to sign up</p>
                        </div>

                        <button className="bg-sky-800 text-white text-lg py-1 font-bold rounded" type="submit">Sign up</button>
                        <button className="bg-sky-800 text-white text-lg py-1 font-bold rounded" onClick={handleChangeType}>Back to log in</button>
                    </form>
                </>
                }
            </div>
        </>
    )

}
export default Login;