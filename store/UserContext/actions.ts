import { IUser } from '@coreLib/ts/global';
import {
	TLoginUserRequestAction,
	TLoginUserRequestResetAction,
	TLogoutUserRequestAction,
	TLogoutUserRequestResetAction,
	TSignupUserRequestAction,
	TSignupUserRequestResetAction,
} from './ts';

import {
	deleteCookie,
	getCookie,
} from '@commonLibIndependent/storage/cookie/document';
import ls from '@commonLibIndependent/storage/localStorage';
import UserContextConstants from '@coreLib/constants/store/types/userContext';
import networkReqArgs from '@coreLib/networkReqArgs';

const returnBearerToken = (token: string) => `Bearer ${token}`;

export const loginUserRequestAction: TLoginUserRequestAction = async (
	dispatch,
	{ bodyContent }
) => {
	try {
		dispatch({
			type: UserContextConstants.LOGIN_REQUEST_PENDING,
		});

		const { requestInfo, requestInit } = networkReqArgs._app.auth.login({
			bodyContent,
		});

		const { user }: { user: IUser } = await fetch(
			requestInfo,
			requestInit
		).then((response) => response.json());

		const accessToken = getCookie('accessToken');
		if (!accessToken) throw new Error("Access token wasn't found!");

		ls.set('userData', user);

		dispatch({
			type: UserContextConstants.LOGIN_REQUEST_SUCCESS,
			payload: { user, token: accessToken },
		});
	} catch (error) {
		dispatch({
			type: UserContextConstants.LOGIN_REQUEST_FAIL,
			payload: {
				errorMessage:
					error instanceof Error
						? error.message
						: 'Something wrong happened :(',
			},
		});
	}
};
export const loginUserRequestResetAction: TLoginUserRequestResetAction = (
	dispatch
) => {
	dispatch({
		type: UserContextConstants.LOGIN_REQUEST_RESET,
	});
};

export const signupUserRequestAction: TSignupUserRequestAction = async (
	dispatch,
	{ bodyContent }
) => {
	try {
		dispatch({
			type: UserContextConstants.SIGNUP_REQUEST_PENDING,
		});

		const { requestInfo, requestInit } = networkReqArgs._app.auth.signup({
			bodyContent,
		});

		const { user }: { user: IUser } = await fetch(
			requestInfo,
			requestInit
		).then((response) => response.json());

		const accessToken = getCookie('accessToken');
		if (!accessToken) throw new Error("Access token wasn't found!");

		ls.set('userData', user);

		dispatch({
			type: UserContextConstants.SIGNUP_REQUEST_SUCCESS,
			payload: { user, token: accessToken },
		});
	} catch (error) {
		dispatch({
			type: UserContextConstants.SIGNUP_REQUEST_FAIL,
			payload: {
				errorMessage:
					error instanceof Error
						? error.message
						: 'Something wrong happened :(',
			},
		});
	}
};
export const signupUserRequestResetAction: TSignupUserRequestResetAction = (
	dispatch
) => {
	dispatch({
		type: UserContextConstants.SIGNUP_REQUEST_RESET,
	});
};

export const logoutUserRequestAction: TLogoutUserRequestAction = async (
	dispatch,
	{ bodyContent, token }
) => {
	try {
		dispatch({
			type: UserContextConstants.LOGOUT_REQUEST_PENDING,
		});

		const { requestInfo, requestInit } = networkReqArgs._app.auth.logout({
			bodyContent,
			headersList: {
				Authorization: returnBearerToken(token),
			},
		});

		// const data =
		const result = await fetch(requestInfo, requestInit);
		// .then((response) =>
		// 	response.json()
		// );
		if (!result.ok) throw new Error(await result.text());

		deleteCookie('accessToken');
		deleteCookie('refreshToken');
		ls.remove('userData');

		dispatch({
			type: UserContextConstants.LOGOUT_REQUEST_SUCCESS,
		});
	} catch (error) {
		dispatch({
			type: UserContextConstants.LOGOUT_REQUEST_FAIL,
			payload: {
				errorMessage:
					error instanceof Error
						? error.message
						: 'Something wrong happened :(',
			},
		});
	}
};
export const logoutUserRequestResetAction: TLogoutUserRequestResetAction = (
	dispatch
) => {
	dispatch({
		type: UserContextConstants.LOGOUT_REQUEST_RESET,
	});
};

