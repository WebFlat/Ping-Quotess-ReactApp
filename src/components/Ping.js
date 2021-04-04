import { useState } from 'react';
import Button from './Button';
import Message from './Message';

const Ping = () => {


    //Обьявляем state
    const [pingServ, setPing] = useState('');
    const [time, setTime] = useState('0 ms');
    const [modalActive, setModalActive] = useState(false);
    const [textAlert, setText] = useState('alert');

    //Сервисные сообщения
    let alert = (text) => {
        setText(text);
        setModalActive(true);
        setTimeout(() => {
            setModalActive(false);
        }, 1000);
    };


    //Очистка поля ввода
    const cleanInput = () => {
        if (pingServ === '') {
            alert('Поле ввода пустое');
        } else {
            setPing('');
            setTime('0 ms');

        };
    };


    //Пингуем сервер 
    //Запрос на отправку
    async function getPing() {
        let endPing = 0;
        let startPing = new Date().getTime();
        try {
            const request = await fetch(pingServ, {
                mode: "no-cors",
                headers: {
                    'Access-Control-Allow-Origin': '*'
                },
            })
                .then((response) => response.text())
                .then((text) => console.log(text + '...'));
            endPing = new Date().getTime() - startPing;
            setTime(endPing + ' ms');
            return request;
        } catch (error) {
            alert('Запрос не выполнился');
            endPing = new Date().getTime() - startPing;
            setTime(endPing + ' ms');
        };
    };

    //Запуск пинга
    const startPing = () => {
        //Проверка правильного ввода
        const pattern = new RegExp('[http(s?)-ww(s?)](:\/\/)([a-zA-z0-9\-_]+)');
        const testinput = () => {
            if (pattern.test(pingServ)) {
                return true;
            } else {
                return false;
            };
        }

        if (pingServ === undefined || pingServ === null || pingServ === '' || !testinput()) {
            alert('Введите правильный адрес сервера');
            setTime('0 ms');
            setPing('');
        } else {
            getPing();

        }

    }

    //Передаем ввод в state
    const inputChangedHandler = (event) => {
        setPing(event.target.value);
    }



    return (
        <>
            <Message active={modalActive} setActive={setModalActive}>
                <p className="app__alert">{textAlert}</p>
            </Message>
            <article className="app__tab" >
                <div className="app__out-wrap">
                    <label htmlFor="pingServ">Введите адрес сервера</label>
                    <input type="text" name="pingServ" id="pingServ" placeholder="https://exemple.com"
                        className="app__data app__data--serv" onChange={(event) => inputChangedHandler(event)} value={pingServ} readOnly={false} />
                </div>
                <div className="app__btns">
                    <Button name="Пинговать" id="startPing" class="getPing btn" click={startPing} />
                    <Button name="Очистить" class="btn" click={cleanInput} />

                </div>
                <div className="app__out-wrap app__out-wrap--ping">
                    <label>Ping</label>
                    <input type="text" className="app__data" id="ping" value={time} readOnly={true} />
                </div>
            </article>
        </>
    )
}


export default Ping;
