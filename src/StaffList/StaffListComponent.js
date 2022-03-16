import React, { useState } from 'react';
import { Card, CardImg, CardTitle, CardGroup, Row, Col, Button, } from 'reactstrap';
import { Link } from 'react-router-dom'
import { Control, LocalForm } from 'react-redux-form';
import AddForm from './AddForm';
import { FadeTransform } from 'react-animation-components';

/* Mục đích của function này là gì  
    Input kiểu giá trị là gì 
*/
function RenderMenuItem({ staff }) {
    return (
        <FadeTransform
                in
                transformProps={{
                    exitTransform: 'scale(0.5) translateY(-50%)'
                }}>
        <Card >
            <Link to={`/menu/${staff.id}`} >
                <CardImg width="100%" src={staff.image} alt={staff.name} />

            </Link>
        </Card>
        </FadeTransform>
    );
}

const ListStaff = (props) => {
    const [ListStaff,setListStaff] = useState(props.staffs);
    const [searchInput, setSearchInput] = useState("");
  
    const newStaff = (staff) => {
        props.postStaff(staff);

    }

    const SearchStaffs = () => {

        const handleSearch = (values) => {
            setSearchInput(values.Staffs)
        }

        return (
            <LocalForm onSubmit={(values) => handleSearch(values)}>
                <Row className="form-group">
                    <Col md={8}>
                        <Control.text model=".Staffs" id="a" name="searchtext"
                            placeholder="Tìm kiếm..."
                            className="form-control"
                        />
                    </Col>
                    <Col md={3}>
                        <Button color="primary" style={{ float: "right" }} type="submit" className='dark'>
                            Search
                        </Button>
                    </Col>
                </Row>
            </LocalForm>
        )
    }
    
    const filterStaff = ListStaff.filter((staff) => {
                console.log("staff.name",staff.name)
                return  staff.name.toLowerCase().indexOf(searchInput.toLowerCase()) !== -1;
            });

    const staffs =  filterStaff.map((staff) => {
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
                    <AddForm staffList={ListStaff} postStaff={newStaff} />
                    <SearchStaffs />
                </div>
            </div>
            <div className="row">
                {staffs}
            </div>
        </div>
       
    );


}

export default ListStaff;