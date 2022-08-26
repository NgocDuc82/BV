import React from "react";
import { FormGroup, Form, Label, Col, Row, Table, Input } from "reactstrap";
import "./InfoOrder.scss";
function InfoOrder(props) {
  const { saveData } = props;
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
        <Table className="table-order">
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
              <Label>Giá gốc</Label>
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label>{saveData.user_cost ? saveData.user_cost : "0 VNĐ"}</Label>
            </FormGroup>
          </Col>
          <Col md={4}>
            <FormGroup>
              <Label>Tổng tiền khuyến mãi</Label>
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label>{saveData.user_totalPromotional ? saveData.user_totalPromotional : "0 VNĐ"}</Label>
            </FormGroup>
          </Col>
          <Col md={4}>
            <FormGroup>
              <Label>Tổng số tiền thanh toán (bằng số)</Label>
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label>{saveData.user_totalSevice ? saveData.user_totalSevice : "0 VNĐ"}</Label>
            </FormGroup>
          </Col>
          <Col md={4}>
            <FormGroup>
              <Label>Tổng số tiền (bằng chữ)</Label>
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Input />
            </FormGroup>
          </Col>
          <Col md={4}>
            <FormGroup>
              <Label>Thời gian tạo đơn</Label>
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Input />
            </FormGroup>
          </Col>
          <Col md={4}>
            <FormGroup>
              <Label>Trạng thái thanh toán</Label>
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Input />
            </FormGroup>
          </Col>
        </Row>
      </Form>
    </>
  );
}
export default InfoOrder;
