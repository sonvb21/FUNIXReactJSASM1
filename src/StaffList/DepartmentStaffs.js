import React, { useState } from "react";
import { Card, CardTitle, CardGroup } from "reactstrap";
import { FadeTransform } from 'react-animation-components';

function Department(props) {
    const [departments, setDepartments] = useState(props.departments);

    const Departments = departments && departments.map((department) => {
        return (
            <CardGroup className="col-12 col-md-6 col-lg-4 ">
                <Card key={department.id} className="m-2">
                <FadeTransform
                in
                transformProps={{
                    exitTransform: 'scale(0.5) translateY(-50%)'
                }}>   
                    <CardTitle>
                        <h4>{department.name}</h4>
                        <p>Số lượng nhân viên: {department.numberOfStaff}</p>
                    </CardTitle>
                    </FadeTransform> 
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