import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { postUser } from '../redux/notes/userSlice';

const SignUp = () => {
	const dispatch = useDispatch();
	const user = useSelector((state) => state.user);
	const [passEqual, setPassEqual] = useState(false);
	const [invalidEmail, setInvalidEmail] = useState(false);
	const [termsOfUser, setTermsOfUser] = useState(false);
	const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

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
		}
		else if (!checked) {
			setTermsOfUser(false);
		} else {
			setInvalidEmail(false);
			setPassEqual(false);
			const payload = {
				fullname: fullname,
				username: username,
				email: email,
				password: password
			}
			await dispatch(postUser(payload)).unwrap();
		}
	}
	return (
		<>
			<Link to="/"><button id="btnGoBack">Go back</button></Link>
			<div className="container__centering">
				<div className='container__signup'>
					{user.loading && <div className="sidebar__loading"><h2 style={{ textAlign: "center" }}>Loading...</h2></div>}
					{!user.loading ? (
						<form action="" method="post" id="signup__form" onSubmit={handleSubmit}>
							<h1 style={{ textAlign: "center" }} id="signup__title">SIGN UP</h1>
							<input id="signup__input" placeholder="Full Name" type="text"></input>
							<input id="signup__input" placeholder="E-mail" type="text"></input>
							{invalidEmail ? <small style={{ color: "red" }}>Invalid e-mail.</small> : null}
							<input id="signup__input" placeholder="Username" type="text"></input>
							{!user.loading && user.error ? <small style={{ color: "red" }}>User already exist.</small> : null}
							<input id="signup__input" placeholder="********" minLength={8} type="password"></input>
							<input id="signup__input" placeholder="********" type="password"></input>
							{passEqual ? <small style={{ color: "red" }}>Password do not match.</small> : null}
							<input type="checkbox" data-val="true" value="true" id="signup__check" />
							<span style={{ margin: "0 auto" }}>I agree of the <b>Terms of User</b></span>
							{termsOfUser ? <small style={{ color: "red" }}>Accept the terms to continue.</small> : null}
							<div style={{ padding: "1em", display: "flex", flexDirection: "column", justifyContent: "center" }}>
								<button id="btnSignUp">Sign Up</button>
							</div>
						</form>) : null}
				</div>
			</div>

		</>

	)
}

export default SignUp