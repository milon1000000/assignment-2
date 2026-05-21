type Role="contributor " | "maintainer"

export interface IAuth{
    name:string,
    email:string,
    password:string,
    role:Role
}