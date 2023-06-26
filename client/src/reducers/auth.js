
//Reducers are functions that take in the state and action
const initialState = {
    authData : null,
    errorS : null,
    errorSignUp : null
}
const authReducer = (state = initialState, action ) => {
    switch(action.type)
    {
        case 'AUTH' : 
            localStorage.setItem('profile', JSON.stringify({...action?.data}));

            return { ...state, authData : action?.data};
        case 'LOGOUT' : 
            localStorage.clear();
            return { ...state, authData : null};
        case 'SIGNIN_ERROR' : 
            return { ...state, errorS : action?.errorMessage};
        case 'SIGNUP_ERROR' :
            return { ...state, errorSignUp : action?.signUpError};
         
        default : 
            return state;
    }
}

export default authReducer;