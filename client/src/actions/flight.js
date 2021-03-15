import axios from 'axios'
import { getFlight } from '../reducers/flightReducer'

export const create = async (from, to, dateThere, dateBack) => {
    try {
        const response = await axios.post(`http://localhost:5000/api/flight/`, {
            from,
            to,
            dateThere,
            dateBack,
        })
        console.log(response.data.message)
    } catch (e) {
        alert(e.response.data.message)
    }
}
export const get = () => {
    return async dispatch=>{
        try {
            const response = await axios.get(`http://localhost:5000/api/flight/`)
            dispatch(getFlight (response.data))
            console.log(response.data)
        } catch (e) {
            alert(e.response.data.message)
        }
    }
    
}