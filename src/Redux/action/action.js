import {ADD_TOKEN, LOGGED_IN, UPDATE_GROUP} from '../constants/types'


export const addToken = (data) => {

    return {
        type: ADD_TOKEN,
        payload: data
    }

}

export const updateGroup = (data) => {
    return {
        type: UPDATE_GROUP,
        payload: data
    }

}


export const loggedIN = (data) => {
    return {
        type: LOGGED_IN,
        payload: data
    }

}


