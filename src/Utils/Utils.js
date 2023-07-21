import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";


export const apiRequest = async (endpoint, data, method, headers) => {

    try {
        const response = await axios[method](endpoint, data, { headers })
       
        return response.data
        
    } catch (error) {
    
        console.log(error);
    }

}


export const apiPost = (endpoint, data) => {
    const apiheaders = {
        'Content-Type': 'application/json'
    }
    return apiRequest(endpoint, data, 'post', apiheaders)
}

export const apiPostWithFromData = (endpoint, data) => {
    const apiheaders = {
        'Content-Type': 'multipart/form-data'
    }
    return apiRequest(endpoint, data, 'post', apiheaders)
}



export const apiGet = (endpoint, data= null) => {
    const apiheaders = {
        'Content-Type': 'application/json'
    }
    return apiRequest(endpoint, data, 'get', apiheaders)
}



// async storage 

// get item 
export const setItem = (key, data) => {
    data = JSON.stringify(data);
    return AsyncStorage.setItem(key, data)
}

// set item 
export const getItem = async (key) => {
    try {
        const item = await AsyncStorage.getItem(key)
        return JSON.parse(item)

    } catch (error) {
        
        return false
    }
}


export function removeItem(key) {
	return AsyncStorage.removeItem(key);
}

export function clearAsyncStorate(key) {
	return AsyncStorage.clear();
}




