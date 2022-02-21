import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    Button, Modal, ModalFooter,
    ModalHeader, ModalBody, Breadcrumb, BreadcrumbItem,
    Row, Col, Label
} from "reactstrap"
import { Control, LocalForm, Errors } from 'react-redux-form';
import { DEPARTMENTS } from "../shared/staffs";


const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);
const isNumber = (val) => !isNaN(Number(val));
const validEmail = (val) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val);


function AddForm() {

    const [modal, setModal] = React.useState(false);
    const [modal, setModal] = useState();
    const toggle = () => setModal(!modal);

    const handleSubmit = (values) => {
        // const newStaff = {...values}

        const department = DEPARTMENTS.find(
            (department) => department.id === state.department
            );

        const newStaff = {
            name: values.name,
            doB: values.doB,
            salaryScale: values.salaryScale,
            startDate: values.startDate,
            department: department
            annualLeave: values.annualLeave,
            overTime: values.overTime,
            salary: values.salary,
            image: '/assets/images/alberto.png',

        }
        console.log(newStaff)
        alert(JSON.stringify(newStaff))
    }

    return (
        <div style={{
            display: 'block', width: 700,
        }}>
            <Button color="danger"
                onClick={toggle}>Add New Staff</Button>
            <Modal isOpen={modal} toggle={toggle}>

                <ModalHeader
                    toggle={toggle}>Thêm Nhân Viên</ModalHeader>
                <ModalBody>
                    <LocalForm onSubmit={(values) => handleSubmit(values)}>
                        <Row className="form-group">
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
                        <Row className="form-group">
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
                        <Row className="form-group">
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
                        <Row className="form-group">
                            <Label htmlFor="lastname" md={4}>Phòng Ban</Label>
                            <Col md={8}>
                                <Control.select model=".department" name="contactType"
                                    className="form-control" >
                                    <option>Sale</option>
                                    <option>HR</option>
                                    <option>Marketing</option>
                                    <option>IT</option>
                                    <option>Finance</option>
                                </Control.select>

                            </Col>
                        </Row>
                        <Row className="form-group">
                            <Label htmlFor="telnum" md={4}>Hệ số lương</Label>
                            <Col md={8}>
                                <Control.text model=".salaryScale" id="telnum" name="telnum"
                                    className="form-control"
                                    validators={{
                                        isNumber
                                    }}
                                />
                                <Errors
                                    className="text-danger"
                                    model=".salaryScale"
                                    show="touched"
                                    messages={{
                                        isNumber: 'Kí tự phải là số',
                                    }}
                                />

                            </Col>
                        </Row>
                        <Row className="form-group">
                            <Label htmlFor="annualLeave" md={4}>Số ngày nghỉ còn lại</Label>
                            <Col md={8}>
                                <Control.text model=".annualLeave" id="firstname" name="firstname"
                                    className="form-control"
                                    validators={{
                                        isNumber
                                    }}
                                />
                                <Errors
                                    className="text-danger"
                                    model=".salaryScale"
                                    show="touched"
                                    messages={{
                                        isNumber: 'Kí tự phải là số',
                                    }}
                                />
                            </Col>
                        </Row>
                        <Row className="form-group">
                            <Label htmlFor="overTime" md={4}>Số ngày đã làm thêm</Label>
                            <Col md={8}>
                                <Control.text model=".overTime" id="firstname" name="firstname"
                                    className="form-control"
                                    validators={{
                                        isNumber
                                    }}
                                />
                                <Errors
                                    className="text-danger"
                                    model=".salaryScale"
                                    show="touched"
                                    messages={{
                                        isNumber: 'Kí tự phải là số',
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