import axios from 'axios'


export const fetchState = async () => {
    try {
        const stateData = await axios.get('https://odishakrushi.in/agrichatapp/api/location/state?api_key=20882528c754f848c7as0Ss')
        return stateData.data.data
    } catch (e) {
        showError("Internal Server Error")
    }
}

export const fetchDistict = async (state) => {
    try {
        const districtsData = await axios.get(`https://odishakrushi.in/agrichatapp/api/location/districts?api_key=20882528c754f848c7as0Ss&state_id=${state}`)
        return districtsData.data.data
    } catch (e) {
        showError("Internal Server Error")
    }
}

export const fetchBlock = async (district) => {
    try {
        const blocksData = await axios.get(`https://odishakrushi.in/agrichatapp/api/location/blocks?api_key=20882528c754f848c7as0Ss&district_id=${district}`)
        return blocksData.data.data
    } catch (e) {
        showError("Internal Server Error")
    }
}


