import { UserACLModel } from "./user-acl-model";

export interface UserModel {
    id: number;
    username: string;
    password: string; // only allowed on create
    acls: UserACLModel[];
}