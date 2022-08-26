import React, { useState } from "react";
import '../Search/Search.scss'
import { Button, Col, Form, Row } from "reactstrap";
function Search(props) {
    const {HandleInput, OnClickSearch,result ,setSaveData,open , setOpen} = props;
    const handleClickItem = (data) => {
        setSaveData(data)
        setOpen(false)
        console.log(data);
    }

    return (
        <>
            <Form className="form-1">
                <Row className="row-1">
                    <Col sm={4} className="col-1" >
                        <span className="text-success "  >
                            <i className="fa fa-book "></i>
                            Sổ thu
                        </span>
                        <select>
                            <option value='1'>Sổ thu ngân ca sáng</option>
                            <option value='2'>Sổ thu ngân ca chiều</option>
                        </select>
                    </Col>
                    <Col sm={4} className="col-1">
                        <span className="text-success ">

                            <i className="fa fa-list"></i>

                            Mã bệnh nhân
                        </span>
                        
                        <input id="searchInput" onChange ={(e)=> HandleInput(e)} placeholder="Nhập mã bệnh nhân"></input>
                        <Button onClick={OnClickSearch} color="success" className="btn">
                            <i  className="fa fa-search"></i>
                        </Button>
                        <div className="search-form">
                            <ul className={open? "search-list" : "close-search"} id="searchList">
                                {result.map((data,i) =>{
                                    return (
                                        <li key={i} className="search-item" onClick={(e) => handleClickItem(data)}>{data.user_id}</li>
                                    )
                                })}
                            </ul>
                    </div>
                        
                    </Col>
                    <Col sm={4} className="col-1">
                        <span className="text-success ">

                            <i className="fa fa-list"></i>

                            Mã hóa đơn
                        </span>
                        <input  placeholder="Nhập mã hóa đơn"></input>
                        <Button color="success" className="btn" >
                            <i className="fa fa-search"></i>
                        </Button>
                    </Col>
                </Row>
            </Form>
            
        </>
    )
}
export default Search