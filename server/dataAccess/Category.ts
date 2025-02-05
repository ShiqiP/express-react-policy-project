
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { nanoid } from "nanoid";
import { CategoryType } from "../utils/types"

class Category {
    protected data;
    private dataPath;
    constructor() { 
        this.dataPath = join(__dirname, "../data/category.json");
        this.data = JSON.parse(readFileSync(this.dataPath).toString());
    }
    getAll(): Array<CategoryType> {
        return this.data;
    }


}

export default Category;