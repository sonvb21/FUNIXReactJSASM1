import React, { Component } from 'react';
import List from './StaffListComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import StaffDetail from './StaffsDetai';
import Department from './DepartmentStaffs';
import RenderStaffsSalary from './StaffsSalary';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { STAFFS, DEPARTMENTS } from "../shared/staffs";
import '../App.css';



const mapStateToProps = state => {
  return {
    staffs: state.staffs,
    departments: state.departments
  }
}

class Main extends Component {

  constructor(props) {
    super(props);
    this.state = {
      staffs: STAFFS, //STAFFS lấy từ file js
      department: DEPARTMENTS,
    };
    console.log(this.state.staffs)
  }
  

  componentDidMount() {
   
     
  
  }

  addNewStaff= (newStaff) => {
    var localStaff = JSON.parse(localStorage.getItem("newStaff"))
    this.setState({ staffs: [...this.state.staffs, localStaff] });
    console.log(newStaff)


}
  
  render() {
    const DishWithId = ({ match }) => {
      return (
        <StaffDetail staff={this.state.staffs.filter((dish) => dish.id === parseInt(match.params.dishId, 10))[0]}
        />
      );
    };

    return (
      <div>
        <Header />
        <Switch>
          <Route exact path='/menu' component={() => <List staffs={this.state.staffs}  addNewStaff = {this.addNewStaff}/>} />
          <Route path='/menu/:dishId' component={DishWithId} />
          <Route path='/department' component={() => <Department departments={this.state.department} />} />
          <Route path='/salary' component={() => <RenderStaffsSalary listsalary={this.state.staffs} />} />
          <Redirect to="/menu" />
        </Switch>
        <Footer />

      </div>
    );

  }
}

export default withRouter(connect(mapStateToProps)(Main));