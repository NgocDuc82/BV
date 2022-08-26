/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useRef } from 'react';
import PatientInfor from './components/PatientInfor';
import { Row, Col, Container, Button } from 'reactstrap';
import Styles from './resultXray.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faPrint, faX } from '@fortawesome/free-solid-svg-icons';
import { resultServiceXray } from '../share/util';
import Print from '../printXray/printXray';
import classNames from 'classnames/bind';
import axios from 'axios';
const cx = classNames.bind(Styles);
function ResultXray(props) {
    const { data, count, setdata, selectPatient,showLocal,finishPatient} = props;
    const [show, setShow] = useState(false);
    const [result, setResults] = useState({
    });
    let getName = useRef();
    getName.current = result.codeFromService;
    const patient = Object.assign(data, result);
    console.log(patient);
    const [print, setPrint] = useState({});
    const [showPrint, setShowPrint] = useState(false);
    
    const HandleFinish = (i,k,showLocal,finishPatient) => {
        //update
        if(!!showLocal[i]===false&&!!finishPatient[k]===true){
            axios.post(`http://localhost:4000/api/xray/${finishPatient[k]._id}`,data)
            .then(()=>{
                setdata({
                    user_id: '',
                    user_name: '',
                    user_birthday: '',
                    user_sex: false,
                    user_phone: '',
                    user_adress: '',
                    user_provinc: '',
                    user_district: '',
                    user_ward: '',
                    user_CMND: '',
                    user_PlateOfRegis: '',
                    user_contact: '',
                    codeFromService: '',
                    description: '',
                    conclusion: '',
                });
                setResults({
                    codeFromService: '',
                    description: '',
                    conclusion: '',
                });
                setShow(!show);
                setPrint(data);
                setShowPrint(!showPrint)
            })
            .catch((error)=>{
                console.log(error)
            })
        }
        //create
        if(!!showLocal[i]===true&&!!finishPatient[k]===false){
            axios.post('http://localhost:4000/api/xray',patient)
        .then(()=>{
            setdata({
                user_id: '',
                user_name: '',
                user_birthday: '',
                user_sex: false,
                user_phone: '',
                user_adress: '',
                user_provinc: '',
                user_district: '',
                user_ward: '',
                user_CMND: '',
                user_PlateOfRegis: '',
                user_contact: '',
                codeFromService: '',
                description: '',
                conclusion: '',
            });
            setResults({
                codeFromService: '',
                description: '',
                conclusion: '',
            });
            setPrint(patient)
            setShow(!show);
            setShowPrint(!showPrint);
            
            //delete
            axios.delete(`http://localhost:4000/api/recep/${showLocal ? showLocal[i].user_id:[]}`)
            .then(()=>{
            })
            .catch((error)=>{
                console.log(error)
            })
            showLocal.splice(i,1)
        })
        .catch((error)=>{
            console.log(error)
        })
        }
        
    };
    const onChangeResults = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setResults({ ...result, [name]: value });
    };
    const setOnchangeCode = async (ev) => {
        await setResults({
            codeFromService: ev.target.value,
        });
        await setResultFrom();
        setShow(!show)
    };
    const setResultFrom = () => {
        resultServiceXray.forEach((el) => {
            if (getName.current === el.code) {
                setResults({
                    conclusion: el.results.conclusion,
                    description: el.results.description,
                });
            }
        });
    };
    return (
        <Container>
            <div className={cx('noPrint')}>
                <Row>
                    <Col>
                        <div>
                            <PatientInfor data={data}/>
                        </div>
                        <div className={cx('result-container')} style={{ backgroundColor: '#ffff' }}>
                            <div className={cx('result-title')}>
                                <span>
                                    <FontAwesomeIcon icon={faPen} /> Mô tả chi tiết kết quả X-Quang
                                </span>
                                <select
                                    id="codeFromService"
                                    name="codeFromService"
                                    value={result.codeFromService}
                                    onChange={(ev) => {
                                        setOnchangeCode(ev);
                                    }}
                                >
                                    <option value="">Chọn kết quả</option>
                                    {resultServiceXray.map((el) => {
                                        return (
                                            <option key={el.code} value={el.code}>
                                                {el.name}
                                            </option>
                                        );
                                    })}
                                </select>
                            </div>
                            <textarea
                                placeholder="Nhập kết quả X-Quang"
                                cols={38}
                                rows={10}
                                name="description"
                                value={result.description? result.description: data.description}
                                onChange={(e) => onChangeResults(e)}
                            ></textarea>
                        </div>
                        <div className={cx('result-container')} style={{ backgroundColor: '#ffff' }}>
                            <div className={cx('result-title-end')}>
                                <span>
                                    <FontAwesomeIcon icon={faPen} /> Kết Luận
                                </span>
                            </div>
                            <textarea
                                placeholder="Nhập kết luận x-quang"
                                value={result.conclusion ? result.conclusion : data.conclusion}
                                onChange={(e) => onChangeResults(e)}
                                cols={38}
                                rows={10}
                                id="result"
                                name="conclusion"
                            ></textarea>
                        </div>
                    </Col>
                </Row>
                <Row style={{ marginTop: 20, padding: 20, float: 'right' }}>
                    <Col>
                        {show && (
                            <Button onClick={() => HandleFinish(count,selectPatient,showLocal,finishPatient)} size="lg" color="success" outline>
                                Lưu
                            </Button>
                        )}
                    </Col>
                </Row>
            </div>
            {showPrint && (
                <div className={cx('modal')}>
                    <div className={cx('modal__overlay')}>
                    <div className={cx('tool')}>
                        <FontAwesomeIcon className={cx('x')} onClick={()=>setShowPrint(false) || window.location.reload()} icon={faX}/>
                            <Print patient={print} />
                        <FontAwesomeIcon className={cx('x')} onClick={()=>{window.print()}} icon={faPrint}/>
                    </div>
                    </div>
                </div>
            )}
        </Container>
    );
}

export default ResultXray;
