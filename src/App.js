import React from 'react';
import { Navbar, NavbarBrand } from 'reactstrap';
import { STAFFS } from './shared/staffs';
import List from './StaffList/StaffListComponent';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      staffs: STAFFS,
      setrow: null
      
    };
    
  };

  render() {
    return (
      <div>
        <Navbar dark color="primary">
          <div className="container">
            <NavbarBrand href="/">Ứng dụng quản lý nhân sự v1.0</NavbarBrand>
          </div>
        </Navbar>
        <List staffs={this.state.staffs}/>
      </div>

    );
  }
}

export default App;
