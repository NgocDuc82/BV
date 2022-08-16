import { useState, useRef} from 'react';
import PatientInfor from './components/PatientInfor';
import { Row, Col, Container, Button } from 'reactstrap';
import Styles from './resultXray.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { resultServiceXray } from '../share/util';
const cx = classNames.bind(Styles);
function ResultXray(props) {
    const { data, count, showLocal, setdata } = props;
    const [result, setResults] = useState({
        codeFromService: '',
        description: '',
        conclusion: '',
    });
    let getName = useRef()
    getName.current = result.codeFromService
    const patient = Object.assign(data, result);
    const [showFinish, setFinish] = useState([]);
    localStorage.setItem('finishPatient', JSON.stringify(showFinish));
    const HandleFinish = (i) => {
        showLocal.splice(i, 1);
        setFinish([...showFinish, patient]);
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
        });
        setResults({
            codeFromService: '',
            description: '',
            conclusion: '',
        });
    };
    console.log('logic');
    const onChangeResults = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setResults({ ...result, [name]: value });
    };
    const setOnchangeCode = async (ev) => {
        await setResults({
            codeFromService: ev.target.value,
        })
        await setResultFrom()
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
            <Row>
                <Col>
                    <div>
                        <PatientInfor data={data} />
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
                            value={result.description}
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
                            value={result.conclusion}
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
                    <Button onClick={() => HandleFinish(count)} size="lg" color="success" outline>
                        Lưu
                    </Button>
                </Col>
            </Row>
        </Container>
    );
}

export default ResultXray;
