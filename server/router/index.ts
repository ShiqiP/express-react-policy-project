import { Router } from "express";
// import { addHandler, getAllHandler, getByIndexHandler, deleteHandler, updateHandler } from "./controller"
import { loginHandler, authHanlder, voteHandler, signUpHandler, getPolicyHandler, addPolicyHandler, getCategoryHandler } from '../controller/index'
const router = Router();

// router.post("/add/:val", addHandler)
// router.get("/getAll", getAllHandler)
// router.get("/getByIndex/:index", getByIndexHandler)
// router.delete("/delete/:index", deleteHandler)
// router.put("/update/:index/:val", updateHandler)

router.post("/login", loginHandler);
router.post("/signUp", signUpHandler);
router.get("/policies", getPolicyHandler);
router.get("/categories", getCategoryHandler)

// authentication
router.use(authHanlder);

router.post("/vote", voteHandler);
router.post("/addPolicy", addPolicyHandler);


export default router;