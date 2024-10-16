import { UserACLModel } from "./user-acl-model";

export interface UserModel {
    id: number;
    username?: string;
    password?: string; // only allowed on create
    currentPassword?: string;    
    acls?: UserACLModel[];

    repeatPassword?: string;
}