import { UserCallAddress } from "../constants";

type User = {
    id?: number,
    username?: string,
    password: string
    email: string,
};

type UserState = {
    user: User | null
};

type UserActivate = {
    uid: string,
    token: string,
};

type JwtResponse = {
    access: string,
    refresh: string,
};

type UserCall = {
    call: UserCallAddress,
}

export type { User, UserState, UserActivate, JwtResponse, UserCall };