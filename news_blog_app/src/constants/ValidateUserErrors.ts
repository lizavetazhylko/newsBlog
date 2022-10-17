export const EMAIL_REGEX: RegExp = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
export const MIN_PWD_LENGTH: number = 4;

export enum UserCallAddress {
    MENU = 'menu-call',
    HEADER = 'header-call',
};