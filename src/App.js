import './components/Quotes';
import './App.scss';
import Quotes from './components/Quotes';
import Tablink from './components/Tablink';
import { BrowserRouter } from 'react-router-dom';
import { Route } from 'react-router-dom';
import Ping from './components/Ping';
import Loader from './components/Loader';


const App = () => {
  return (
    <BrowserRouter>
      <Loader />
      <section className="app">
        <p className="app__title">
          Выберите приложение
          </p>
        <header className="app__header">
          <nav className="app__nav">
            <Tablink name="Котировки" link="Quotes" class="app__link-page" activeclass="active" exact></Tablink>
            <Tablink name="Пингователь" link="Ping" class="app__link-page"></Tablink>
          </nav>
        </header>
        <section className="app__content">
          <Route path='/Quotes' component={Quotes} />
          <Route path='/Ping' component={Ping} />
        </section>
      </section>
    </BrowserRouter>
  );
}

export default App;
