import React, { Component } from "react";
import {
  Navbar,
  Card,
  CardTitle,
  CardGroup,
  CardBody,
  Nav,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  UncontrolledDropdown,
} from "reactstrap";
import dateFormat from "dateformat";

class List extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedStaff: null,
      columns: 4,
    };
  }

  onStaff(staff) {
    this.setState({ selectedStaff: staff });
  }


  NavBarDrop() {
    return (
      <Nav>
        <UncontrolledDropdown nav inNavbar>
          <DropdownToggle caret color="muted">
            Bố cục
          </DropdownToggle>
          <DropdownMenu >
            <DropdownItem
              onClick={() => {
                this.setState({ columns: 12 });
              }}
            >
              1 cột
            </DropdownItem>
            <DropdownItem
              onClick={() => {
                this.setState({ columns: 6 });
              }}
            >
              2 cột
            </DropdownItem>
            <DropdownItem
              onClick={() => {
                this.setState({ columns: 4 });

              }}
            >
              3 cột
            </DropdownItem>
            <DropdownItem
              onClick={() => {
                this.setState({ columns: 3 });
              }}
            >
              4 cột
            </DropdownItem>
            <DropdownItem divider />
            <DropdownItem
              onClick={() => {
                this.setState({ columns: 4 });
              }}
            >
              Reset
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </Nav>

    )
  }

  renderDish(dish) {
    if (dish != null)
      return (
        <Card>
          <CardBody>
            <h4>Họ Và Tên: {dish.name}</h4>
            <p>Ngày sinh: {dateFormat(dish.doB, "dd/mm/yyyy")}</p>
            <p>Ngày vào công ty: {dateFormat(dish.startDate, "dd/mm/yyyy")} </p>
            <p>Phòng ban: {dish.department.name}</p>
            <p>Số ngày nghỉ còn lại: {dish.annualLeave}</p>
            <p>Số ngày làm thêm: {dish.overTime}</p>
          </CardBody>
        </Card>
      );
    else
      return (
        <div>
          <p>Bấm vào để xem thông tin</p>
        </div>
      );
  }

  render() {
    const staffs = this.props.staffs.map((staff) => {
      return (
        <CardGroup className={`col-12 col-md-6 col-lg-${this.state.columns}`}>
          <div className="m-1 md">
            <Card key={staff.id} onClick={() => this.onStaff(staff)}>
              <CardTitle>{staff.name}</CardTitle>
            </Card>
          </div>
        </CardGroup>
      );
    });

    return (
      <div className="container">
        <div className="row pt">{staffs}</div>
        <div className="row">
          <div className="col-6 col-md-5 col-sm-6">
            {this.renderDish(this.state.selectedStaff)}
          </div>
        </div>
        <div>
          {this.NavBarDrop()}
        </div>
      </div>
    );
  }
}

export default List;