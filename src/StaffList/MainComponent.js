import React, { Component } from 'react';
import List from './StaffListComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import StaffDetail from './StaffsDetai';
import Department from './DepartmentStaffs';
import RenderStaffsSalary from  './StaffsSalary';
import { STAFFS, DEPARTMENTS } from '../shared/staffs';
import { Switch, Route, Redirect} from 'react-router-dom';
import '../App.css';

class Main extends Component {

  constructor(props) {
    super(props);
    this.state = {
      staffs: STAFFS,
      departments: DEPARTMENTS
    };
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
              <Route exact path='/menu' component={({ match }) => <List staffs={this.state.staffs} match={match} />} />
              <Route path='/menu/:dishId' component={DishWithId} />
              <Route path='/department' component={() => <Department departments={this.state.departments} />} />
              <Route path='/salary' component={() => <RenderStaffsSalary listsalary={this.state.staffs}  />} />
              <Redirect to="/menu" />
          </Switch>
        <Footer />
        
      </div>
    );
    
  }
}

export default Main;