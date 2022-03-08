import React, { useState } from 'react';
import { Card, CardImg, CardTitle, CardGroup, Row, Col, Button, Label, FormGroup, Form, Input } from 'reactstrap';
import { Link } from 'react-router-dom'
import AddForm from './AddForm';




function RenderMenuItem({ staff }) {
    return (
        <Card >
            <Link to={`/menu/${staff.id}`} >
                <CardImg width="100%" src={staff.image} alt={staff.name} />

            </Link>
        </Card>
    );
}
const List = (props) => {
    const [ListStaff] = useState(props.staffs);
    const [searchValues, setsearchValues] = useState("");
    const [searchStaff, setSearchStaff] = useState("");


    const addNewStaff = (staff) => {
        props.addNewStaff(staff);
    };

    const SearchStaffs = () => {

        const handleSubmit = (event) => {
            setSearchStaff(searchValues)
        }

        return (
            <div >

                <Form onSubmit={handleSubmit} className="d2">
                    <FormGroup  >
                        <Col md={10}>
                            <Input
                                type="text"
                                id="name"
                                name="name"
                                placeholder="từ 5 - 30 kí tự"
                                value={searchValues}
                                onChange={(e) => setsearchValues(e.target.value)}
                            />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Button type="submit" color="primary" >
                            Tìm
                        </Button>
                    </FormGroup>
                </Form>

            </div>
        )

    }
    const filteredStaff = ListStaff.filter(staff => {
        return staff.name.toLowerCase().indexOf(searchStaff.toLowerCase()) !== -1;
    })

    const staffs = filteredStaff.map((staff) => {
        return (
            <CardGroup className="col-6 col-md-4 col-lg-2"  >
                <Card className="m-1" key={staff.id}>
                    <RenderMenuItem staff={staff} />
                    <CardTitle className="t-c" >{staff.name}</CardTitle>

                </Card >
            </CardGroup>
        );
    });

    return (
        <div className="container">
            <div className="row">
                <div className="d1 " >
                    <h3>Nhân Viên</h3>
                    <AddForm staffList={ListStaff} onStaff={addNewStaff} />
                    <SearchStaffs />
                </div>
            </div>
            <div className="row">
                {staffs}
            </div>
        </div>
    );

}

export default List;