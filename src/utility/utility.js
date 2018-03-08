const validate = (value, rules, connectedValue) => {
    let isValid = true;
    for (let rule in rules) {
        switch (rule) {
            case 'isEmail':
                isValid = isValid && emailValidator(value);
                break;
            case 'minLength':
                isValid = isValid && minLengthValidator(value, rules[rule]);
                break;
            case 'equalTo':
                isValid = isValid && equalToValidator(value, connectedValue[rule]);
                break;
            case 'notEmpty':
                isValid = isValid && notEmptyValidator(value);
                break;
            default:
                isValid = true;
        }
    }

    return isValid;
}


const emailValidator = val => {
    return /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(val);
}

const minLengthValidator = (val, minLength) => {
    return val.length >= minLength
}

const equalToValidator = (val, checkVal) => {
    return val === checkVal;
}

const notEmptyValidator = val => {
    return val.trim() !== "";
}

export default validate;