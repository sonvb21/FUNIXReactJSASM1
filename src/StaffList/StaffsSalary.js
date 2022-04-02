import React,{useState} from "react";
import { Card, CardTitle, CardGroup, Breadcrumb, BreadcrumbItem, CardText, CardBody,Button } from 'reactstrap';
import { Link } from 'react-router-dom'

const Salary = ({ salary }) => {
    const basicSalary = 3000000;
    const overTimeSalary = 200000;
    const salaryy = (salary.salaryScale * basicSalary) + (salary.overTime * overTimeSalary)

    return (
        salary = parseInt(salaryy)
        
    )
    
}
function RenderStaffsSalary(props) {
        const [staffList, setStaffList] = useState(props.listsalary);


        function salaryCalc(salaryScale, overTime) {
          const basicSalary = 3000000;
          const overTimeSalary = 200000;
          return salaryScale * basicSalary + overTime * overTimeSalary;
        }
      
    //    console.log(salaryCalc)
        function sortSalary(sorttype) {
          let sortedStaffList = [...staffList];
          let salaryA = 0;
          let salaryB = 0;
      
          if (sorttype === "inc") {
            sortedStaffList.sort(function (a, b) {
              salaryA = salaryCalc(  a.salaryScale, a.overTime);
              salaryB = salaryCalc(b.salaryScale, b.overTime);
              return salaryA - salaryB;
            });
           
          }
      
          if (sorttype === "dec") {
            sortedStaffList.sort(function (a, b) {
              salaryA = salaryCalc(a.salaryScale, a.overTime);
              salaryB = salaryCalc(b.salaryScale, b.overTime);
              return salaryB - salaryA;
            });
          }
      
          setStaffList(sortedStaffList);
        }

    const StaffsSalary =staffList.map((salary) => {
        return (
            <CardGroup className="col-12 col-md-6 col-lg-4 ">
                <Card className="m-1" key={salary.id}>
                    <CardTitle className="t-c"><h4>{salary.name}</h4></CardTitle>
                    <CardBody>
                        <p>Mã nhân viên: {salary.id}</p>
                        <p>Hệ số lương: {salary.salaryScale}</p>
                        <p>Số giờ làm thêm: {salary.overTime}</p>
                        <Card className="p-1">
                            <CardText className="salary">
                                Lương: <Salary salary={salary} />
                            </CardText>
                        </Card>
                    </CardBody>
                </Card >
            </CardGroup>

        )
    })

    return (
        <div className="container">
            <div id="sort" className="row">
                <div className="col-12">
                    <h5>Sắp xếp theo</h5>
                </div>
                <div className="col-12">
                    <Button onClick={() => sortSalary("inc")}>
                        <i  aria-hidden="true"></i> Lương thấp
                    </Button>

                    <Button onClick={() => sortSalary("dec")}>
                        <i aria-hidden="true"></i> Lương cao
                    </Button>
                </div>
            </div>
            <div className="row">
                <Breadcrumb tag="nav" listTag="div">
                    <BreadcrumbItem>
                        <Link to="/menu">Nhân Viên</Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem>Bảng Lương</BreadcrumbItem>
                </Breadcrumb>
            </div>
            <div className="row">
                {StaffsSalary}
            </div>
        </div>
    );
}
export default RenderStaffsSalary