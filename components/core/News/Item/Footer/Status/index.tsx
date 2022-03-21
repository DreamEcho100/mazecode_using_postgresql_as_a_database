import { FC } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import classes from './index.module.css';

import { TNewsItemData } from '@coreLib/ts/global';
import { initGetNewsItemCommentsMain } from '@store/NewsContext/actions/comments';
import { useNewsSharedState } from '@store/NewsContext';

interface IProps {
	newsItemData: TNewsItemData;
	isCommentsVisible: boolean;
	handleSetIsCommentsVisible: (isCommentsVisible?: boolean) => void;
}

const Status: FC<IProps> = ({
	isCommentsVisible,
	handleSetIsCommentsVisible,
	newsItemData,
}) => {
	const [
		{
			data: {
				// newsItem: newsItemData,
				// hit_comments_limit,
				// newsItemDetailsType,
				newsExtra: newsExtraData,
			},
			actions: {
				// init: { getMainComments: initGetMainComments },
				items: newsItemsActions,
			},
		},
		newsDispatch,
	] = useNewsSharedState();

	const hit_comments_limit =
		newsExtraData[newsItemData.news_id]?.hit_comments_limit;
	const initGetMainComments =
		newsItemsActions[newsItemData.news_id]?.requests?.init?.getMainComments;

	/*
	const handleInitGetNewsItemCommentsMain = async () => {
		if (
			!initGetMainComments ||
			(!newsItemData.hit_comments_limit &&
				newsItemData.comments &&
				newsItemData.comments.length === 0 &&
				initGetMainComments &&
				!initGetMainComments.success &&
				!initGetMainComments.isLoading &&
				!hit_comments_limit)
		)
			await initGetNewsItemCommentsMain(newsDispatch, {
				news_id: newsItemData.news_id,
				urlOptions: {
					params: {
						news_id: newsItemData.news_id,
					},
					queries: {
						comment_type: 'comment_main',
					},
				},
			});
	};
	*/

	return (
		<section className={classes.status}>
			{/* <div className={`${classes.votes} ${classes['status-item']}`}>
				<button
					title='Up Vote'
					className={`${classes.vote} ${classes['up-vote']}`}
				>
					<FontAwesomeIcon icon={['fas', 'arrow-up']} />{' '}
					{newsItemData.up_votes_counter}
				</button>

				<button
					title='Down Vote'
					className={`${classes.vote} ${classes['down-vote']}`}
				>
					<FontAwesomeIcon icon={['fas', 'arrow-down']} />{' '}
					{newsItemData.down_votes_counter}
				</button>
			</div> */}
			<div
				onClick={() => {
					if (!isCommentsVisible) handleSetIsCommentsVisible();
					// handleInitGetNewsItemCommentsMain();
				}}
				className={`${classes.comments_counter} ${classes['status-item']}`}
			>
				{newsItemData.comments_counter === 0 ? (
					<button title='No Comment'>
						<FontAwesomeIcon icon={['fas', 'comment-slash']} />{' '}
						{newsItemData.comments_counter}
					</button>
				) : newsItemData.comments_counter === 1 ? (
					<button title='1 Comment'>
						<FontAwesomeIcon icon={['fas', 'comment']} />{' '}
						{newsItemData.comments_counter}
					</button>
				) : (
					<button title={`${newsItemData.comments_counter} Comments`}>
						<FontAwesomeIcon icon={['fas', 'comments']} />{' '}
						{newsItemData.comments_counter}
					</button>
				)}{' '}
			</div>
		</section>
	);
};

export default Status;
