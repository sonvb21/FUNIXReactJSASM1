import { STAFFS, DEPARTMENTS } from '../shared/staffs';

export const initialState = {
    staffs: STAFFS,
    departments: DEPARTMENTS

};

export const Reducer = (state = initialState, action) => {
    switch(action.type) {
        case "ADD_STAFF":
            
            let newStaff = action.payload;
            console.log(newStaff)
            return {
                ...state ,staffs: [...state.staffs, newStaff]
            } ;
          break;
        
        default:
            return state;
      }
   
};