export interface IUser{
    token : string;
    username : string;
    displayName : string;
    image ?: string;
}

export interface IUserFormValues{
    email : string;
    password : string;
    displayName ?: string;
    username ?: string;
}