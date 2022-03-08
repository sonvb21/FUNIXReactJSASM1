import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { DEPARTMENTS } from "../shared/staffs";
import {
    Button, Modal,  ModalHeader, ModalBody, Row, Col, Label,
    Form, FormGroup, Input, FormFeedback

} from "reactstrap"


class AddForm extends Component {

// thiêt lập dữ liệu khởi tạo
    constructor(props) {
        super(props);

        this.state = {
            modal: false,
            id: "",
            name: "",
            doB: "",
            salaryScale: "",
            startDate: "",
            department: "",
            annualLeave: "",
            overTime: "",
            salary: "",
            image: "/assets/images/alberto.png",
            touched: {

                name: false,
                salaryScale: false,
                annualLeave: false,
                overTime: false,

            }
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
        this.toggle = this.toggle.bind(this);

    }
    // set chế độ bật tăt modal
    toggle() {
        this.setState({
            modal: !this.state.modal,
        });
    }


    handleBlur = (field) => (e) => {
        this.setState({
            touched: { ...this.state.touched, [field]: true },
        });
    };
    // set lại giá tri từ dữ liều ô input
    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }
// khởi tạo và thiết lập kiểm tra dữ liệu validate 
    validate(name, salaryScale, annualLeave, overTime) {
        const errors = {
            name: "",
            salaryScale: "",
            annualLeave: "",
            overTime: "",
        };

        if (this.state.touched.name && name.length < 3)
            errors.name = "Yêu cầu nhập nhiều hơn 3 ký tự";
        else if (this.state.touched.name && name.length > 30)
            errors.name = "Yêu cầu nhập ít hơn 30 ký tự";


        if (this.state.touched.annualLeave && annualLeave.length > 3)
            errors.annualLeave = "Số ngày nghỉ không nhiều hơn 3 kí tự";
        else if (
            this.state.touched.annualLeave &&
            annualLeave.split("").filter((x) => x === ".").length !== 1
        )
            errors.annualLeave =
                "Số ngày nghỉ của bạn phải có dấu chấm ở giữa (ví dụ 1.5)";


        if (
            (this.state.touched.salaryScale && salaryScale.length > 3.0) ||
            salaryScale < 1.0
        )
            errors.salaryScale = "Hệ số lương phải từ 1.0 đến 3.0";
        else if (
            this.state.touched.salaryScale &&
            salaryScale.split("").filter((x) => x === ".").length !== 1
        )
            errors.salaryScale = "Hệ số lương phải có dấu chấm ở giữa (ví dụ 1.5)";

        // validate overTime
        if (this.state.touched.overTime && overTime.length > 3)
            errors.overTime = "Số ngày làm thêm không quá 3 kí tự";

        return errors;
    }

    //lưu giá tri từ ô input và khởi tạo giá tri mới 
    handleSubmit(event) {
        event.preventDefault();

        const department = DEPARTMENTS.find(
            (department) => department.id === this.state.department
        );
        const newStaff = {
            id: this.props.staffList.length,
            name: this.state.name,
            doB: this.state.doB,
            department: department,
            salaryScale: this.state.salaryScale,
            startDate: this.state.startDate,
            annualLeave: this.state.annualLeave,
            overTime: this.state.overTime,
            image: "/assets/images/alberto.png",

        };

       // kiểm tra giá trị khi nhập dữ liệu
        if (newStaff.name === "") {
            alert("Vui lòng nhập đúng dữ liệu");
          } else {
            this.props.onStaff(newStaff);
          
        }
    }

