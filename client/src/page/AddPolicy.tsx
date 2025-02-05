
import RichText from '../components/RichText/index'
import Dialog from "../components/Dialog"
import { useContext, useEffect, useRef, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import usePublic from '../methods/public'
import { CategoryType } from "../utils/types"
import { usePopup } from "../context/PopupContext";

function AddPolicy({ isOpen, onClose }: { isOpen: boolean, onClose: Function }) {
    const [validForm, setValidForm] = useState({ title: true });
    const [form, setForm] = useState({ description: "", title: "", category: 0 })
    const [categories, setCategories] = useState<Array<CategoryType>>([]);
    const { showPopup } = usePopup();
    const authContext = useContext(AuthContext)
    const { addPolicy, getCategories } = usePublic();

    useEffect(() => {
        getCategories().then((data) => {
            setCategories(data as Array<CategoryType> ? data : []);
        })
    }, [])

    const handleSelection = (e) => {
        setForm((prev) => ({ ...prev, category: e.target.value }));
    };

    const isValidEmpty = (value: string) => {
        return value !== null && value !== undefined && value.trim() !== ""
    }

    const handleBlur = (e, validFunc: Function) => {
        const { name, value } = e.target;
        setValidForm(pre => { return { ...pre, [name]: validFunc(value) } })
    }
    const checkForm = () => {
        setValidForm({ title: isValidEmpty(form.title) })
    }
    const handleDialogClose = () => {
        onClose();
        // setLoginDialogVisible(false)
    }
    const loginDialogProps = {
        isOpen,
        onClose: handleDialogClose,
        title: "",
    }
    const handleAdd = async () => {
        const { description, title, category } = form;
        const { id } = authContext.state
        checkForm();
        if (!Object.keys(validForm).every(key => validForm[key])) return;

        addPolicy({ description, owner: id, title, category, date: new Date().getTime() }).then(() => {
            handleDialogClose()
            showPopup("Successfully add a policy!")
        }).catch(() => { })
    }

    const handleGetContent = (editor) => {
        setForm((prev) => ({ ...prev, description: editor.getHtml() }));
    }
    const handleOnChange = (e) => {
        const { name, value } = e.target
        setForm((prev) => ({ ...prev, [name]: value }));
    }
    return (
        <>
            <Dialog {...loginDialogProps}>
                {/* Header Slot */}
                {/* <div slot="header">
                    <h2 className="text-xl font-bold text-center">Welcome Back!</h2>
                </div> */}
                {/* Body Slot */}
                <div slot="body">
                    <div className="flex">
                        <div className="mr-9">
                            <label className='mr-3 -text-sm font-medium text-gray-700'>Title: </label>
                            <input className="border border-sky-300 text-lg px-3 py-1 h-10 rounded" type="text" value={form.title} placeholder='title' name="title" onChange={handleOnChange} onBlur={(e) => handleBlur(e, isValidEmpty)} />
                            <p className={`mb-1 text-sm text-red-600 ${validForm.title ? 'invisible' : 'visible'}`} >Please add a title.</p>
                        </div>
                        <div>
                            <label htmlFor="options" className="mr-3 -text-sm font-medium text-gray-700">
                                Category:
                            </label>
                            <select
                                id="options"
                                value={form.category}
                                onChange={handleSelection}
                                className="border border-sky-300 text-lg px-3 py-1 h-10 rounded"
                            >
                                {
                                    categories.map(c => {
                                        return (
                                            <option key={c.id} value={c.id}>{c.name}</option>
                                        )
                                    })
                                }

                            </select>
                        </div>
                    </div>
                    <RichText onChange={handleGetContent} />
                </div>

                {/* Footer Slot */}
                <div slot="footer" className="flex justify-end space-x-2">
                    <button
                        onClick={handleDialogClose}
                        className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleAdd}
                        className="px-4 py-2 bg-sky-800 text-white rounded hover:bg-blue-500"
                    >
                        Add
                    </button>
                </div>
            </Dialog>
        </>
    );
}

export default AddPolicy;