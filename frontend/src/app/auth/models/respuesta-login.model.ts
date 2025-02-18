export interface ResponseLoginModel {
    access_token: string;
    user:         IUser;
}

export interface IUser {
    id:    string;
    email: string;
    role:  string;
}