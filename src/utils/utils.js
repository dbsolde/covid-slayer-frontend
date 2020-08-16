
export const inputValidator = (field, input) => {
    let result = ''
    switch (field) {
        case 'Name':
        case 'Password':
            if(!input) {
                result = `${field} is required.`
            } else if(input.length < 6 ) {
                result = `${field} must be at least 6 characters`
            }
        break;
        case 'email':
            if (!input) {
                result = `Email address is required.`
            } else if (!validateEmail(input)) {
                result = `Email address is not valid.`
            }
        break
        default: return null
    }
    return result
}

export const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
}

export const randomNum = (min,max) => {
    return Math.ceil(Math.random() * (max - min + 1)) + min;
}