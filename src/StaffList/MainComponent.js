import React, { Component } from 'react';
import List from './StaffListComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import StaffDetail from './StaffsDetai';
import Department from './DepartmentStaffs';
import RenderStaffsSalary from './StaffsSalary';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import '../App.css';



const mapStateToProps = state => {
  return {
    staffs: state.staffs,
    departments: state.departments
  }
}

const mapDispatchToProps =(dispatch) => {
  return{
    addNewStaffRedux: (newStaff) => dispatch ({ type: "ADD_STAFF" , payload : newStaff})
  }
}

class Main extends Component {

  constructor(props) {
    super(props);
   
  }
  


  addNewStaff= (newStaff) => {
      this.props.addNewStaffRedux(newStaff)

}
  
  render() {
    const DishWithId = ({ match }) => {
      return (
        <StaffDetail staff={this.props.staffs.filter((dish) => dish.id === parseInt(match.params.dishId, 10))[0]}
        />
      );
    };

    return (
      <div>
        <Header />
        <Switch>
          <Route exact path='/menu' component={() => <List staffs={this.props.staffs}  addNewStaff = {this.addNewStaff}/>} />
          <Route path='/menu/:dishId' component={DishWithId} />
          <Route path='/department' component={() => <Department departments={this.props.department} />} />
          <Route path='/salary' component={() => <RenderStaffsSalary listsalary={this.props.staffs} />} />
          <Redirect to="/menu" />
        </Switch>
        <Footer />

      </div>
    );

  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));