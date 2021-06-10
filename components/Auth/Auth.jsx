import React from 'react';
import { useContext, useEffect, useState } from 'react';

import classes from './auth.module.css';

import UserContext from '../../store/UserContext';

import SignIn from './SignIn/SignIn';
import SignUp from './SignUp/SignUp';

const Auth = ({ UNIVERSAL_TUTORIAL_REST_API_FOR_COUNTRY_STATE_CITY_TOKEN }) => {
	const { user, ...UserCxt } = useContext(UserContext);

	const [signInComponent, setSignInComponent] = useState(true);
	const [signUpComponent, setSignUpComponent] = useState(false);

	return (
		<section className={classes.auth}>
			<header>
				<nav>
					<ul>
						<li
							onClick={() => {
								setSignInComponent(true);
								setSignUpComponent(false);
							}}
						>
							<button>Sign In</button>
						</li>
						<li
							onClick={() => {
								setSignUpComponent(true);
								setSignInComponent(false);
							}}
						>
							<button>Sign Up</button>
						</li>
					</ul>
				</nav>
			</header>
			{signInComponent && <SignIn />}
			{signUpComponent && (
				<SignUp
					UNIVERSAL_TUTORIAL_REST_API_FOR_COUNTRY_STATE_CITY_TOKEN={
						UNIVERSAL_TUTORIAL_REST_API_FOR_COUNTRY_STATE_CITY_TOKEN
					}
				/>
			)}
		</section>
	);
};

export default Auth;
