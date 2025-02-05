import { RequestHandler, Request } from "express";
import User from '../dataAccess/User'
import Policy from "../dataAccess/Policy";
import Category from "../dataAccess/Category"
import { getResponseBody, hashData, ResponseBodyType, getBase64, deBase64 } from "../utils";
import { PolicyType, AuthType, CategoryType } from "../utils/types";

const secretKey = 'ck';

// reqParams,resBody,reqBody,reqQuery
export const loginHandler: RequestHandler<unknown, ResponseBodyType<AuthType | null>, { email: string }, unknown> = (req, res, next) => {
    try {
        const { email } = req.body;
        const user = new User();

        // user not exist
        const userObj = user.getByEmail(email)
        if (!userObj) {
            throw getResponseBody(null, 403, "Create a user")
        }

        // login successfully
        const data = JSON.stringify({ email });
        const enc_data = getBase64(data);
        const hash_data = hashData(enc_data, secretKey);
        res.json(getResponseBody({
            id: userObj.id,
            fullName: userObj.fullName,
            email,
            enc_data,
            hash_data
        }))

    } catch (e) {
        next(e);
    }
}

export const signUpHandler: RequestHandler<unknown, ResponseBodyType<AuthType | null>, { email: string, fullName: string }, unknown> = (req, res, next) => {
    try {
        // create a new user
        const { email, fullName } = req.body;

        const user = new User();
        const newUser = user.add(fullName, email)

        const data = JSON.stringify({ email });
        const enc_data = getBase64(data);
        const hash_data = hashData(enc_data, secretKey);
        res.json(getResponseBody({
            id: newUser.id,
            fullName,
            email,
            enc_data,
            hash_data
        }))

    } catch (e) {
        next(e)
    }
}

export const authHanlder: RequestHandler = (req, res, next) => {
    try {
        const { enc_data, hash_data } = req.headers;
        const user = new User();
        const info = JSON.parse(deBase64(enc_data as string));
        if (!user.getByEmail(info.email)) {
            throw { status: 401, message: "Authentication Error" }
        }
        if (hash_data == hashData(enc_data as string, secretKey)) {
            next();
        } else {
            throw { status: 401, message: "Authentication Error" }
        }
    } catch (e) {
        throw { status: 401, message: "Authentication Error" }

    }
}

export const voteHandler: RequestHandler<unknown, ResponseBodyType, { id: string, policyId: string, status: number }, unknown> = (req, res, next) => {
    const { id, policyId, status } = req.body;
    const user = new User();

    if (status === 1) {
        if (user.voteIn(id, policyId))
            res.json(getResponseBody())
        else
            throw getResponseBody(null, 400, "vote in failed.");
    } else if (status === 0) {
        if (user.voteDown(id, policyId))
            res.json(getResponseBody())
        else
            throw getResponseBody(null, 400, "vote down failed.");
    } else {
        throw getResponseBody(null, 400, "status error.")
    }
}


export const getPolicyHandler: RequestHandler<unknown, ResponseBodyType<Array<PolicyType>>, unknown, { id?: string, categoryId?: number }> = (req, res, next) => {
    try {
        const { id, categoryId } = req.query;
        const policy = new Policy();
        if (id) {
            const data = policy.getById(id)
            if (data)
                res.json(getResponseBody<Array<PolicyType>>([data]));
            else
                throw getResponseBody(null, 400, `cannot find policy ${id}`)
        } else if (categoryId) {
            const data = policy.getByCategory(categoryId);
            res.json(getResponseBody<Array<PolicyType>>(data));
        } else {
            const data = policy.getAll();
            res.json(getResponseBody<Array<PolicyType>>(data));
        }
    } catch (e) {
        next(e)
    }

}
export const addPolicyHandler: RequestHandler<unknown, ResponseBodyType, PolicyType, unknown> = (req, res, next) => {
    try {
        const { title, description, owner, date, category } = req.body;
        const policy = new Policy();
        policy.add(
            title, description, owner, date, category
        )
        res.json(getResponseBody());
    } catch (e) {
        next(e)
    }
}

export const getCategoryHandler: RequestHandler<unknown, ResponseBodyType<Array<CategoryType>>, unknown, unknown> = (req, res, next) => {
    try {
        const category = new Category();
        res.json(getResponseBody(category.getAll()));
    } catch (e) {
        next(e);
    }
}