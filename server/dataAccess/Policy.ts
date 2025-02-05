
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { nanoid } from "nanoid";
import { PolicyType } from "../utils/types"

class Policy {
    protected data;
    private dataPath;
    constructor() {
        this.dataPath = join(__dirname, "../data/policies.json");
        this.data = JSON.parse(readFileSync(this.dataPath).toString());
    }
    persist() {
        writeFileSync(this.dataPath, JSON.stringify(this.data, null, 2));
    }
    add(title: string, description: string, owner: string, date: number, category: number) {
        this.data.push({
            id: nanoid(),
            title,
            description,
            date,
            category,
            owner,
            vote_user: []
        })
        this.persist();
    }
    getById(id: string): PolicyType {
        return this.data.find(p => p.id == id);
    }
    getByCategory(id: number): Array<PolicyType> {
        return this.data.filter(p => p.category == id);
    }
    getAll(): Array<PolicyType> {
        return this.data;
    }
    addVoteUser(id: string, userId: string): boolean {
        const policy = this.data.find(p => p.id == id)
        if (!policy) return false;

        if (policy.vote_user.findIndex(u => u == userId) == -1) {
            policy.vote_user.push(userId)
            this.persist()
            return true;
        } else {
            return false;
        }
    }
    removeVoteUser(id: string, userId: string): boolean {
        let policy = this.data.find(p => p.id == id)
        if (!policy) return false;

        if (policy.vote_user.findIndex(u => u == userId) == -1) {
            return false;
        } else {
            policy.vote_user = policy.vote_user.filter(u => u != userId)
            console.log(policy)
            this.persist()
            return true;
        }
    }

}

export default Policy;