import {GET_FLIGHTS} from './types'

const defaultState = {
    flights: {},
}

export default function flightReducer(state = defaultState, action) {
    switch (action.type) {
        case GET_FLIGHTS:
            return{
                ...state,
                flights:action.payload,
            }
        /*case LOGOUT:
            localStorage.removeItem('token')
            return{
                ...state,
                currentUser:{},
                isAuth:false,
            }*/
        default:
            return state
    }
}

export const getFlight=flight=>({type:GET_FLIGHTS,payload:flight})
