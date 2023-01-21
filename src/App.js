import anime from 'animejs';
import Platform from './img/platform.png';
import logo from './img/Theodolite.png'
import './App.css';
import { useEffect, useRef } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { notifyOk, notifyError, ngnStates, api } from './utils/toaster';

function App() {
  let customRAF = useRef(window)

  const formik = useFormik({
    initialValues: {
      companyName: '',
      companyEmail: '',
      companyPhone: '',
      companyAddress: '',
      state: ''
    },
    validationSchema: Yup.object({
      companyName: Yup.string()
        .required('Company name is required'),
      companyPhone: Yup.string()
        .max(11, 'The normal phone number length is 11')
        .required('Company phone number is required'),
      companyEmail: Yup.string().email('Invalid email address').required('Company email is required'),
      companyAddress: Yup.string().required('Company address is required'),
      state: Yup.string().required('Please include the state where your company is located')
    }),
    onSubmit: (values, { setSubmitting, resetForm }) => {
      const submitForm = async () => {
        const getEmail = await api.get(`/exec?action=checkEmail&searchString=${values.companyEmail}`)

        if (getEmail.data.result === 'success' && getEmail.data.message === 'email already registered') {
          notifyError('We already have your details. We will email you when we launch.');
          setSubmitting(false)
          resetForm();
          return;
        }

        const formData = new FormData();

        for (const key in values) {
          formData.append(key, values[key]);
        }

        const rqt = await api.post('/exec', formData, { headers: { 'Content-Type': `multipart/form-data` } });

        if (rqt.data.result === 'success') {
          notifyOk ("Awesome, you've been added to our waiting list. You'll be the first to know once we launch")
          setSubmitting(false);
          resetForm();
        }
    }

    setTimeout(() => {
        submitForm().catch(error => {
        setSubmitting(false);
        notifyError(error.message)
      })
    }, 1000)
  }})



  useEffect(() => {
    const animation = anime({
      targets: '.platform',
      translateY: 10,
      direction: 'alternate',
      loop: true,
      easing: 'easeInOutQuad',
      autoplay: false,
    });
    
    function loop(t) {
      animation.tick(t);
      customRAF.current.requestAnimationFrame(loop);
    }
    requestAnimationFrame(loop);
  }, [])

  return (
      <div className="App">
        <header className="App-header">
          <div>
            <img src={logo} alt="brand logo" />
          </div>
        </header>

      <article className="container-fluid hero">
        <div className="row no-gutter justify-content-center marketing">
          <section className="col-lg-5 col-md-5 col-xs-12 col-sm-12">
            <h1>Surveycamp 🚀</h1>
            <h2>Go digital and do things On-Demand</h2>
            <p>
              Traditionally file management has been done manually in most survey firms.
              This comes with lots of manual file achiving which is inefficient and insecure 😩 <br/><br/>

              Surveycamp is a bespoke platform that lets surveyors go digital and manage client projects
              effortlessly.
            </p>

            <a href="#waitlist"><button type="submit">Get notified when we launch</button></a>
          </section>

          <section className="col-lg-5 col-md-5 col-sm-12 col-xs-12 platform" id="platform">
            <img src={Platform} alt="platform" />
          </section>
        </div>
      </article>

      <article id="waitlist">
        <section className="container">
          <form onSubmit={formik.handleSubmit}>
            <h2>Join Our Wait List 📆</h2>
            <div className="inputroup">
              <label htmlFor="companyName">Company name</label>
              {formik.touched.companyName && formik.errors.companyName ? (<div className="error">{formik.errors.companyName}</div>) : null}
              <input
                id="companyName"
                name="companyName"
                value={formik.values.companyName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                type="text" 
                placeholder="Enter company name"
              />
            </div>

            <div className="formGroup">
              <div className="inputGroup">
                <label htmlFor="companyEmail">Email</label>
                {formik.touched.companyEmail && formik.errors.companyEmail ? (<div className="error">{formik.errors.companyEmail}</div>) : null}
                <input id="companyEmail" name="companyEmail" value={formik.values.companyEmail} onBlur={formik.handleBlur} onChange={formik.handleChange} type="email" placeholder="Enter company email"/>
              </div>

              <div className="inputGroup">
                <label htmlFor="companyPhone">Phone number</label>
                {formik.touched.companyPhone && formik.errors.companyPhone ? (<div className="error">{formik.errors.companyPhone}</div>) : null}
                <input id="companyPhone" name="companyPhone" value={formik.values.companyPhone} onBlur={formik.handleBlur} onChange={formik.handleChange} type="tel" placeholder="Enter working phone number" />
              </div>
            </div>

            <div className="formGroup">
              <div className="inputGroup">
                <label htmlFor="companyAddress">Office Address</label>
                {formik.touched.companyAddress && formik.errors.companyAddress ? (<div className="error">{formik.errors.companyAddress}</div>) : null}
                <input id="companyAddress" name="companyAddress" value={formik.values.companyAddress} onBlur={formik.handleBlur} onChange={formik.handleChange} type="text"  placeholder="Enter office address"/>
              </div>

              <div className="inputGroup">
                <label htmlFor="state">State</label>
                {formik.touched.state && formik.errors.state ? (<div className="error">{formik.errors.state}</div>) : null}
                <select id="state" name="state" value={formik.values.state} onBlur={formik.handleBlur} onChange={formik.handleChange}>
                  <option>-- select state --</option>
                  {ngnStates.map(state => (<option value={state}>{state}</option>))}
                </select>
              </div>
            </div>

            <button type="submit" disabled={formik.isSubmitting}>Join waitlist</button>
          </form>
        </section>
      </article>
        
      <footer>
        &copy; Surveycamp, {new Date().getFullYear()} 
        </footer>
      </div>
  );
}

export default App;
