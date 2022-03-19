import React, { useState } from 'react';
import { Card, CardImg, CardTitle, CardGroup, Row, Col, Button, } from 'reactstrap';
import { Link,useHistory } from 'react-router-dom'
import { Control, LocalForm } from 'react-redux-form';
import AddForm from './AddForm';
import { FadeTransform } from 'react-animation-components';


// hàm render ảnh nhân viên
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
// tạo danh sách nhân viên
const ListStaff = (props) => {
    const [ListStaff, setListStaff] = useState(props.staffs);

//hàm nhân và chuyền dữ liệu nhân viên cần thêm mới 
    const newStaff = (staff) => {
        props.postStaff(staff);

    }

    // hàm search nhân viên
    const SearchStaffs = () => {

// hàm sử lí thông tin tử  ô input
        const handleSearch = (values) => {
            if( values.Staffs == null){
             alert("Nhập dữ liệu")
            }
            else if(values.Staffs){
            const filterStaff = props.staffs.filter((staff) => {
                if(staff.name){
                    return  staff.name.toLowerCase().indexOf(values.Staffs.toLowerCase()) !== -1;
                }
            });
            setListStaff(filterStaff);
           }
           else{
            const listStaffs = {...props.staffs};
               setListStaff(listStaffs)
           }
        }

  // render "SearchStaffs"       
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
  
 // render ListStaff
    const staffs = ListStaff.map((staff) => {
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