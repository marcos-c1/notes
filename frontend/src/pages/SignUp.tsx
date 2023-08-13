import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { postUser } from '../redux/notes/userSlice';

const SignUp = () => {
	const dispatch = useDispatch();
	const user = useSelector((state) => state.user);
	const [passEqual, setPassEqual] = useState<Boolean>(false);
	const [passFilter, setPassFilter] = useState<Boolean>(false);
	const [invalidEmail, setInvalidEmail] = useState<Boolean>(false);
	const [termsOfUser, setTermsOfUser] = useState<Boolean>(false);
	const [counter, setCounter] = useState<Number>(5);

	const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
	const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/

	function startCountdown(seconds: Number) {
		let counterInside: Number = seconds;

		const interval = setInterval(() => {
			counterInside--;
			setCounter(counterInside);

			if (counterInside < 0) {
				clearInterval(interval);
				document.getElementById("btnGoBack")?.click();
			}
		}, 1000);
	}

	async function handleSubmit(e) {
		e.preventDefault();
		const fullname = e.target[0].value;
		const email = e.target[1].value;
		const username = e.target[2].value;
		const password = e.target[3].value;
		const repeatPassword = e.target[4].value;
		const checked = e.target[5].value;
		console.log(checked);

		if (!email.match(regex)) {
			setInvalidEmail(true);
		}
		else if (password != repeatPassword) {
			setPassEqual(true);
		} else if (!password.match(passwordRegex)) {
			setPassFilter(true);
		}
		else if (!checked) {
			setTermsOfUser(true);
		} else {
			setInvalidEmail(false);
			setPassEqual(false);
			setPassFilter(false);
			setTermsOfUser(false);

			e.target[0].value;
			e.target[1].value;
			e.target[2].value;
			e.target[3].value;
			e.target[4].value;
			e.target[5].value;

			const payload = {
				fullname: fullname,
				username: username,
				email: email,
				password: password
			}
			await dispatch(postUser(payload)).unwrap();
			startCountdown(5);
		}
	}
	return (
		<>
			<Link to="/"><button id="btnGoBack">Go back</button></Link>
			<div className="container__centering">
				<div className='container__signup'>
					<form action="" method="post" id="signup__form" onSubmit={handleSubmit}>
						<h1 style={{ textAlign: "center" }} id="signup__title">SIGN UP</h1>
						<input id="signup__input" placeholder="Full Name" type="text"></input>
						<input id="signup__input" placeholder="E-mail" type="text"></input>
						{invalidEmail ? <small style={{ color: "red" }}>Invalid e-mail.</small> : null}
						<input id="signup__input" placeholder="Username" type="text"></input>
						{!user.loading && user.error && user.created ? <small style={{ color: "red" }}>User already exist.</small> : null}
						<input id="signup__input" placeholder="********" minLength={8} type="password"></input>
						<input id="signup__input" placeholder="********" type="password"></input>
						{passEqual ? <small style={{ color: "red" }}>Password do not match.</small> : null}
						{passFilter ? <small style={{ color: "red" }}>Password is minimum eight characters and must have atleast 1 special character and 1 number.</small> : null}
						<input type="checkbox" data-val="true" value="true" id="signup__check" />
						<span style={{ margin: "0 auto" }}>I agree of the <b>Terms of User</b></span>
						{termsOfUser ? <small style={{ color: "red" }}>Accept the terms to continue.</small> : null}
						<div style={{ padding: "1em", display: "flex", flexDirection: "column", justifyContent: "center" }}>
							<button id="btnSignUp">Sign Up</button>
						</div>
					</form>
				</div>
			</div>
			{user.created && !user.error ? (<div id="top__right__popup" className="success"><h4>User successfully created. Redirect in {counter}</h4></div>) : null}
			{user.created && user.error ? (<div id="top__right__popup" className="error"><h4>User could not be created. {user.error}.</h4></div>) : null}
		</>

	)
}

export default SignUp