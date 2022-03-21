// import { getCookie } from '@commonLibIndependent/storage/cookie/document';
// import ls from '@commonLibIndependent/storage/localStorage';
import UserContextConstants from '@coreLib/constants/store/types/userContext';
// import { IUserAuthenticatedData } from '@coreLib/ts/global';
import { IUserContextReducerAction, IUserContextState } from './ts';

const reducer = (
	state: IUserContextState,
	actions: IUserContextReducerAction
) => {
	if (process.env.NODE_ENV !== 'production')
		console.log('actions.type', actions.type);

	switch (actions.type) {
		// case UserContextConstants.INIT_DATA: {
		// 	return {
		// 		...state,
		// 		data: {
		// 			user: ls.get<IUserAuthenticatedData | undefined>('userData', undefined),
		// 			token: getCookie('accessToken'),
		// 		},
		// 	}
		// }

		// INIT_STORE_DATA_PENDING
		// INIT_STORE_DATA_SUCCESS
		// INIT_STORE_DATA_FAIL

		case UserContextConstants.INIT_STORE_DATA_PENDING: {
			return {
				...state,
				actions: {
					...state.actions,
					init: {
						...state.actions.init,
						storeData: {
							errorMessage: '',
							isLoading: true,
							success: false,
						},
					},
				},
			};
		}

		case UserContextConstants.INIT_STORE_DATA_SUCCESS: {
			const { data } = actions.payload;

			return {
				...state,
				data,
				actions: {
					...state.actions,
					init: {
						...state.actions.init,
						storeData: {
							errorMessage: '',
							isLoading: false,
							success: true,
						},
					},
				},
			};
		}

		case UserContextConstants.INIT_STORE_DATA_FAIL: {
			const { errorMessage } = actions.payload;

			return {
				...state,
				actions: {
					...state.actions,
					init: {
						...state.actions.init,
						storeData: {
							errorMessage,
							isLoading: false,
							success: false,
						},
					},
				},
			};
		}

		case UserContextConstants.LOGOUT_REQUEST_RESET:
		case UserContextConstants.SIGNUP_REQUEST_PENDING:
		case UserContextConstants.LOGIN_REQUEST_PENDING: {
			return {
				...state,
				actions: {
					...state.actions,
					requests: {
						...state.actions.requests,
						[actions.type === UserContextConstants.LOGIN_REQUEST_PENDING
							? 'login'
							: actions.type === UserContextConstants.SIGNUP_REQUEST_PENDING
							? 'signup'
							: 'logout']: {
							errorMessage: '',
							isLoading: true,
							success: false,
						},
					},
				},
			};
		}
		case UserContextConstants.SIGNUP_REQUEST_SUCCESS:
		case UserContextConstants.LOGIN_REQUEST_SUCCESS: {
			const { user, token } = actions.payload;
			return {
				...state,
				data: {
					user,
					token,
				},
				actions: {
					...state.actions,
					requests: {
						...state.actions.requests,
						[actions.type === UserContextConstants.LOGIN_REQUEST_SUCCESS
							? 'login'
							: 'signup']: {
							errorMessage: '',
							isLoading: false,
							success: true,
						},
					},
				},
			};
		}
		case UserContextConstants.SIGNUP_REQUEST_FAIL:
		case UserContextConstants.LOGIN_REQUEST_FAIL: {
			const { errorMessage } = actions.payload;

			return {
				...state,
				data: {},
				actions: {
					...state.actions,
					requests: {
						...state.actions.requests,
						[actions.type === UserContextConstants.LOGIN_REQUEST_FAIL
							? 'login'
							: actions.type === UserContextConstants.SIGNUP_REQUEST_FAIL
							? 'signup'
							: 'logout']: {
							errorMessage,
							isLoading: false,
							success: false,
						},
					},
				},
			};
		}
		case UserContextConstants.LOGOUT_REQUEST_RESET:
		case UserContextConstants.SIGNUP_REQUEST_RESET:
		case UserContextConstants.LOGIN_REQUEST_RESET: {
			return {
				...state,
				actions: {
					...state.actions,
					requests: {
						...state.actions.requests,
						[actions.type === UserContextConstants.LOGIN_REQUEST_RESET
							? 'login'
							: actions.type === UserContextConstants.SIGNUP_REQUEST_RESET
							? 'signup'
							: 'logout']: {
							errorMessage: '',
							isLoading: false,
							success: false,
						},
					},
				},
			};
		}

		case UserContextConstants.LOGOUT_REQUEST_SUCCESS: {
			return {
				...state,
				data: {},
				actions: {
					...state.actions,
					requests: {
						...state.actions.requests,
						logout: {
							errorMessage: '',
							isLoading: false,
							success: true,
						},
					},
				},
			};
		}
		case UserContextConstants.LOGOUT_REQUEST_FAIL: {
			const { errorMessage } = actions.payload;

			return {
				...state,
				actions: {
					...state.actions,
					requests: {
						...state.actions.requests,
						logout: {
							errorMessage,
							isLoading: false,
							success: false,
						},
					},
				},
			};
		}

		default:
			return state;
	}
};

export default reducer;
