import usePublic from "../methods/public";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { PolicyType } from "../utils/types";
import { AuthContext } from "../context/AuthContext";

function Policy() {

    const params = useParams();
    const authContext = useContext(AuthContext);
    const { getPolicies, vote, login } = usePublic();
    const [policy, setPolicyList] = useState<PolicyType>();
    const [isVoted, setIsVoted] = useState<boolean>(false);
    const getData = async () => {
        const data = await getPolicies({ id: params.id });
        const policy = data[0] ? data[0] : null;
        setPolicyList(policy);

        const { vote_user } = policy
        setIsVoted(vote_user.includes(authContext.state.id))
    }
    useEffect(() => {
        getData();
    }, [params])

    const handleVote = () => {
        vote({ id: authContext.state.id, policyId: policy.id, status: isVoted ? 0 : 1 })
            .then(() => {
                getData();
                // login({ email: authContext.state.email });
            })
    }

    return (
        <>
            <div className="p-8 w-full" >
                <div className="text-5xl mb-3">{policy?.title}</div>
                <div className="flex ">
                    <button
                        onClick={handleVote}
                        className="px-4 py-2 bg-sky-800 text-white rounded "
                    >
                        {isVoted ? "Voted" : "Vote"}
                    </button>
                    <div style={{ marginLeft: "-1px" }} className="border-t-2  border-b-2 border-r-2 border-sky-800 px-4 py-2 rounded">
                        {policy?.vote_user.length}
                    </div>
                </div>
                <div className="h-full overflow-y-auto">
                    <div className="custom-html"
                        dangerouslySetInnerHTML={{ __html: policy?.description }}
                    />
                </div>

                <div>
                </div>
            </div >
        </>
    );
}

export default Policy;