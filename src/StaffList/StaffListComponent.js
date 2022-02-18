import React, { useState } from 'react';
import { Card, CardImg, CardTitle, CardGroup, Row, Col, Button } from 'reactstrap';
import { Link } from 'react-router-dom'
import { Control, LocalForm } from 'react-redux-form';
import { version } from 'react-dom';


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
    const [searchStaff, setSearchStaff] = useState("");

    
    const SearchStaffs = () => {
        const handleSearch = (values) => {
           setSearchStaff(values.searchtext)
        }
       
        return (
            <LocalForm onSubmit={(values) => handleSearch(values)}>
                <Row className="form-group">
                    <Col >
                        <Control.text model=".searchtext" id="searchtext" name="searchtext"
                            placeholder="Tìm kiếm..."
                            className="form-control"
                        />
                    </Col>
                    <Col md={2}>
                        <Button style={{ float: "right" }} type="submit" className='dark'>
                            Search
                        </Button>
                    </Col>
                </Row>
            </LocalForm>
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