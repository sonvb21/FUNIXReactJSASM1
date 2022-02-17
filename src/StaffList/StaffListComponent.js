import React, { Component } from 'react';
import { Card, CardTitle, CardGroup, CardBody } from 'reactstrap';
import dateFormat from 'dateformat';

class List extends Component {

  constructor(props) {
    super(props);

    this.state = {
      selectedStaff: null,
      columns :null
    }

  }
  onStaff(staff) {
    this.setState({ selectedStaff: staff });

  }
  
setColumns(newrow){
  this.setColumns({ columns :newrow })
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
        <div><p>Bấm vào để xem thông tin</p></div>
      );
  }


  render() {
    const cols = "col-12 col-md-6 col-lg-4 "
    let colwidth = this.state.columns;
    if (colwidth ) {
      cols =
        "col-12 col-md-" +
        (colwidth > 3 ? colwidth : 6) +
        " col-lg-" +
        colwidth;
    }

    const staffs = this.props.staffs.map((staff) => {
      return (
        <CardGroup className= {cols}>
          <div className="m-1 md">
            <Card key={staff.id}
              onClick={() => this.onStaff(  )}>
              <CardTitle>{staff.name}</CardTitle>
            </Card>
          </div>
        </CardGroup>

      );
    });
  

    

    return (
      <div className="container">
        <div className="row">
          {staffs}
        </div>
        <div className="row">
          <div className="col-6 col-md-5 col-sm-6">
            {this.renderDish(this.state.selectedStaff)}
          </div>
        </div>
        <button onClick={(newrow)=>this.setColumns(6)}>2 coot</button>
       
      </div>
    );
  };

};


export default List;