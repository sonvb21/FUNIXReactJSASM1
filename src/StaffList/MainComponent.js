import React, { Component } from 'react';
import ListStaff from './StaffListComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import RenderStaffsSalary from './StaffsSalary';
import StaffDetail from './StaffsDetai';
import Department from './DepartmentStaffs';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { fetchStaffs, fetchDepartments, fetchSalary, postStaff, deleteStaff,patchStaff } from '../redux/ActionCreators';
import { connect } from 'react-redux';
import '../App.css';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

// lấy giá trị từ store redux
const mapStateToProps = state => {
  console.log("state.salary.salary.....",state.salary.salary)
    return {
      staffs:  state.staffs.staffs,
      departments: state.departments.departments,
      salary : state.salary.salary,
      isLoading: state.staffs.isLoading,
      errMess: state.staffs.errMess
    }
}
// gửi giá trị về redux
const mapDispatchToProps = (dispatch) => {
  return {
    patchStaff: (Staff) => dispatch(patchStaff(Staff)),
    deleteStaff: (idStaff) => dispatch(deleteStaff(idStaff)),
    postStaff: (newStaff) => dispatch(postStaff(newStaff)),
    fetchDepartments: () => {dispatch(fetchDepartments()) },
    fetchSalary: () => {dispatch(fetchSalary()) },
    fetchStaffs: () => {dispatch(fetchStaffs()) },

  }
}

class Main extends Component {

  componentDidMount() {
    this.props.fetchStaffs();
    this.props.fetchDepartments();
    this.props.fetchSalary();
  }

  render() {
    const DishWithId = ({ match }) => {
      return (
        <StaffDetail staff={this.props.staffs.filter((dish) => dish.id === parseInt(match.params.dishId, 10))[0]}
        departments={this.props.departments}  staffs={this.props.staffs} postStaff={this.props.postStaff} 
        deleteStaff={this.props.deleteStaff} patchStaff={this.props.patchStaff} isLoading={this.props.isLoading} errMess={this.props.errMess}
        />
      );
    };

    return (
      <div>
        <Header />
        <TransitionGroup>
            <CSSTransition key={this.props.location.key} classNames="page" timeout={300}>
        <Switch>
          <Route exact path='/menu' component={() => <ListStaff staffs={this.props.staffs} postStaff={this.props.postStaff} />} />
          <Route path='/menu/:dishId' component={DishWithId} />
          <Route path='/department' component={() => <Department departments={this.props.departments} />} />
          <Route path='/salary' component={() => <RenderStaffsSalary listsalary={this.props.salary} />} />
          <Redirect to="/menu" />
        </Switch>
        </CSSTransition>
        </TransitionGroup>
        <Footer />

      </div>
    );

  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));