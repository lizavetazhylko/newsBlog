import { useEffect, useState } from "react";
import { EMAIL_REGEX } from "../constants";

const useValidation = (name: string, value: string, validations: any) => {
    const [isEmpty, setIsEmpty] = useState(true);
    const [minLengthErr, setMinLengthErr] = useState(false);
    const [isEmail, setIsEmail] = useState(false);
    const [confirmPwd, setConfirmPwd] = useState(true);
    useEffect(() => {
        for (const validation in validations) {
            switch (validation) {
                case 'isEmpty':
                    value ? setIsEmpty(false) : setIsEmpty(true);
                    break;
                case 'minLengthErr':
                    value.length < validations[validation] ? setMinLengthErr(true) : setMinLengthErr(false);
                    break;
                case 'isEmail':
                    EMAIL_REGEX.test(value.toLowerCase()) ? setIsEmail(false) : setIsEmail(true);
                    break;
                case 'confirmPwd':
                    value === validations[validation] ? setConfirmPwd(false) : setConfirmPwd(true);
                    break;   
                default: 
                    break;
            }
        }
    }, [value]);

    let errMsg = '';
    errMsg = isEmpty ? `${name} can not be empty` : errMsg;
    errMsg = minLengthErr && !errMsg ? `${name} must have more than ${validations['minLengthErr']} characters` : errMsg;
    errMsg = isEmail && !errMsg ? 'Email is invalid' : errMsg;
    errMsg = confirmPwd && !errMsg && name === 'confirmPassword' ? 'Incorrect password repeat' : errMsg;

    return errMsg ? errMsg[0].toUpperCase() + errMsg.substring(1) : errMsg;
};

export { useValidation };