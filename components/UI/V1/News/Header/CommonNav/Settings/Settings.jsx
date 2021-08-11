import { Fragment, useContext, useEffect, useState } from 'react';

import classes from './Settings.module.css';

import NewsContext from '@components/UI/V1/News/NewsContext';

import DropdownMenu from '@components/UI/V1/DropdownMenu';
import UpdateAction from '@components/UI/V1/News/Action/Action';
import DeleteAction from '@components/UI/V1/News/Action/Action';

import SocialMediaShareLink from '@components/UI/V1/SocialMediaShareLink';
import Modal from '@components/UI/V1/Modal';
import Button from '@components/UI/V1/Button';

const ShareModel = ({ data, showShareModel, setShowShareModel }) => {
	let url = `https://${
		'lognmaze.vercel.app' || process.env.FRONT_END_ROOT_URL
	}/`;
	let quote = '';
	let hashtag = [];
	let title = '';
	let summary = '';
	let source = `https://${
		'lognmaze.vercel.app' || process.env.FRONT_END_ROOT_URL
	}`;

	if (data.type === 'article') {
		url += `article/${data.slug}`;
		title = data.title;
		summary = data.description;
		quote = data.description;
		hashtag = data.tags || [];
	} else if (data.type === 'post') {
		url += `post/${data.id}`;
		title = data.content;
		summary = data.content;
		quote = data.content;
		hashtag = [];
	}

	return (
		<Modal
			showModal={showShareModel}
			setShowShareModel={setShowShareModel}
			click={() => setShowShareModel(false)}
			CloseButtonElement={(props) => (
				<Button type='button' {...props}>
					Close
				</Button>
			)}
		>
			<Fragment key='header'>
				<h2>Share In Your Favourite Social Media</h2>
			</Fragment>
			<Fragment key='body'>
				<>
					<button>
						<SocialMediaShareLink
							type='facebook'
							url={url}
							quote={quote}
							hashtag={hashtag}
						>
							Facebook
						</SocialMediaShareLink>
					</button>
					<button>
						<SocialMediaShareLink
							type='linkedin'
							url={url}
							title={title}
							summary={summary}
							source={source}
						>
							Linkedin
						</SocialMediaShareLink>
					</button>
					<button>
						<SocialMediaShareLink type='reddit' url={url} title={title}>
							Reddit
						</SocialMediaShareLink>
					</button>
					<button>
						<SocialMediaShareLink type='telegram' url={url} title={title}>
							Telegram
						</SocialMediaShareLink>
					</button>
					<button>
						<SocialMediaShareLink
							type='tumblr'
							url={url}
							title={title}
							caption={data.description}
							tags={data.tags}
						>
							Tumblr
						</SocialMediaShareLink>
					</button>
					<button>
						<SocialMediaShareLink
							type='twitter'
							url={url}
							text={title}
							hashtags={data.tags}
						>
							Twitter
						</SocialMediaShareLink>
					</button>
					<button>
						<SocialMediaShareLink type='whatsapp' url={url} title={title}>
							Whatsapp
						</SocialMediaShareLink>
					</button>
				</>
			</Fragment>
		</Modal>
	);
};

const Settings = ({
	isDataOwner,
	data,
	setData,
	// setIsLoadingContent,
	// isLoadingContent,
}) => {
	const [items, setItems] = useState([]);

	const [showShareModel, setShowShareModel] = useState(false);

	useEffect(() => {
		if (isDataOwner) {
			setItems([
				{
					className: `${classes['settings-item-for-data-owner']}`,
					props: {
						// setIsLoadingContent,
						// isLoadingContent,
						UpdateAction,
						data,
						setData,
					},
					Element: ({
						UpdateAction,
						data,
						setData,
						// setIsLoadingContent,
						// isLoadingContent,
					}) => {
						const {
							isLoadingContent,
							setIsLoadingContent,
							news,
							setNews,
							...NewsCxt
						} = useContext(NewsContext);

						const [showUpdateNewsModal, setShowUpdateNewsModal] =
							useState(false);

						const [actionNewsData, setActionNewsData] = useState({
							type: data.type,
							action: 'update',
							route: 'update',
							data: news,
							setData: setNews,
						});

						useEffect(() => {
							if (!data.content) setIsLoadingContent(true);
						}, []);

						useEffect(() => {
							if (
								JSON.stringify(news) !== JSON.stringify(actionNewsData.data)
							) {
								setActionNewsData({
									type: data.type,
									action: 'update',
									route: 'update',
									data: news,
									setData: setNews,
								});
							}
						}, [news]);

						return (
							<>
								<button onClick={() => setShowUpdateNewsModal(true)}>
									Edit
								</button>
								<UpdateAction
									showModal={showUpdateNewsModal}
									setShowModal={setShowUpdateNewsModal}
									closeModal={() => setShowUpdateNewsModal(false)}
									news={actionNewsData}
								/>
							</>
						);
					},
				},
				{
					className: `${classes['settings-item-for-data-owner']}`,
					props: {
						DeleteAction,
						data,
						setData,
						// setIsLoadingContent,
						// isLoadingContent,
					},
					Element: ({ DeleteAction, data, setData }) => {
						const {
							isLoadingContent,
							setIsLoadingContent,
							news,
							setNews,
							...NewsCxt
						} = useContext(NewsContext);

						const [showDeleteModal, setShowDeleteModal] = useState(false);

						const [actionNewsData, setActionNewsData] = useState({
							type: data.type,
							action: 'delete',
							isDataOwner,
							data: news,
							setData: setNews,
						});

						useEffect(() => {
							if (!data.content) setIsLoadingContent(true);
						}, []);

						useEffect(() => {
							if (
								JSON.stringify(news) !== JSON.stringify(actionNewsData.data)
							) {
								setActionNewsData({
									type: data.type,
									action: 'delete',
									isDataOwner,
									data: news,
									setData: setNews,
								});
							}
						}, [news]);

						return (
							<>
								<button onClick={() => setShowDeleteModal(true)}>Delete</button>
								<DeleteAction
									showModal={showDeleteModal}
									setShowModal={setShowDeleteModal}
									closeModal={() => setShowDeleteModal(false)}
									news={actionNewsData}
								/>
							</>
						);
					},
				},
				{
					props: {
						setShowShareModel,
					},
					Element: () => (
						<button onClick={() => setShowShareModel(true)}>Share News</button>
					),
				},
			]);
		} else {
			setItems([
				{
					props: {
						setShowShareModel,
					},
					Element: () => (
						<button onClick={() => setShowShareModel(true)}>Share News</button>
					),
				},
			]);
		}
	}, [isDataOwner]);

	return (
		<>
			<DropdownMenu items={items} />
			{showShareModel && (
				<ShareModel
					data={data}
					setShowShareModel={setShowShareModel}
					showShareModel={showShareModel}
					setShowShareModel={setShowShareModel}
				/>
			)}
		</>
	);
};

export default Settings;
