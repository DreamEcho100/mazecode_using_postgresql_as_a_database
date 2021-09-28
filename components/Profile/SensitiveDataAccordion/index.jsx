import { Fragment } from 'react';

import classes from './index.module.css';

import { dateToHumanReadableDate } from '@lib/v1/time';

import Accordion from '@components/UI/V1/Accordion';

const SensitiveDataAccordion = ({ userData }) => {
	return (
		<Accordion>
			<Fragment key='header'>
				<h2>Sensitive Data</h2>
			</Fragment>
			<Fragment key='body'>
				<div className={classes['accordion-body']}>
					<p>{userData.role}</p>

					<address>
						<p>Email: {userData.email}</p>
						<p>{userData.address_of_resident}</p>
					</address>

					<p>{userData.email_verified}</p>

					<time>
						<p>
							Date of birth:{' '}
							{
								dateToHumanReadableDate(userData.date_of_birth, {
									withTime: true,
								}).dateString
							}
						</p>
					</time>

					<time>
						<p>
							Last time sign in:{' '}
							{
								dateToHumanReadableDate(userData.last_sign_in, {
									withTime: true,
								}).dateAndTimeString
							}
						</p>
					</time>
				</div>
			</Fragment>
		</Accordion>
	);
};

export default SensitiveDataAccordion;
