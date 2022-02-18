import React from "react";
import { Card, CardBody, CardTitle, CardGroup } from "reactstrap";

function Department(props) {
    const Departments = props.departments.map((department) => {
        return (
            <CardGroup className="col-12 col-md-6 col-lg-4 ">
                <Card key={department.id} className="m-2">
                    <CardTitle>
                        <h4>{department.name}</h4>
                        <p>Số lượng nhân viên: {department.numberOfStaff}</p>
                    </CardTitle>

                </Card>
            </CardGroup>
        );
    });
    return (
        <div className="container">
            <div className="row" >
                {Departments}
            </div>
        </div>
    )
}

export default Department