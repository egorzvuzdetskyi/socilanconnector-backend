import axios from 'axios';
import {
    GET_PROFILE,
    PROFILE_LOADING,
    GET_ERRORS,
    CLEAR_CURRENT_PROFILE, SET_CURRENT_USER
} from "./types";

export const getCurrentProfile = () => dispatch => {
    dispatch(setProfileLoading());
    axios.get('/api/profile')
        .then(res => {
            dispatch({
                type: GET_PROFILE,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type: GET_PROFILE,
                payload: {}
            })
        })
};

export const setProfileLoading = () => {
    return {
        type: PROFILE_LOADING
    };
};

export const clearProfile = () => {
    return {
        type: CLEAR_CURRENT_PROFILE
    };
};

export const deleteAccount = () => dispatch => {
    if(!window.confirm('Are you sure? This can NOT be undone!')) return;

    axios
        .delete('/api/profile')
        .then(res => {
            dispatch({
                type: SET_CURRENT_USER,
                payload: {

                }
            })
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        })
};

export const createOrUpdateProfile = (profileData, history) => dispatch => {
    // should be separate into different methods. on server side also.
    axios
        .post('/api/profile', profileData)
        .then(res => history.push('/dashboard'))
        .catch(err => {
            console.log(err);
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        });
};