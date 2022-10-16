const EMAIL_REGEX: RegExp = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
const MIN_PWD_LENGTH: number = 4;

export { 
    EMAIL_REGEX,
    MIN_PWD_LENGTH,
};