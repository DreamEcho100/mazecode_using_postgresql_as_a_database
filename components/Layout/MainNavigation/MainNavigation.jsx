import { useContext, useEffect } from 'react';

import MainNavigationClasses from './MainNavigation.module.css';

import { setDataFirstTime, handleSignOut } from '@store/UserContext/actions';
import { useUserSharedState } from '@store/UserContext';

import NavOnBigScreens from './NavOnBigScreens/NavOnBigScreens';
import NavOnSmallScreens from './NavOnSmallScreens/NavOnSmallScreens';

const MainNavigation = () => {
	const [userState, userDispatch] = useUserSharedState();

	useEffect(() => setDataFirstTime({ dispatch: userDispatch }), []);

	return (
		<header className={MainNavigationClasses.header}>
			<NavOnBigScreens
				user={userState.user}
				isVerifyingUserLoading={userState.isVerifyingUserLoading}
				handleSignOut={() => handleSignOut({ dispatch: userDispatch })}
			/>
			<NavOnSmallScreens
				user={userState.user}
				isVerifyingUserLoading={userState.isVerifyingUserLoading}
				handleSignOut={() => handleSignOut({ dispatch: userDispatch })}
			/>
		</header>
	);
};

export default MainNavigation;
