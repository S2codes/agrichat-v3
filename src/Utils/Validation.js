import validator from 'is_js'


const checkEmpty = (val, key) => {
    if (validator.empty(val.trim())) {
        return `${key}`
    } else {
        return ''
    }
}

const checkMinLength = (val, minLength, key) => {
    if (val.trim().length < minLength) {
        return `Please Enter a Vaild ${key}`
    } else {
        return ''
    }
}


export default function (data) {

    const { userName, email, password, contact } = data

    if (userName !== undefined) {
        let empValdationText = checkEmpty(userName, 'Please Enter Your User Name')
        if (empValdationText !== '') {
            return empValdationText
        } else {
            let minLengthValidation = checkMinLength(userName, 2, 'userName')
            if (minLengthValidation !== '') {
                return minLengthValidation
            }
        }

    }

    if (email !== undefined) {
        let empValdationText = checkEmpty(email, 'Please Enter Your Email')
        if (empValdationText !== '') {
            return empValdationText
        } else {
            if (!validator.email(email)) {
                return "Plesae Enter a Valid Emial"
            }
        }

    }

    if (password !== undefined) {
        let empValdationText = checkEmpty(password, 'Please Enter Your Password')
        if (empValdationText !== '') {
            return empValdationText
        } else {
            let minLengthValidation = checkMinLength(password, 4, 'password')
            if (minLengthValidation !== '') {
                return minLengthValidation
            }
        }

    }

    
    if (contact !== undefined) {

    



        let empValdationText = checkEmpty(contact, 'Please Enter Your Contact Number')
        if (empValdationText !== '') {
            return empValdationText
        } else {

            const phoneNumberRegex = /^[6-9]\d{9}$/; // Regular expression for Indian mobile numbers starting with 6, 7, 8, or 9

            if (phoneNumberRegex.test(contact)) {
                return ''
            }else{
                return 'Enter Valid Your 10 Digit Mobile Number'
            }

            // let minLengthValidation = checkMinLength(contact, 10, 'contact')
            // if (minLengthValidation !== '') {
            //     return minLengthValidation
            // }
        }

    }




}
