import * as api from '../api';



export const signin = (formData, navigate) => async(dispatch) => {
    try {
        //login the user
        const {data} = await api.signIn(formData);
        // console.log(data);
        dispatch({type : 'AUTH', data});

        navigate('/');
    } catch (error) {
        const errorMessage = error.response.data.message;
        console.log(errorMessage);
        dispatch({type : 'SIGNIN_ERROR', errorMessage});
        // console.log(error.response.data.message);
        // console.log(error);
    }

}
//the component interacts with the action controller directly which in turn takes the help of an api call 
//we need to give the api the props needed to make the api call and the action controllers res is the response that the api gets which is also fetched by the action controller front end

export const signup = (formData, navigate) => async(dispatch) => {
    try {
        //sign up the user
        const {data} = await api.signUp(formData);

        dispatch({type : 'AUTH', data});

        navigate('/');

    } catch (error) {
        const signUpError = error.response.data.message;
        // console.log(signUpError);
        dispatch({type : 'SIGNUP_ERROR', signUpError});
    }

}