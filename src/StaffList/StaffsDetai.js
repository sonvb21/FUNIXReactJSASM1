import React,{useState} from "react";
import { Link, useHistory } from "react-router-dom";
import { Breadcrumb, BreadcrumbItem, Card, CardImg, List, CardBody, Button, Modal, ModalHeader, ModalBody, Row, Col, Label } from "reactstrap";
import { Control, LocalForm, Errors } from 'react-redux-form';
import dateFormat from "dateformat";
import { FadeTransform, Fade, Stagger } from 'react-animation-components';
import { Loading } from './LoadingComponent';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);
const isNumber = (val) => !isNaN(Number(val));
const numRange = (val) => val > 0 && val < 4;


function AddForm({ staff, deleteStaff, departments, patchStaff }) {
  //tạo dữ liệu bật tặt modal
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  // lấy và lưu dữ liệu tử ô input 
  const handleSubmit = (values) => {
    const newStaff = {
      id: staff.id,
      name: values.name,
      doB: values.doB,
      salaryScale: values.salaryScale,
      startDate: values.startDate,
      departmentId: values.departmentId,
      annualLeave: values.annualLeave,
      overTime: values.overTime,
      salary: values.salary,
      image: '/assets/images/alberto.png',

    }
    // chuyền data về componment cha
    patchStaff(newStaff);
  }

  // hàm xóa lấy id từ đối tượng và chuyển về componenr cha & back lại trang chủ
  let history = useHistory();
  const handleDelete = (idStaff) => {
    deleteStaff(idStaff);
   history.push('/menu')
  }
  
  // thiết lập, khởi tạo modal
  return (
    <div style={{
      display: 'block', width: 700,
    }}>
  {/* // nút sửa   */}
      <Button color="success" className="mr-6"
        onClick={toggle}> <i class="fa fa-edit"></i> Sửa</Button>
  {/* // nút xóa   */}
      <Button color="danger" className="mr-6"
        onClick={() => handleDelete(staff.id)}> <i class="fa fa-solid fa-trash"></i> Xóa</Button>

  {/* //modal */}
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader
          toggle={toggle}>Sửa Thông Tin Nhân Viên</ModalHeader>
        <ModalBody>
          <LocalForm onSubmit={(values) => handleSubmit(values)}>

            <Row className="form-group mg-6">
              <Label htmlFor="name" md={4}>Tên</Label>
              <Col md={8}>
                <Control.text model=".name" id="firstname" name=""
                  className="form-control"
                  defaultValue ={staff.name}
                  validators={{
                    required, minLength: minLength(3), maxLength: maxLength(30)
                  }}
                />
                <Errors
                  className="text-danger"
                  model=".name"
                  show="touched"
                  messages={{
                    required: 'Yêu cầu nhập',
                    minLength: 'Yêu cầu nhiều hơn 2 kí tự',
                    maxLength: 'Yêu cầu ít hơn 30 kí tự'
                  }}
                />
              </Col>
            </Row>

            <Row className="form-group mg-6">
              <Label htmlFor="lastname" md={4}>Ngày sinh</Label>
              <Col md={8}>
                <Control.text model=".doB" id="firstname" name="firstname"
                  className="form-control"
                  defaultValue={dateFormat(staff.doB, "yyyy-mm-dd")}
                  type="date"
                  validators={{
                    required
                  }}
                />
                <Errors
                  className="text-danger"
                  model=".doB"
                  show="touched"
                  messages={{
                    required: 'Yêu cầu nhập',
                  }}
                />
              </Col>
            </Row>

            <Row className="form-group mg-6">
              <Label htmlFor="lastname" md={4}>Ngày vào công ty</Label>
              <Col md={8}>
                <Control.text model=".startDate" id="firstname" name="firstname"
                  className="form-control"
                  defaultValue={dateFormat(staff.startDate, "yyyy-mm-dd")}
                  type="date"
                  validators={{
                    required
                  }}
                />
                <Errors
                  className="text-danger"
                  model=".startDate"
                  show="touched"
                  messages={{
                    required: 'Yêu cầu nhập',
                  }}
                />
              </Col>
            </Row>

            <Row className="form-group mg-6">
              <Label htmlFor="departmentId" md={4}>Phòng Ban</Label>
              <Col md={8}>
                <Control.select model=".departmentId" name="departmentId"
                  className="form-control"
                  defaultValue={staff.departmentId}
                >
                  <option value="Dept01" >Sale</option>
                  <option value="Dept02" >HR</option>
                  <option value="Dept03" >Marketing</option>
                  <option value="Dept04" >IT</option>
                  <option value="Dept05" >Finance</option>
                </Control.select>

              </Col>
            </Row>

            <Row className="form-group mg-6">
              <Label htmlFor="salaryScale" md={4}>Hệ số lương</Label>
              <Col md={8}>
                <Control.text model=".salaryScale" id="salaryScale" name="salaryScale"
                  className="form-control"
                  defaultValue={staff.salaryScale}
                  
                  validators={{
                    isNumber,
                    numRange
                  }}
                />
                <Errors
                  className="text-danger"
                  model=".salaryScale"
                  show="touched"
                  messages={{
                    isNumber: "Yêu cầu bắt buộc phải là số",
                    numRange: "Yêu cầu nhập số từ 1.0 - 3.0",
                  }}
                />

              </Col>
            </Row>

            <Row className="form-group mg-6">
              <Label htmlFor="annualLeave" md={4}>Số ngày nghỉ còn lại</Label>
              <Col md={8}>
                <Control.text model=".annualLeave" id="annualLeave" name=".annualLeave"
                  className="form-control"
                  defaultValue={staff.annualLeave}
                  validators={{
                    isNumber
                  }}
                />
                <Errors
                  className="text-danger"
                  model=".annualLeave"
                  show="touched"
                  messages={{
                    isNumber: "Yêu cầu bắt buộc phải là số",
                  }}
                />
              </Col>
            </Row>

            <Row className="form-group mg-6">
              <Label htmlFor="overTime" md={4}>Số ngày đã làm thêm</Label>
              <Col md={8}>
                <Control.text model=".overTime" id="overTime" name="overTime"
                  className="form-control"
                  defaultValue={staff.overTime}
                  validators={{
                    isNumber
                  }}
                />
                <Errors
                  className="text-danger"
                  model=".overTime"
                  show="touched"
                  messages={{
                    isNumber: "Yêu cầu bắt buộc phải là số",
                  }}
                />
              </Col>
            </Row>

            <Row className="form-group mg-6">
              <Label htmlFor="salary" md={4}>Lương</Label>
              <Col md={8}>
                <Control.text model=".salary" id="salary" name="salary"
                  className="form-control"
                  defaultValue={staff.salary}
                  validators={{
                    isNumber
                  }}
                />
                <Errors
                  className="text-danger"
                  model=".salary"
                  show="touched"
                  messages={{
                    isNumber: "Yêu cầu bắt buộc phải là số",
                  }}
                />
              </Col>
            </Row>

            <Row className="form-group">
              <Col md={{ size: 10, offset: 2 }}>
                <Button type="submit" color="primary">
                  Lưu
                </Button>
              </Col>
            </Row>
          </LocalForm>
        </ModalBody>

      </Modal>
    </div >
  );
}

