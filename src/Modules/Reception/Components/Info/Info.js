import React, { memo, useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Col, Row } from "reactstrap";
import "./Info.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

function InfoAccounting(props) {
  const { onChangeInfoUser, infoUser, setInfoUser } = props;
  const [check, setCheck] = useState(false);
  const [resultSlashDate, setResultSlashDate] = useState("")
  useEffect(() => {
    if (infoUser.user_birthday.length >= 10) {
      setCheck(true);
    } else {
      setCheck(false);
    }
  }, [infoUser.user_birthday]);

  // eg 22092003 -> 22/09/2003
  const autoAddSlashDate = (rawDate) => {
    let result = rawDate;
    if (result[2] && result[2] !== "/") {
      result = result.slice(0, 2) + "/" + result.slice(2);
    }
    if (result[5] && result[5] !== "/") {
      result = result.slice(0, 5) + "/" + result.slice(5);
    }
    setResultSlashDate(result)
  };

  // calculate age
  function getAge(dateString) {
    const today = new Date();
    const birthDate = toDate(dateString);
    const m = today.getMonth() - birthDate.getMonth();
    let age = today.getFullYear() - birthDate.getFullYear();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    if (age < 1) {
      return diff_weeks(today, birthDate) + " tuần";
    } else if (age < 4) {
      return diff_months(today, birthDate) + " tháng";
    } else {
      return age + " tuổi";
    }
  }
  function diff_weeks(dt2, dt1) {
    let diff = (dt2.getTime() - dt1.getTime()) / 1000;
    diff /= 60 * 60 * 24 * 7;
    return Math.abs(Math.round(diff));
  }
  function diff_months(dt2, dt1) {
    let diff = (dt2.getTime() - dt1.getTime()) / 1000;
    diff /= 60 * 60 * 24 * 30;
    return Math.abs(Math.round(diff));
  }
  function toDate(dateStr) {
    const array = dateStr.split("/");
    const time_format = array[0].length > 2 ? array : array.reverse();
    return new Date(time_format[0], time_format[1] - 1, time_format[2]);
  }
  return (
    <div className="information__user">
      <Col className="information__user__col">
        <FontAwesomeIcon icon={faUser} id="icon__user" />
        <span>Thông tin bệnh nhân</span>
      </Col>
      <div className="information">
        <Col className="information__col">
          <Row xs="12" className="information__row">
            <Col xs="4">
              Mã bệnh nhân
              <span className="star">*</span>
            </Col>
            <Col xs="8">
              <input
                className="valueInput"
                name="user_id"
                value={infoUser.user_id}
                onChange={(e) => onChangeInfoUser(e)}
              />
            </Col>
          </Row>
          <Row xs="12" className="information__row">
            <Col xs="4">
              Họ và tên
              <span className="star">*</span>
            </Col>
            <Col xs="8">
              <input
                className="valueInput"
                name="user_name"
                value={infoUser.user_name}
                onChange={(e) => onChangeInfoUser(e)}
              />
            </Col>
          </Row>
          <Row xs="12" className="information__row">
            <Col xs="4">
              Ngày sinh
              <span className="star">*</span>
            </Col>
            <Col xs="6">
              <input
                name="user_birthday"
                className="valueInput"
                id="birthDayValueInput"
                pattern="^(0?[1-9]|[12][0-9]|3[01])[/](0?[1-9]|1[012])[/]\d{4}$"
                required
                placeholder="dd/mm/yyyy   VD:01/01/2022"
                value={resultSlashDate? resultSlashDate: infoUser.user_birthday}
                maxLength="10"
                onChange={(e) => {
                  onChangeInfoUser(e);
                  autoAddSlashDate(e.target.value);
                }}
              />
            </Col>
            {check && (
              <Col xs="2">
                <div className="get__age">{getAge(infoUser.user_birthday)}</div>
              </Col>
            )}
          </Row>
          <Row xs="12" className="information__row">
            <Col xs="4">
              Giới tính
              <span className="star">*</span>
            </Col>
            <Col xs="8">
              <select
                className="information__row__select"
                name="user_sex"
                value={infoUser.user_sex}
                onChange={(e) => onChangeInfoUser(e)}
              >
                <option>Chọn giới tính</option>
                <option>Nam</option>
                <option>Nữ</option>
                <option>Khác</option>
              </select>
            </Col>
          </Row>
          <Row xs="12" className="information__row">
            <Col xs="4">
              Số điện thoại
              <span className="star">*</span>
            </Col>
            <Col xs="8">
              <input
                className="valueInput"
                name="user_phone"
                value={infoUser.user_phone}
                onChange={(e) => {
                  onChangeInfoUser(e);
                }}
              />
            </Col>
          </Row>
        </Col>
      </div>
    </div>
  );
}

export default memo(InfoAccounting);