    // khởi tạo modal
    render() {
        const errors = this.validate(
            this.state.name,
            this.state.salaryScale,
            this.state.annualLeave,
            this.state.overTime
        );
        return (
            <div style={{
                display: 'block', width: 800,
            }}>
                <Button color="danger"
                    onClick={this.toggle}>Add New Staff</Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader
                        toggle={this.toggle}>Thêm Nhân Viên Mới</ModalHeader>
                    <ModalBody>
                        <div className="row row-content">
                            <div >
                                <Form onSubmit={this.handleSubmit}>

                                    <FormGroup>
                                        <Row>
                                            <Label htmlFor="name" md={4}> Họ tên</Label>
                                            <Col md={8}>
                                                <Input
                                                    type="text"
                                                    id="name"
                                                    name="name"
                                                    placeholder="từ 5 - 30 kí tự"
                                                    value={this.state.name}
                                                    onChange={this.handleInputChange}
                                                    onBlur={this.handleBlur("name")}
                                                    valid={errors.name === ""}
                                                    invalid={errors.name !== ""}
                                                />
                                                <FormFeedback>{errors.name}</FormFeedback>
                                            </Col>
                                        </Row>
                                    </FormGroup>

                                    <FormGroup row>
                                        <Label htmlFor="doB" md={4}>Ngày Sinh</Label>
                                        <Col md={8}>
                                            <Input type="date" id="doB" name="doB"
                                                value={this.state.doB}
                                                onBlur={this.handleBlur('doB')}
                                                onChange={this.handleInputChange}
                                            />
                                        </Col>
                                    </FormGroup>

                                    <FormGroup row>
                                        <Label htmlFor="startDate" md={4}>Ngày vào công ty</Label>
                                        <Col md={8}>
                                            <Input type="date" id="startDate" name="startDate"
                                                placeholder="Tel. Number"
                                                value={this.state.startDate}
                                                onBlur={this.handleBlur('startDate')}
                                                onChange={this.handleInputChange}
                                            />
                                        </Col>
                                    </FormGroup>

                                    <FormGroup row>
                                        <Label htmlFor="department" md={4}>Phòng Ban</Label>
                                        <Col md={8}>
                                            <Input type="select" id="department" name="department"
                                                value={this.state.department}
                                                onChange={this.handleInputChange} >
                                                <option value="select">Chọn Phòng Ban</option>
                                                <option value="Dept01">Sale</option>
                                                <option value="Dept02">HR</option>
                                                <option value="Dept03">Marketing</option>
                                                <option value="Dept04">IT</option>
                                                <option value="Dept05">Finance</option>
                                            </Input>
                                            <FormFeedback>{errors.email}</FormFeedback>
                                        </Col>
                                    </FormGroup>

                                    <FormGroup row>
                                        <Label htmlFor="salaryScale" md={4}>Hệ số lương</Label>
                                        <Col md={8}>
                                            <Input type="text" id="salaryScale" name="salaryScale"
                                                placeholder="First Name"
                                                value={this.state.salaryScale}
                                                valid={errors.salaryScale === ''}
                                                invalid={errors.salaryScale !== ''}
                                                onBlur={this.handleBlur('salaryScale')}
                                                onChange={this.handleInputChange}
                                            />
                                            <FormFeedback>{errors.salaryScale}</FormFeedback>
                                        </Col>
                                    </FormGroup>

                                    <FormGroup row>
                                        <Label htmlFor="annualLeave" md={4}>Số ngày nghỉ còn lại</Label>
                                        <Col md={8}>
                                            <Input type="text" id="annualLeave" name="annualLeave"
                                                placeholder="First Name"
                                                value={this.state.annualLeave}
                                                valid={errors.annualLeave === ''}
                                                invalid={errors.annualLeave !== ''}
                                                onBlur={this.handleBlur('annualLeave')}
                                                onChange={this.handleInputChange}
                                            />
                                            <FormFeedback>{errors.annualLeave}</FormFeedback>
                                        </Col>
                                    </FormGroup>

                                    <FormGroup row>
                                        <Label htmlFor="overTime" md={4}>Số ngày đã làm thêm</Label>
                                        <Col md={8}>
                                            <Input type="text" id="overTime" name="overTime"
                                                placeholder="First Name"
                                                value={this.state.overTime}
                                                valid={errors.overTime === ''}
                                                invalid={errors.overTime !== ''}
                                                onBlur={this.handleBlur('overTime')}
                                                onChange={this.handleInputChange}
                                            />
                                            <FormFeedback>{errors.overTime}</FormFeedback>
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Col md={{ size: 10, offset: 2 }}>
                                            <Button type="submit" color="primary" onClick={this.toggle}>
                                                Add New
                                            </Button>
                                        </Col>
                                    </FormGroup>
                                </Form>
                            </div>
                        </div>

                    </ModalBody>

                </Modal>
            </div >
        )
    }
   
}

export default AddForm;