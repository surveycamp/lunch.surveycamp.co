import Platform from './img/platform.png';
import logo from './img/survey_camp_logo.png'
import './App.css';

function App() {
  return (
      <div className="App">
        <header className="App-header">
          <div>
            <img src={logo} alt="brand logo" />
          </div>
        </header>

      <article className="container-fluid">
        <div className="row no-gutter justify-content-center marketing">
          <section className="col-lg-4 col-md-5 col-xs-12 col-sm-12">
            <h1>Introducing Surveycamp</h1>
            <p>
              Surveycamp is a bespoke project management platform for managing your
              clients expectations, site operations and office work. We aim to be the
              one stop shop for managing your projects from start to finish.
            </p>

            <form>
              <input id="email" name="email" type="text" placeholder="enter your email" disabled/>
              <button>Request Demo</button>
            </form>
          </section>

          <section className="col-lg-4 col-md-5 col-sm-12 col-xs-12">
            <img src={Platform} alt="platform" />
          </section>
        </div>
      </article>
        
      <footer>
        &copy; {Date()}
        </footer>
      </div>
  );
}

export default App;
