import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
        import { Button, Modal,ModalHeader, ModalBody,Row, Col, Label } from "reactstrap"
import { Control, LocalForm, Errors } from 'react-redux-form';

// thiết lập validate cho modal 
const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);
const isNumber = (val) => !isNaN(Number(val));
const numRange = (val) => val > 0 && val < 4;

// khởi tạo hàm Modal
function AddForm(props) {
   //tạo dữ liệu bật tặt modal
    const [modal, setModal] = React.useState(false);

    const toggle = () => setModal(!modal);
    // lấy và lưu dữ liệu tử ô input 
    const handleSubmit = (values) => {
        const newStaff = {
            id: props.staffList.length + 1,
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
        props.postStaff(newStaff);

    }
    // thiết lập, khởi tạo modal
    return (
        <div style={{
            display: 'block', width: 700,
        }}>
            <Button color="success"
                onClick={toggle}> <i class="fa fa-solid fa-plus"></i> Add New Staff</Button>
            <Modal isOpen={modal} toggle={toggle}>

                <ModalHeader
                    toggle={toggle}>Thêm Nhân Viên</ModalHeader>
                <ModalBody>
                    <LocalForm onSubmit={(values) => handleSubmit(values)}>

                        <Row className="form-group mg-6">
                            <Label htmlFor="name" md={4}>Tên</Label>
                            <Col md={8}>
                                <Control.text model=".name" id="firstname" name=""
                                    className="form-control"
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
                                    className="form-control" >
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

                        <Row className="form-group">
                            <Col md={{ size: 10, offset: 2 }}>
                                <Button type="submit" color="primary">
                                    Thêm Mới
                                </Button>
                            </Col>
                        </Row>
                    </LocalForm>
                </ModalBody>

            </Modal>
        </div >
    );
}

export default AddForm;