/*
import {
	setCookie,
	getCookie,
	deleteCookie,
	checkCookie,
} from '@lib/v1/cookie';

import types from './types';

const handleUserSign = async ({ dispatch, path, bodyObj }) => {
	const userResult = await fetch(path, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(bodyObj),
	})
		.then((response) => response.json())
		.catch((error) => {
			console.error(error.message);
			return { status: 'error', message: error.message };
		});

	if (userResult?.status === 'error') {
		console.error(userResult.message);

		return {
			status: 'error',
			message: userResult.message,
		};
	}

	setCookie({
		cookieName: 'user_data',
		cookieValue: JSON.stringify(userResult.data.user),
		expiresDate: new Date(
			new Date().getTime() + userResult.data.jwt.expiriesAfter
		).toISOString(),
		// domain: process.env.FRONT_END_DOMAIN,
		path: '/',
	});

	setCookie({
		cookieName: 'user_token',
		cookieValue: userResult.data.jwt.token,
		expiresDate: new Date(
			new Date().getTime() + userResult.data.jwt.expiriesAfter
		).toISOString(),
		// domain: process.env.FRONT_END_DOMAIN,
		path: '/',
	});

	setCookie({
		cookieName: 'user_expiry_deadline',
		cookieValue: new Date().getTime() + userResult.data.jwt.expiriesAfter,
		expiresDate: new Date(
			new Date().getTime() + userResult.data.jwt.expiriesAfter
		).toISOString(),
		// domain: process.env.FRONT_END_DOMAIN,
		path: '/',
	});

	const payload = {
		user: {},
		token: '',
		isVerifyingUserLoading: false,
		userExist: false,
	};

	if (userResult.data?.jwt?.token && userResult.data?.user?.id) {
		payload.user = userResult.data.user;
		payload.token = userResult.data.jwt.token;
		payload.userExist = true;
	}

	dispatch({
		type: types.SET_DATA,
		payload,
	});

	return {
		status: userResult.status,
		message: userResult.message,
	};
};

export const setDataFirstTime = async ({ dispatch }) => {
	const tokenCookie = getCookie({
		cookieName: 'user_token',
		cookieString: document.cookie,
	});

	const userCookie = getCookie({
		cookieName: 'user_data',
		cookieString: document.cookie,
	});

	const payload = {
		user: {},
		token: '',
		isVerifyingUserLoading: false,
	};

	if (tokenCookie && userCookie) {
		payload.user = JSON.parse(userCookie);
		payload.token = tokenCookie;
	}

	dispatch({
		type: types.SET_DATA_FIRST_TIME,
		payload,
	});

	return {
		status: 'success',
		message: '',
	};
};

export const handleSignOut = async ({ dispatch }) => {
	deleteCookie({
		cookieName: 'user_data',
	});

	deleteCookie({
		cookieName: 'user_token',
	});

	deleteCookie({
		cookieName: 'user_expiry_deadline',
	});

	new Promise((resolve, reject) => {
		const handleDeleteCookie = () => {
			if (
				checkCookie({
					cookieName: 'user_data',
					cookieString: document.cookie,
				}) ||
				checkCookie({
					cookieName: 'user_token',
					cookieString: document.cookie,
				}) ||
				checkCookie({
					cookieName: 'user_expiry_deadline',
					cookieString: document.cookie,
				})
			) {
				deleteCookie({
					cookieName: 'user_data',
				});

				deleteCookie({
					cookieName: 'user_token',
				});

				deleteCookie({
					cookieName: 'user_expiry_deadline',
				});

				new Promise((resolve, reject) => {
					setTimeout(() => {
						resolve();
					}, 1000);
				});
			}
		};

		handleDeleteCookie();

		if (
			checkCookie({
				cookieName: 'user_data',
				cookieString: document.cookie,
			}) ||
			checkCookie({
				cookieName: 'user_token',
				cookieString: document.cookie,
			}) ||
			checkCookie({
				cookieName: 'user_expiry_deadline',
				cookieString: document.cookie,
			})
		) {
			setTimeout(() => {
				handleDeleteCookie();
				resolve();
			}, 2000);
		} else {
			resolve();
		}
	});

	dispatch({
		type: types.RESET_DATA,
		// payload: {},
	});
};

export const handleSignUp = async ({ dispatch, data }) => {
	return await handleUserSign({
		dispatch,
		path: '/api/v1/auth/signup',
		bodyObj: data,
	});
};
export const handleSignIn = async ({ dispatch, data }) =>
	await handleUserSign({
		dispatch,
		path: '/api/v1/auth/signin',
		bodyObj: data,
	});

export const handleUpdateUserData = async ({
	dispatch,
	userData,
	values = {},
	password,
	token,
}) => {
	const bodyObj = {
		targets: values,
	};

	if (password) bodyObj.password = password;

	const userResult = await fetch('/api/v1/users/user', {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json',
			authorization: token ? `Bearer ${token}` : undefined,
		},
		body: JSON.stringify(bodyObj),
	})
		.then((response) => response.json())
		.catch((error) => {
			console.error(error.message);
			return { status: 'error', message: error.message };
		});

	if (
		userResult?.status === 'error' ||
		Object.keys(userResult.data).length === 0
	) {
		return {
			status: 'error',
			message: userResult.message,
		};
	}

	const user_expiry_deadline = getCookie({
		cookieName: 'user_expiry_deadline',
		cookieString: document.cookie,
	});

	const user_data = {
		...userData,
		...userResult.data,
	};

	setCookie({
		cookieName: 'user_data',
		cookieValue: JSON.stringify(user_data),
		expiresDate: new Date(parseInt(user_expiry_deadline)),
		// domain: process.env.FRONT_END_DOMAIN,
		path: '/',
	});

	dispatch({
		type: types.UPDATE_DATA,
		payload: { updatedData: userResult.data },
	});

	return {
		status: userResult.status,
		message: userResult.message,
	};
};

export const handleUpdateUserPassword = async ({ bodyObj, token }) => {
	const userResult = await fetch('/api/v1/users/user', {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json',
			authorization: token ? `Bearer ${token}` : undefined,
		},
		body: JSON.stringify(bodyObj),
	})
		.then((response) => response.json())
		.catch((error) => {
			console.error(error.message);
			return { status: 'error', message: error.message };
		});

	if (userResult?.status === 'error' || Object.keys(data).length === 0) {
		return {
			status: 'error',
			message: userResult.message,
		};
	}

	return {
		status: 'success',
		message: 'Password changed successfully!',
	};
};

export const handleUpdateUserDataToTheLatest = async ({ dispatch, token }) => {
	const result = await fetch(`/api/v1/users/user/?filter_by_user_id=true`, {
		headers: {
			'Content-Type': 'application/json',
			authorization: token ? `Bearer ${token}` : undefined,
		},
	})
		.then((response) => response.json())
		.catch((error) => {
			console.error(error.message);
			return { status: 'error', message: error.message };
		});

	if (result?.status === 'error' || Object.keys(result.data).length === 0) {
		return {
			status: 'error',
			message: result.message,
		};
	}

	dispatch({
		type: types.UPDATE_DATA_TO_THE_LATEST,
		payload: { latestData: result.data },
	});

	return {
		status: result.status,
		message: result.message,
	};
};
*/
