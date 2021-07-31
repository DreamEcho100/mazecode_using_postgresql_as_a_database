import { Fragment, useContext, useState } from 'react';

import classes from './ChangeUserEmailModal.module.css';

import UserContext from '@store/UserContext';

import Modal from '@components/UI/V1/Modal/Modal';
import Form from '@components/UI/V1/Form';
import FormControl from '@components/UI/V1/FormControl/FormControl';
import Label from '@components/UI/V1/Label';
import Input from '@components/UI/V1/Input';
import Button from '@components/UI/V1/Button';

const ChangeUserEmailModal = ({ closeModal }) => {
	const { handleChangeEmail, user } = useContext(UserContext);

	const [email, setEmail] = useState(user.email);
	const [password, setPassword] = useState('');

	const [afterFormSubmitMessage, setAfterFormSubmitMessage] = useState(true);
	const [btnsDisabled, setBtnsDisabled] = useState(false);

	const handleSubmit = async (event) => {
		event.preventDefault();

		try {
			setBtnsDisabled(true);
			const { status, message } = await handleChangeEmail({ email, password });

			if (status === 'error') {
				setBtnsDisabled(false);
				setAfterFormSubmitMessage(message);
				return;
			}

			closeModal();
		} catch (error) {
			setBtnsDisabled(false);
			console.error(error);
			setAfterFormSubmitMessage(error.message);
			return { status: 'error', message: error.message };
		}
	};

	return (
		<Modal
			click={closeModal}
			CloseButtonElement={(props) => (
				<Button type='button' {...props}>
					Close
				</Button>
			)}
		>
			<Fragment key='header'>
				<h1>Change Your Email</h1>
			</Fragment>
			<Fragment key='body'>
				<Form onSubmit={handleSubmit}>
					<FormControl>
						<Label htmlFor='email'>Your Email</Label>
						<Input
							type='email'
							id='email'
							required
							onChange={(event) => setEmail(event.target.value)}
							value={email}
						/>
					</FormControl>
					<FormControl>
						<Label htmlFor='password-to-change-email-in-settings'>
							Enter Your Password
						</Label>
						<Input
							type='password'
							id='password-to-change-email-in-settings'
							required
							onChange={(event) => setPassword(event.target.value)}
							value={password}
						/>
					</FormControl>
					{afterFormSubmitMessage.length !== 0 && (
						<div className={classes.warning}>
							<p>{afterFormSubmitMessage}</p>
						</div>
					)}
					<Button
						disabled={btnsDisabled}
						type='submit'
						className={classes.submitBtn}
					>
						Submit
					</Button>
				</Form>
			</Fragment>
		</Modal>
	);
};

export default ChangeUserEmailModal;
