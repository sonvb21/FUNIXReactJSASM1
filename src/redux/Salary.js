import * as ActionTypes from './ActionTypes';

export const Salary = (state = { errMess: null, comments: [] }, action) => {
    switch (action.type) {
        case ActionTypes.ADD_SALARY:
            return { ...state, errMess: null, salary: action.payload };

        case ActionTypes.SALARY_FAILED:
            return { ...state, errMess: action.payload };

        default:  
            return state;
    };
}