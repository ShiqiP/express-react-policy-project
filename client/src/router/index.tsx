import { createBrowserRouter } from "react-router-dom";
import App from "../App";
// import Login from "../page/Login";
// import PolicyList from "../page/policyList";
import PolicyList from "../page/PolicyList";
import Policy from "../page/Policy";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/",
                element: <PolicyList />
            },
            {
                path: "/c/:name/:id",
                element: <PolicyList />
            }, {
                path: "/policy/:id",
                element: <Policy />
            }
        ]
    },

])

export default router;