//hàm render tên và đường đận tới detai
const RenderBreadcrumb = ({ staff }) => {
  return (
    <Breadcrumb tag="nav" listTag="div">
      <BreadcrumbItem>
        <Link to="/menu">Nhân Viên</Link>
      </BreadcrumbItem>
      <BreadcrumbItem>{staff.name}</BreadcrumbItem>
    </Breadcrumb>
  );
};

// Hàm render ảnh 
const RenderImage = ({ staff ,errMess , isLoading }) => {
  if (isLoading) {
    return(
        <div className="container">
            <div className="row">            
                <Loading />
            </div>
        </div>
    );
}
else if (errMess) {
    return(
        <div className="container">
            <div className="row">            
                <h4>{errMess}</h4>
            </div>
        </div>
    );
}
else if (staff != null) 
  return (
    <FadeTransform
    in
    transformProps={{
        exitTransform: 'scale(0.5) translateY(-50%)'
    }}>
    <Card>
      <CardImg top with="100%" src={staff.image} alt={staff.name} />
    </Card>
    </FadeTransform>
  );
};

//Hàm render thông tin chi tiết nhân viên
const RenderDetail = ({ staff, departments }) => {
  return (
    <Fade in>
    <List type="unstyled" style={{ textAlign: "left" }}>
      <CardBody>
        <p><h3>Họ và tên: {staff.name}</h3></p>
        <p>Ngày sinh: {dateFormat(staff.doB, "dd/mm/yyyy")}</p>
        <p>Ngày vào công ty: {dateFormat(staff.startDate, "dd/mm/yyyy")}</p>
        {departments.map((department) => {
          if (department.id === staff.departmentId) {
            return (
              
              <p>Phòng ban: {department.name}</p>
            )
          }
        })}
        <p>Số ngày nghỉ còn lại: {staff.annualLeave}</p>
        <p>Số ngày đã làm thêm: {staff.overTime}</p>
      </CardBody>
    </List>
    </Fade>

  );
};

// hàm render tổng StaffDetail
function StaffDetail({ staff, departments, deleteStaff, patchStaff, isLoading, errMess  }) {

  // nhận và chuyền id đối tượng muốn xóa về compomner chính
  const deleteStaffId = (id) => {
    deleteStaff(id)
  }


  return (
    <div className="container">

      {staff ? <><div className="row">
        <div className="col-12">
          <RenderBreadcrumb staff={staff} />
        </div>
      </div>
        <div className="row">
          <div className="col-12 col-md-4 col-xl-3">
            <RenderImage staff={staff} isLoading={isLoading} errMess = {errMess} />
          </div>
          <div className="col-12 col-md-8 col-xl-9">
            <RenderDetail staff={staff} departments={departments} />
            <AddForm staff={staff} deleteStaff={deleteStaffId} departments={departments} patchStaff={patchStaff}/>

          </div>
        </div>
      </> : <h2>data notfound</h2>}
    </div>
  );
}

export default StaffDetail;