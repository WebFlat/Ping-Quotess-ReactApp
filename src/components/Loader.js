

const Loader = () => {

    //Запуск лоадера
    window.onload = () => {
        setTimeout(() => {
            let loader = document.querySelector('.loader');
            loader.style.zIndex = -100;
            loader.style.opacity = 0;
            document.querySelector('.app').style.opacity = 1;
        }, 2000);
    }

    return (
        <div className="loader">
            <p className="loader__text">
                This app create by Yaschuk Vyacheslav
            </p>
        </div>
    )
}

export default Loader;
