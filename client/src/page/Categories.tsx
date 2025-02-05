import { useEffect, useState } from "react";
import usePublic from "../methods/public";
import { NavLink } from "react-router-dom";
import { ColorList } from "../utils/types";

type CategoryType = {
    id: number,
    name: string,
    color: string
}

function Categories() {
    const { getCategories } = usePublic();
    const [categories, setCategories] = useState<Array<CategoryType>>([]);

    useEffect(() => {
        const getData = async () => {
            const res = await getCategories();
            const data = res.map(e => {
                return { ...e, color: ColorList[e.id] }
            })
            setCategories(data as Array<CategoryType> ? data : []);
        }
        getData();
    }, [])



    return (
        <>
            <div className="h-full w-80 overflow-y-auto border border-r-1">
                <div className="grid grid-cols-1  px-2  pt-5">
                    {categories.map((c, i) => {
                        return (
                            <NavLink className={({ isActive }) => {
                                return isActive ? "bg-blue-50" : "";
                            }} key={c.id} to={`/c/${c.name}/${c.id}`}>
                                <div className="flex justify-items-center items-center p-2 ">
                                    <div style={{ background: c.color }} className={`w-3 h-3`}></div>
                                    <div className="p-2 text-xl">{c.name}</div>
                                </div>
                            </NavLink>
                        )
                    })}
                </div >
            </div>
        </>
    );
}

export default Categories;