import React from "react";
import { Card, CardTitle, CardGroup, Breadcrumb, BreadcrumbItem, CardText, CardBody } from 'reactstrap';
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
    const StaffsSalary = props.listsalary.map((salary) => {
        return (
            <CardGroup className="col-12 col-md-6 col-lg-4 ">
                <Card className="m-1" key={salary.id}>
                    <CardTitle className= "t-c"><h4>{salary.name}</h4></CardTitle>
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