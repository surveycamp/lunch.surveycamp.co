import anime from 'animejs';
import Platform from './img/platform.png';
import logo from './img/survey_camp_logo.png'
import './App.css';
import { useEffect, useState } from 'react';
import { notifyOk, notifyError } from './utils/toaster';

const encode = (data) => {
  return Object.keys(data)
      .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
      .join("&");
}

function App() {
  const [formState, setFormState] = useState({ email: '' });
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    if (formState.email === '') {
      setError('Enter a valid email address');
      notifyError('Try again 😖')
    } else {
      fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encode({ "form-name": "demoRequest", ...formState })
      })
      .then(() => notifyOk('Thanks for requesting a demo 🤗'))
      .catch(error => notifyError(`${error.message} 😖`));
      setError('')
    }

    e.preventDefault();
  };

  const handleChange = (value) => {
    setFormState({ email: value})
  }

  useEffect(() => {
    let customRAF;
    var animation = anime({
      targets: '.platform',
      translateY: 10,
      direction: 'alternate',
      loop: true,
      easing: 'easeInOutQuad',
      autoplay: false,
    });
    
    function loop(t) {
      animation.tick(t);
      customRAF = requestAnimationFrame(loop);
    }
    
    requestAnimationFrame(loop);
  }, [error])

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

            <form onSubmit={handleSubmit}>
              {error !== '' ? <span>{error}</span> : null}
              <label htmlFor="email">Enter company email to request demo</label>
              <input onChange={(e) => handleChange(e.target.value)} id="email" name="email" type="email" placeholder="enter your company email address" />
              <button type="submit">Request for Demo</button>
            </form>
          </section>

          <section className="col-lg-4 col-md-5 col-sm-12 col-xs-12 platform" id="platform">
            <img src={Platform} alt="platform" />
          </section>
        </div>
      </article>
        
      <footer>
        &copy; {new Date().getFullYear()}
        </footer>
      </div>
  );
}

export default App;
