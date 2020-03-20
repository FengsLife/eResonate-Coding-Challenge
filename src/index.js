import React from 'react';
import ReactDOM from 'react-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';

import { ReactComponent as TwitterIcon } from './images/twitter-square.svg';
import { ReactComponent as LinkedInIcon } from './images/linkedin-square.svg';
import { ReactComponent as InstagramIcon } from './images/instagram.svg';
import { ReactComponent as SearchIcon } from './images/search.svg';

import { ReactComponent as BGTopRightBlue } from './images/top-right-blue.svg';
import { ReactComponent as BGBottomLeftGreen } from './images/bottom-left-green.svg';

import './index.css';
import './font-rubik.css';

class App extends React.Component {
	handleWindowResize() {
		var topNavHeight = document.getElementsByClassName('topnav')[0].clientHeight;
		var bottomNavHeight = document.getElementsByClassName('bottomnav')[0].clientHeight;
		var middleHeight = 687;
		if (window.innerWidth > 768) {
			middleHeight = 720;
		}
		
		if (window.innerHeight > middleHeight + topNavHeight + bottomNavHeight) { 
			document.getElementsByClassName('middle')[0].setAttribute("style","height: " + (window.innerHeight 
				- topNavHeight - bottomNavHeight) + "px");
		} else {
			document.getElementsByClassName('middle')[0].setAttribute("style","height: " + middleHeight + "px");
		}
	}
	
	componentDidMount() {
		this.handleWindowResize()
		window.addEventListener('resize', this.handleWindowResize)
	}

	componentWillUnmount() {
		window.removeEventListener('resize', this.handleWindowResize)
	}
	
	render() {
		return (
			<div className="body-container"> 
				<div className="topnav">
					<span className="circle" />
					<a href="none"><SearchIcon className="search-icon" /></a>
				</div>
				
				<div className="middle">
					<BGTopRightBlue className="bg-top-right" />
					<BGBottomLeftGreen className="bg-bottom-left" />
				
					<div className="title">Report a Problem</div>
					
					<Formik
						initialValues={{ name: '', phone: '', email: '', message: '' }}
						validate={values => {
							const errors = {};
							
							if (!values.name) {
								errors.name = 'Your name is required.';
							}
							
							if (!values.phone) {
								errors.phone = 'A phone number is required.';
							} else if (!/^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s./0-9]*$/i.test(values.phone)) {
								errors.phone = 'Please enter a valid phone number.';
							}
							
							if (!values.email) {
								errors.email = 'Your email address is required.';
							} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
								errors.email = 'Please enter a valid email address.';
							}
							
							if (!values.message) {
								errors.message = 'Please enter a message.';
							}
							
							return errors;
						}}
						
						onSubmit={(values, { setSubmitting }) => {
							fetch('https://froyosoft.com/send_report.php', {
								method: 'POST',
								body: JSON.stringify(values),
								headers: {
									'Content-Type': 'application/json'
								}
							}).then(res => res.json())
								.then(data => {
									console.log(data);
									alert("Response object logged in console, response code was: " + data.code + ".");
								})
								.catch(err => console.error("Error:", err))
								.finally(() => setSubmitting(false))
						}}
						>
						
					{({ isSubmitting }) => (
					<Form>
						<div className="input-group"> 
						<span>Your Name</span>
						<Field type="text" name="name" className="input-field" />
						<ErrorMessage name="name" component="div" className="validation-error" />
						</div>
						
						<div className="input-group"> 
						<span>Phone Number</span><br />
						<Field type="tel" name="phone" className="input-field" />
						<ErrorMessage name="phone" component="div" className="validation-error" />
						</div>
					
						<div className="input-group">
						<span>Email</span><br />
						<Field type="email" name="email" className="input-field" />
						<ErrorMessage name="email" component="div" className="validation-error" />
						</div>
						
						<div className="input-group">
						<span>Message</span><br />
						<Field as="textarea" type="text" name="message" rows = "8" className="input-field-textarea" />
						<ErrorMessage name="message" component="div" className="validation-error" />
						</div>

						<div className="input-group">
						<button type="submit" disabled={isSubmitting} className="submit">
						Submit
						</button>
						</div>
					</Form>
					)}
					
					</Formik>
				</div>
				
				<div className="bottomnav">
					<div className="icons-container">
						<a href="#none"><TwitterIcon /></a>
						<a href="#none"><LinkedInIcon /></a>
						<a href="#none"><InstagramIcon /></a>
					</div>

					<div className="links-container">
						<div className="links-group-1">
							<div className="link">
								<a href="#none">Claim Your Venue</a>
							</div>
							<div className="link">
								<a href="#none">Venue Log In</a>
							</div>
						</div>
						<div className="links-group-2">
							<div className="link">
								<a href="#none">Terms and Condition</a>
							</div>
							<div className="link">
								<a href="#none">Privacy Policy</a>
							</div>
						</div>
						
						<div className="links-group-3"> 
							<div className="link">
								<button className="default">Default</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

ReactDOM.render(<App />, document.getElementById('root'));

// npx create-react-app eresonate
// npm install formik --save