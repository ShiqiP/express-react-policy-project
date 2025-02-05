export type PolicyType = {
    id?: string,
    title: string,
    description: string,
    owner: string,
    date: number,
    category: number
}
export type AuthType = {
    id: string,
    fullName: string,
    email: string,
    enc_data: string,
    hash_data: string
}

export type CategoryType = {
    id: number,
    name: string
}