import { useState } from 'react';
import Button from './Button.js';
import Input from './Input.js';
import Message from './Message.js';
import { w3cwebsocket as W3CWebSocket } from 'websocket';



// class Quotes extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             resMiddle: 0,
//             deviation: 0,
//             moda: 0,
//             mediana: 0,
//             currentTime: '00:00:00',
//             time: '0 ms',
//             allValue: []

//         };
//     };
const Quotes = () => {

    //Обьявляем state
    const [resMiddle, setResMiddle] = useState(0);
    const [deviation, setDeviation] = useState(0);
    const [moda, setModa] = useState(0);
    const [mediana, setMediana] = useState(0);
    const [currentTime, setCurrentTime] = useState('00:00:00');
    const [time, setTime] = useState('0 ms');
    let [allValue, setAllValue] = useState([]);
    const [modalActive, setModalActive] = useState(false);
    const [textAlert, setText] = useState('alert');
    const [socketState, setSocketState] = useState(0);




    // var allValue = [];



    //Сервисные сообщения
    let alert = (text) => {
        setText(text);
        setModalActive(true);
        setTimeout(() => {
            setModalActive(false);
        }, 1000);
    };


    const urlSocket = 'wss://trade.trademux.net:8800/?password=1234';
    let socket;





    //выполняем соединение с сокетом
    const getPromotions = () => {

        if (socketState === 0) {
            socket = new W3CWebSocket(urlSocket);
            socket.onopen = () => {
                alert('Соединение установленно');
                setSocketState(1);
            };
            socket.onmessage = messageReceived;
        } else {
            alert('Соединение уже установленно')
        }
    };

    //Получаем данныые и запоняем массив
    function messageReceived(event) {
        let jsonObject = JSON.parse(event.data);
        let valueVal = jsonObject.value;
        allValue.push(valueVal);
        setAllValue(allValue);
    };


    //Если есть соединение с сервером
    const outPromotions = () => {
        if (!socketState === 1) {

            alert('Нажмите СТАРТ для соединения с сервером');
        } else {
            //Если данные есть
            if (allValue.length > 0) {
                //Замер времени начала расчетов
                const start = new Date().getTime();

                //Среднее значение
                let len = allValue.length;
                let middle = Math.round(allValue.reduce((a, b) => a + b, 0) / len);
                setResMiddle(middle);

                //стандартное отклонение
                let dev = Math.sqrt(allValue.map(x => Math.pow(x - middle, 2)).reduce((a, b) => a + b) / len);
                dev = Math.round(dev);
                if (dev > 0 || dev === isNaN) {
                    setDeviation(dev);
                };

                //Мода
                let mod = 0;
                const histogram = arr => arr.reduce((result, item) => {
                    result[item] = (result[item] || 0) + 1
                    return result
                }, {})

                const pairs = obj => Object.keys(obj).map(key => [key, obj[key]])

                function mode(arr) {
                    let result = pairs(histogram(arr))
                        .sort((a, b) => b[1] - a[1])
                        .filter((item, index, source) => item[1] === source[0][1])
                        .map(item => item[0])
                    return result.length === arr.length ? [] : result
                };
                mod = mode(allValue);
                setModa(mod);

                //Медиана
                let med = 0;
                function median(arr) {
                    let m = Math.max(arr[0], arr[1]), n = Math.min(arr[0], arr[1]);
                    for (var i = 0; i < arr.length; i++) {
                        let min = Math.min(arr[i], arr[i + 1]),
                            max = Math.max(arr[i], arr[i + 1]);
                        if (max < m) m = max;
                        if (min > n) n = min;
                    };
                    return (n + m) / 2;

                };
                med = median(allValue);
                if (med > 0 || med === isNaN) {
                    setMediana(med);
                };

                //Время расчетов
                let thisTime = new Date().toLocaleTimeString();
                setCurrentTime(thisTime);





                //Замер времени конца расчетов
                const end = new Date().getTime();
                //Вывод времени
                const time = end - start;
                setTime(`${time} ms`);

            } else {
                alert('Получение данных, подождите...');
            };
        };
    };






    return (
        <>
            <Message active={modalActive} setActive={setModalActive}>
                <p className="app__alert">{textAlert}</p>
            </Message>
            <article className="app__tab active">
                <div className="app__btns">
                    <Button id="start" class="btn" name="Старт" click={getPromotions} />
                    <Button id="get" class="btn" name="Статистика" click={outPromotions} />
                </div>
                <div className="app__outs">
                    <div className="app__out-wrap">
                        <label>Среднее значение</label>
                        <Input class="app__data" id="resMiddle" val={resMiddle} readOnly={true} />
                    </div>
                    <div className="app__out-wrap">
                        <label>Стандартное отклонение</label>
                        <Input class="app__data" id="deviation" val={deviation} readOnly={true} />
                    </div>
                    <div className="app__out-wrap">
                        <label>Мода</label>
                        <Input class="app__data" id="moda" val={moda} readOnly={true} />
                    </div>
                    <div className="app__out-wrap">
                        <label>Медиана</label>
                        <Input class="app__data" id="mediana" val={mediana} readOnly={true} />
                    </div>
                    <div className="app__out-wrap">
                        <label>Время расчетов</label>
                        <Input class="app__data" id="currentTime" val={currentTime} readOnly={true} />
                    </div>
                    <div className="app__out-wrap">
                        <label>Время затраченное на расчеты</label>
                        <Input class="app__data" id="time" val={time} readOnly={true} />
                    </div>

                </div>
            </article>
        </>
    )
}


export default Quotes;
