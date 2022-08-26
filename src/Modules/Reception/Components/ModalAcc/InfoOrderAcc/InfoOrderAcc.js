import React from "react";
import { FormGroup, Form, Label, Col, Row, Table, Input } from 'reactstrap'
import './InfoOrderAcc.scss'
function InfoOrder(props) {
    const {infoUser} = props 
    let time = new Date().toLocaleTimeString("en-US", { hour12: false });
    let today = new Date().toLocaleDateString("en-GB");
    const [Ctime, setCtime] = React.useState(time);
    const [date, setDate] = React.useState(today);
    const updateTime = () => {
      time = new Date().toLocaleTimeString("en-US", { hour12: false });
      setCtime(time);
    };
    return (
        <>
            <Form className="Form">
            <Row className="row-3">
                    <Col className="col-3">
                        <span className="text-success">
                            <i className="fa fa-list"></i>
                            Thông tin đơn hàng
                        </span>
                    </Col>
                </Row>
                <Table  className="table-order"                >
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>Tên dịch vụ</th>
                            <th>Đơn giá</th>
                            <th>Số lượng</th>
                        </tr>
                    </thead>

                </Table>
                <Row className="row">
                    <Col md={4}>
                        <FormGroup>
                            <Label >
                                Giá gốc
                            </Label>

                        </FormGroup>
                    </Col>
                    <Col md={6}>
                        <FormGroup>
                            <Label >
                            {infoUser.user_cost}
                            </Label>

                        </FormGroup>
                    </Col>
                    <Col md={4}>
                        <FormGroup>
                            <Label >
                                Tổng tiền  khuyến mãi
                            </Label>

                        </FormGroup>
                    </Col>
                    <Col md={6}>
                        <FormGroup>
                            <Label >
                            {infoUser.user_totalPromotional}
                            </Label>

                        </FormGroup>
                    </Col>
                    <Col md={4}>
                        <FormGroup>
                            <Label >
                                Tổng số tiền thanh toán (bằng số)
                            </Label>

                        </FormGroup>
                    </Col>
                    <Col md={6}>
                        <FormGroup>
                            <Label >
                            {infoUser.user_totalSevice}
                            </Label>

                        </FormGroup>
                    </Col>
                    <Col md={4}>
                        <FormGroup>
                            <Label >
                                Tổng số tiền (bằng chữ)
                            </Label>

                        </FormGroup>
                    </Col>
                    <Col md={6}>
                        <FormGroup>
                            <Input />

                        </FormGroup>
                    </Col>
                    <Col md={4}>
                        <FormGroup>
                            <Label >
                                Thời gian tạo đơn
                            </Label>

                        </FormGroup>
                    </Col>
                    <Col md={6}>
                        <FormGroup>
                        {Ctime} Ngày {date}


                        </FormGroup>
                    </Col>
                    <Col md={4}>
                        <FormGroup>
                            <Label >
                                {infoUser.user_checkPay ? "Đã thanh toán" : "Chưa thanh toán"}
                            </Label>

                        </FormGroup>
                    </Col>
                    <Col md={6}>
                        <FormGroup>
                            <Input
                            />
                        </FormGroup>
                    </Col>

                </Row>
            </Form>
        </>
    )
}
export default InfoOrder;