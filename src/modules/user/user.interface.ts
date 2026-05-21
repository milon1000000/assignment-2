export type Role="admin" | "agent" | "user"
export interface IUser{
    name:string,
    email:string,
    password:string,
    age:number,
    role?:Role
    is_active?:boolean
}