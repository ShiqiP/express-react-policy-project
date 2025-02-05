
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { nanoid } from "nanoid";
import { getResponseBody } from "../utils";
import { AuthType } from "../utils/types";
import Policy from "./Policy";

class User {
    protected data;
    private dataPath;
    constructor() {
        this.dataPath = join(__dirname, "../data/users.json");
        this.data = JSON.parse(readFileSync(this.dataPath).toString());
    }
    persist() {
        writeFileSync(this.dataPath, JSON.stringify(this.data, null, 2));
    }
    add(fullName: string, email: string) {
        if (this.data.findIndex(u => u.email == email) != -1)
            throw getResponseBody(null, 404, "Email is used")

        const newUser = {
            id: nanoid(),
            fullName,
            email,
            pwd:"",
            voted_policies:[]
        }
        this.data.push(newUser)
        this.persist();
        return newUser
    }
    getByEmail(email: string): AuthType {
        return this.data.find(u => u.email == email);
    }
    getById(id: string) {
        return this.data.find(u => u.id == id);
    }
    voteIn(id: string, policyId: string): boolean {
        const user = this.getById(id);
        if (!user) return false;
        
        const policy = new Policy();
        policy.addVoteUser(policyId,id);

        user.voted_policies.push(policyId);
        this.persist();
        return true;
    }
    voteDown(id: string, policyId: string): boolean {
        const user = this.getById(id);
        if (!user) return false;
        const policy = new Policy();
        policy.removeVoteUser(policyId,id);
        user.voted_policies = user.voted_policies.filter(v => v != policyId);
        this.persist();
        return true;
    }

}

export default User;