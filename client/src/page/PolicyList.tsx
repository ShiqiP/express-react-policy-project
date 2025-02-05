import { useEffect, useState } from "react";
import usePublic from "../methods/public";
import { Link } from "react-router-dom";
import AddPolicy from "./AddPolicy";
import { useParams, useNavigate } from "react-router";
import dayjs from "dayjs";
import { ColorList } from "../utils/types";

function PolicyList() {
    const params = useParams();
    const { getPolicies, getCategories } = usePublic();
    const [policyList, setPolicyList] = useState<Array<any>>([]);
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    const handleAddPolicy = () => {
        setIsOpen(true);
    }
    const handleOnClose = () => {
        setIsOpen(false);
    }
    const go2Route = (id) => {
        navigate(`/policy/${id}`)
    }
    useEffect(() => {
        const getData = async () => {
            const res = await getPolicies({ categoryId: params.id });
            const categories = await getCategories();
            const data = res.map((el) => {
                return { ...el, dateFormat: dayjs(el.date).format('MMM D'), categoryName: categories.find(c => c.id == el.category).name }
            })
            setPolicyList(data as Array<any>);
        }
        getData();
    }, [params])

    return (
        <>
            <AddPolicy isOpen={isOpen} onClose={handleOnClose} />
            <div className="p-8 w-full relative h-full">
                {/* Sticky header button */}
                <div className="sticky top-0 bg-white z-10">
                    <button
                        className="bg-sky-800 px-4 py-2 mb-4 text-white text-lg font-bold rounded"
                        onClick={handleAddPolicy}
                    >
                        Add Policy
                    </button>
                </div>
                {/* Table */}
                <div className="max-h-full overflow-y-auto ">
                    <table className="min-w-full">
                        {/* Header */}
                        <thead className="bg-slate-100 sticky top-0">
                            <tr>
                                <th className="sticky top-0 px-4 py-2 text-sky-800 text-lg text-left">
                                    Policy
                                </th>
                                <th className="sticky top-0 px-4 py-2 text-sky-800 text-lg">
                                    Voted
                                </th>
                                <th className="sticky top-0 px-4 py-2 text-sky-800 text-lg">
                                    Created
                                </th>
                            </tr>
                        </thead>
                        {/* Scrollable Body */}
                        <tbody>
                            {policyList.map((policy) => (
                                <tr
                                    key={policy.id}
                                    className="cursor-pointer border-b hover:bg-slate-50"
                                    onClick={() => go2Route(policy.id)}
                                >
                                    <td className="w-2/3 px-4 py-2 ">
                                        <div className="text-sky-800 text-2xl">{policy.title}</div>
                                        <div className="flex items-center  mt-2">
                                            <div
                                                style={{
                                                    backgroundColor:
                                                        ColorList[policy.category],
                                                }}
                                                className="w-3 h-3  "
                                            ></div>
                                            <span className="text-sky-800 text-base ml-1"> {policy.categoryName}</span>
                                        </div>


                                    </td>
                                    <td className="text-center px-4 py-2 text-orange-600 font-bold">
                                        {policy.vote_user.length}
                                    </td>
                                    <td className="text-center px-4 py-2 text-sky-800">
                                        {policy.dateFormat}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

export default PolicyList;