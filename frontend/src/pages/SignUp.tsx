import React from 'react'
import { Link } from 'react-router-dom';

const SignUp = () => {

	function handleSubmit(e) {
		e.preventDefault();
	}
	return (
		<div>
			<Link to="/"><button id="btnGoBack">Go back</button></Link>
			<form method="post" id="signup__form" onSubmit={handleSubmit}>
				<h1 id="title">SIGN UP</h1>
				<input id="signup__input" placeholder="Full Name" type="text"></input>
				<input id="signup__input" placeholder="E-mail" type="text"></input>
				<input id="signup__input" placeholder="Username" type="text"></input>
				<input id="signup__input" placeholder="Password" type="password"></input>
				<input id="signup__input" placeholder="Repeat Password" type="password"></input>
				<div style={{ padding: "1em" }}>
					<input type="checkbox" id="signup__check" />
					<span>I agree of the <b>Terms of User</b></span>
				</div>
				<button id="btnSignUp">Sign Up</button>
			</form>
		</div>
	)
}

export default SignUp