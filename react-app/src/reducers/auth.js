import {
    SIGNIN, 
    SIGNUP, 
    SIGNIN_ERROR, 
    SIGNUP_ERROR, 
    SIGNUP_RESET,
    SIGNIN_RESET,
    LOGOUT
} from './../actions/types';

const user = JSON.parse(localStorage.getItem('user'));
const initialState = user ? {
    login: true,
    user: user // todo - sprawdzić co zwraca backend
} : {
    login: false,
    user: null,
    register_error: false
};


const auth = (state = initialState, action) => {
    switch (action.type) {
        case SIGNIN:
            localStorage.setItem("user", JSON.stringify(action.payload));
            return {
                ...state, auth: action.payload, login: true, login_error: false
            }
        case SIGNIN_ERROR:
            return {
                ...state, login_error: true,
            }
        case SIGNIN_RESET:
            return {
                ...state, login_error: false,
            }
        case SIGNUP:
            return {
                ...state, register_error: false, register_success: true
            }
        case SIGNUP_ERROR:
            return {
                ...state, register_error: true, register_success: false
            }
        case SIGNUP_RESET:
            return {
                ...state, register_error: false
            }
        case LOGOUT:
            localStorage.removeItem('user');
            return {
                ...state, login: false
            }
            default:
                return state;
    }
}

export default auth;