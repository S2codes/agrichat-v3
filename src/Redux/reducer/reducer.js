import { ADD_TOKEN, LOGGED_IN, UPDATE_GROUP } from "../constants/types";
import { getItem } from '../../Utils/Utils';

// add token 

const intialState = []

export const reducer = (state = intialState, action) => {


    switch (action.type) {
        case ADD_TOKEN:
            return [
                ...state, action.payload
            ]
            break;

        default:
            return state
            break;
    }
}


// update groups 

const intailgroupStatus = false

export const updateGroupreducer = (state = intailgroupStatus, action) => {

    switch (action.type) {
        case UPDATE_GROUP:
            return state = action.payload

            break;

        default:
            return state
            break;
    }
}


// logged in 
const intailLoggedIn = false

export const isLoggedreducer = (state = intailLoggedIn, action) => {

    switch (action.type) {
        case LOGGED_IN:
            return state = action.payload
            break;

        default:
            return state
            break;
    }
}


