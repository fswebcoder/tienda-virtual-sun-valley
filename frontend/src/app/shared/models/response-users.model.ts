export interface ResponseUsersModel {
    users:      IUser[];
    total:      number;
    totalPages: number;
}

export interface IUser {
    id:      string;
    name:    string;
    email:   string;
    passwor: null;
    rol:     string;
}
