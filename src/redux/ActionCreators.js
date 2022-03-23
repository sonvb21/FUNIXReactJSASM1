import { baseUrl } from '../shared/baseUrl';
import * as ActionTypes from './ActionTypes';

// gọi API danh sách nhân viên
export const fetchStaffs = () => (dispatch) => {
  dispatch(staffsLoading(true));

  return fetch(baseUrl + "staffs")
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error(
            "Error" + response.status + response.statusText
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        var errmess = new Error(error.message);
        throw errmess;
      }
    )
    .then((response) => response.json())
    .then((response) => dispatch(addStaffs(response)))
    .catch((error) => dispatch(StaffsFailed(error.message)));
}


// gọi API danh sách lương nhân viên
export const fetchSalary = () => (dispatch) => {
  return fetch(baseUrl + 'staffsSalary')
    .then(response => response.json())
    .then(salary => dispatch(addSalary(salary)));
};


// gọi API danh sách phong ban 
export const fetchDepartments = () => (dispatch) => {
  return fetch(baseUrl + 'departments')
    .then(response => response.json())
    .then(departments => dispatch(addDepartments(departments)));
};


// tạo mới nhân viên 
export const postStaff = (newStaff) => (dispatch) => {
  dispatch(staffsLoading(true));
  return fetch(baseUrl + 'staffs', {
    method: "POST",
    body: JSON.stringify(newStaff),
    headers: {
      "Content-type": "application/json"
    },

  })
    .then(response => {
      if (response.ok) {
        return response;
      } else {
        var error = new Error('Error ' + response.status + ': ' + response.statusText);
        error.response = response;
        throw error;
      }
    },
      error => {
        throw error;
      })
    .then(response => response.json())
    .then((response) => dispatch(addStaffs(response)))
    .catch((error) => dispatch(StaffsFailed(error.message))); 
};

// delete Staff
export const deleteStaff = (id) => (dispatch) => {
  fetch(baseUrl + "staffs/" + id, {
    method: "DELETE",
    header: { "Content-Type": "application/json" },
  })
    .then((res) => res.json())
    .then((list) => {
      dispatch(addStaffs(list));
    });
};

// sửa nhân viên
export const patchStaff= (Staff) => (dispatch) => {
  return fetch(baseUrl + "staffs", {
    method: "PATCH",
    body: JSON.stringify(Staff),
    headers: { "Content-Type": "application/json" },
    credentials: "same-origin", //gửi thông tin đăng nhập nếu URL yêu cầu có cùng nguồn gốc với tập lệnh gọi
  })
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error(
            "Error " + response.status + " :" + response.statusText
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        var errmess = new Error(error.message);
        throw errmess;
      }
    )
    .then((response) => response.json())
    .then((response) => dispatch(addStaffs(response)))
};



export const staffsLoading = () => ({
  type: ActionTypes.STAFFS_LOADING
});

export const StaffsFailed = (errmess) => ({
  type: ActionTypes.STAFFS_FAILED,
  payload: errmess
});

export const addStaffs = (staffs) => ({
  type: ActionTypes.ADD_STAFFS,
  payload: {
    staffs,
  },

});

export const departmentsFailed = (errmess) => ({
  type: ActionTypes.DEPARTMENTS_FAILED,
  payload: errmess
});

export const addDepartments = (departments) => ({
  type: ActionTypes.ADD_DEPARTMENTS,
  payload: departments
});

export const SalaryFailed = (errmess) => ({
  type: ActionTypes.SALARY_FAILED,
  payload: errmess
});

export const addSalary = (salary) => ({
  type: ActionTypes.ADD_SALARY,
  payload: salary
});



