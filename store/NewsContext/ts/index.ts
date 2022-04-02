import {
	TNewsItemData,
	TNewsItemCommentsMain,
	INewsItemTypeBlogContent,
	TNewsData,
	TNewsItemCommentMainReplies,
	TNewsItemCommentBasicData,
	TNewsItemCommentTypeReplyMain,
	TNewsItemCommentTypeMain,
	IUserBasicData,
	// INewsItemTypeBlogBasicData,
	// INewsItemTypePostBasicData,
} from '@coreLib/ts/global';

import { IGetNewsItemCommentsReqArgs } from '@coreLib/networkReqArgs/_app/news/[news_id]/comments/ts';
import { ICreateNewsItemReqArgs } from '@coreLib/networkReqArgs/_app/news/ts';

import NewsItemContextConstants from '@coreLib/constants/store/types/NewsContext/Item';
import { IGetNewsItemBlogContentReqArgs } from '@coreLib/networkReqArgs/_app/news/[news_id]/blog/content/ts';
import NewsContextConstants from '@coreLib/constants/store/types/NewsContext';
import { IGetNewsReqArgs } from '@coreLib/networkReqArgs/_app/news/ts';
import {
	IDeleteNewsItemReqArgs,
	IUpdateNewsItemReqArgs,
} from '@coreLib/networkReqArgs/_app/news/[news_id]/ts';
// import { IUpdateNewsItemCommentReqArgs } from '@coreLib/networkReqArgs/_app/news/[news_id]/comments/[comment_id]/ts';

export type INewsContextStateData = {
	news: TNewsData;
	newsExtra: {
		[key: string]: {
			hit_comments_limit?: boolean;
			newsItemDetailsType?: 'content' | 'description';
			newsItemModelDetailsType?: 'content' | 'description';
		};
	};
	hit_news_items_limit: boolean;
};

export interface INewsContextState {
	data: INewsContextStateData;
	actions: {
		items: {
			[key: string]: {
				priorityForHeaderImage?: boolean;
				requests?: {
					init?: {
						getMainComments?: {
							isLoading: boolean;
							error: string;
							success: boolean;
						};
						modal?: {
							getTypeBlogContent?: {
								isLoading: boolean;
								error: string;
								success: boolean;
							};
						};
					};
					getMoreMainComments?: {
						isLoading: boolean;
						error: string;
						success: boolean;
					};
					update?: {
						isLoading: boolean;
						error: string;
						success: boolean;
					};
					delete?: {
						isLoading: boolean;
						error: string;
						success: boolean;
					};
					mainComments?: {
						[key: string]: {
							create?: {
								isLoading: boolean;
								error: string;
								success: boolean;
							};
						};
					};
				};
			};
		};
		requests: {
			getMoreNewsItems?: {
				isLoading: boolean;
				error: string;
				success: boolean;
			};
			create?: {
				isLoading: boolean;
				error: string;
				success: boolean;
			};
		};
	};
}

interface IInitGetNewsItemCommentsMainPending {
	type: NewsItemContextConstants.INIT_GET_COMMENTS_PENDING;
	payload: {
		news_id: TNewsItemData['news_id'];
	};
}
interface IInitGetNewsItemCommentsMainSuccess {
	type: NewsItemContextConstants.INIT_GET_COMMENTS_SUCCESS;
	payload: {
		news_id: TNewsItemData['news_id'];
		commentsMainData: TNewsItemCommentsMain;
		hit_comments_limit: boolean;
	};
}
interface IInitGetNewsItemCommentsMainFail {
	type: NewsItemContextConstants.INIT_GET_COMMENTS_FAIL;
	payload: {
		news_id: TNewsItemData['news_id'];
		error: string;
	};
}

interface IInitGetNewsItemTypeBlogDetailsTypeContentPending {
	type: NewsItemContextConstants.INIT_TYPE_BLOG_DETAILS_TYPE_CONTENT_CONTENT_PENDING;
	payload: {
		news_id: TNewsItemData['news_id'];
	};
}
interface IInitGetNewsItemTypeBlogDetailsTypeContentSuccess {
	type: NewsItemContextConstants.INIT_TYPE_BLOG_DETAILS_TYPE_CONTENT_CONTENT_SUCCESS;
	payload: {
		news_id: TNewsItemData['news_id'];
		newsItemTypeBlogContent: INewsItemTypeBlogContent;
	};
}
interface IInitGetNewsItemTypeBlogDetailsTypeContentFail {
	type: NewsItemContextConstants.INIT_TYPE_BLOG_DETAILS_TYPE_CONTENT_CONTENT_FAIL;
	payload: {
		news_id: TNewsItemData['news_id'];
		error: string;
	};
}

interface IGetMoreNewsItemsPending {
	type: NewsContextConstants.GET_MORE_ITEMS_PENDING;
}
interface IGetMoreNewsItemsSuccess {
	type: NewsContextConstants.GET_MORE_ITEMS_SUCCESS;
	payload: {
		newNewsItems: TNewsData;
		hit_news_items_limit: boolean;
	};
}
interface IGetMoreNewsItemsFail {
	type: NewsContextConstants.GET_MORE_ITEMS_FAIL;
	payload: {
		error: string;
	};
}

interface IGetMoreNewsItemCommentsMainPending {
	type: NewsItemContextConstants.GET_MORE_MAIN_COMMENTS_PENDING;
	payload: {
		news_id: TNewsItemData['news_id'];
	};
}
interface IGetMoreNewsItemCommentsMainSuccess {
	type: NewsItemContextConstants.GET_MORE_MAIN_COMMENTS_SUCCESS;
	payload: {
		news_id: TNewsItemData['news_id'];
		newCommentsMainData: TNewsItemCommentsMain;
		hit_comments_limit: boolean;
	};
}
interface IGetMoreNewsItemCommentsMainFail {
	type: NewsItemContextConstants.GET_MORE_MAIN_COMMENTS_FAIL;
	payload: {
		news_id: TNewsItemData['news_id'];
		error: string;
	};
}
/*
interface IGetMoreNewsItemCommentMainReplyPending {
	type: NewsItemContextConstants.GET_MORE_MAIN_COMMENT_REPLIES_PENDING;
	payload: {
		news_id: TNewsItemData['news_id'];
		parent_id: TNewsItemCommentTypeReplyMain['parent_id'];
	};
}
interface IGetMoreNewsItemCommentMainReplySuccess {
	type: NewsItemContextConstants.GET_MORE_MAIN_COMMENT_REPLIES_SUCCESS;
	payload: {
		news_id: TNewsItemData['news_id'];
		parent_id: TNewsItemCommentTypeReplyMain['parent_id'];
		newCommentMainRepliesData: TNewsItemCommentMainReplies;
		hit_replies_limit: boolean;
	};
}
interface IGetMoreNewsItemCommentMainReplyFail {
	type: NewsItemContextConstants.GET_MORE_MAIN_COMMENT_REPLIES_FAIL;
	payload: {
		news_id: TNewsItemData['news_id'];
		parent_id: TNewsItemCommentTypeReplyMain['parent_id'];
		error: string;
	};
}
*/
interface ICommentTypeMainCommon {
	type: TNewsItemCommentTypeMain['type'];
	news_id: TNewsItemData['news_id'];
	news_comment_id: TNewsItemCommentTypeMain['news_comment_id'];
}
interface ICommentTypeMainReplyCommon {
	type: TNewsItemCommentTypeReplyMain['type'];
	news_id: TNewsItemData['news_id'];
	news_comment_id: TNewsItemCommentTypeReplyMain['news_comment_id'];
	parent_id: TNewsItemCommentTypeReplyMain['parent_id'];
}

interface IAddRepliesToCommentMain {
	type: NewsItemContextConstants.ADD_REPLIES_TO_COMMENT_MAIN;
	payload: {
		news_id: TNewsItemData['news_id'];
		parent_id: TNewsItemCommentTypeReplyMain['parent_id'];
		newCommentMainRepliesData: TNewsItemCommentMainReplies;
		hit_replies_limit: boolean;
	};
}
// Needs Work :|
interface IAddNewCommentTypeMainOrMainReply {
	type: NewsItemContextConstants.ADD_NEW_COMMENT_TYPE_MAIN_OR_MAIN_REPLY;
	payload: (
		| ICommentTypeMainCommon
		| (ICommentTypeMainReplyCommon & {
				reply_to_user_id: TNewsItemCommentTypeReplyMain['reply_to_user_id'];
				reply_to_comment_id?: TNewsItemCommentTypeReplyMain['reply_to_comment_id'];
		  })
	) & {
		// news_comment_id: string;
		content: TNewsItemCommentBasicData['content'];
		author_id: IUserBasicData['id'];
		author_user_name_id: IUserBasicData['user_name_id'];
		author_first_name: IUserBasicData['first_name'];
		author_last_name: IUserBasicData['last_name'];
		author_profile_picture?: IUserBasicData['profile_picture'];
	};
}
interface IUpdateNewsItemMainOrMainReplyComment {
	type: NewsItemContextConstants.UPDATE_MAIN_OR_MAIN_REPLY_COMMENT;
	payload: {
		news_id: TNewsItemData['news_id'];
		newContent: TNewsItemCommentBasicData['content'];
	} & (
		| {
				type: TNewsItemCommentTypeReplyMain['type'];
				news_comment_id: TNewsItemCommentTypeReplyMain['news_comment_id'];
				parent_id: TNewsItemCommentTypeReplyMain['parent_id'];
		  }
		| {
				type: TNewsItemCommentTypeMain['type'];
				news_comment_id: TNewsItemCommentTypeMain['news_comment_id'];
		  }
	);
}

interface IDeleteMainOrReplyComment {
	type: NewsItemContextConstants.DELETE_MAIN_OR_MAIN_REPLY_COMMENT;
	payload: {
		news_comment_id: TNewsItemCommentBasicData['news_comment_id'];
		news_id: TNewsItemData['news_id'];
	} & (
		| { type: TNewsItemCommentTypeMain['type'] }
		| Pick<TNewsItemCommentTypeReplyMain, 'type' | 'parent_id'>
	);
}

interface ICreateNewsItemPending {
	type: NewsItemContextConstants.CREATE_PENDING;
}
interface ICreateNewsItemSuccess {
	type: NewsItemContextConstants.CREATE_SUCCESS;
	payload: {
		// newNewsItemData: ICreateNewsItemReqArgs['bodyContent'];
		// newNewsItemType
		newsItemBasicData: ICreateNewsItemReqArgs['bodyContent']['newsItemBasicData'];
		newNewsItemId: TNewsItemData['news_id'];
		newNewsItemAuthorData: {
			author_id: TNewsItemData['author_id'];
			author_user_name_id: TNewsItemData['author_user_name_id'];
			author_first_name: TNewsItemData['author_first_name'];
			author_last_name: TNewsItemData['author_last_name'];
			author_profile_picture: TNewsItemData['author_profile_picture'];
			author_bio: TNewsItemData['author_bio'];
		};
	};
}
interface ICreateNewsItemFail {
	type: NewsItemContextConstants.CREATE_FAIL;
	payload: {
		error: string;
	};
}
interface ICreateNewsItemReset {
	type: NewsItemContextConstants.CREATE_RESET;
}

interface IUpdateNewsItemPending {
	type: NewsItemContextConstants.UPDATE_PENDING;
	payload: {
		news_id: TNewsItemData['news_id'];
	};
}
interface IUpdateNewsItemSuccess {
	type: NewsItemContextConstants.UPDATE_SUCCESS;
	payload: {
		news_id: TNewsItemData['news_id'];
		dataToUpdate: IUpdateNewsItemReqArgs['bodyContent']['dataToUpdate'];
	};
}
interface IUpdateNewsItemFail {
	type: NewsItemContextConstants.UPDATE_FAIL;
	payload: {
		news_id: TNewsItemData['news_id'];
		error: string;
	};
}
interface IUpdateNewsItemReset {
	type: NewsItemContextConstants.UPDATE_RESET;
	payload: {
		news_id: TNewsItemData['news_id'];
	};
}

interface IDeleteNewsItemPending {
	type: NewsItemContextConstants.DELETE_PENDING;
	payload: {
		news_id: TNewsItemData['news_id'];
	};
}
interface IDeleteNewsItemSuccess {
	type: NewsItemContextConstants.DELETE_SUCCESS;
	payload: {
		news_id: TNewsItemData['news_id'];
	};
}
interface IDeleteNewsItemFail {
	type: NewsItemContextConstants.DELETE_FAIL;
	payload: {
		news_id: TNewsItemData['news_id'];
		error: string;
	};
}
interface IDeleteNewsItemReset {
	type: NewsItemContextConstants.DELETE_RESET;
	payload: {
		news_id: TNewsItemData['news_id'];
	};
}

export type TNewsContextReducerAction =
	| IInitGetNewsItemCommentsMainPending
	| IInitGetNewsItemCommentsMainSuccess
	| IInitGetNewsItemCommentsMainFail
	| IInitGetNewsItemTypeBlogDetailsTypeContentPending
	| IInitGetNewsItemTypeBlogDetailsTypeContentSuccess
	| IInitGetNewsItemTypeBlogDetailsTypeContentFail
	| IGetMoreNewsItemsPending
	| IGetMoreNewsItemsSuccess
	| IGetMoreNewsItemsFail
	//
	| IGetMoreNewsItemCommentsMainPending
	| IGetMoreNewsItemCommentsMainSuccess
	| IGetMoreNewsItemCommentsMainFail
	//
	//
	| IAddRepliesToCommentMain
	| IAddNewCommentTypeMainOrMainReply
	| IUpdateNewsItemMainOrMainReplyComment
	| IDeleteMainOrReplyComment
	//
	//
	| ICreateNewsItemPending
	| ICreateNewsItemSuccess
	| ICreateNewsItemFail
	| ICreateNewsItemReset
	| IUpdateNewsItemPending
	| IUpdateNewsItemSuccess
	| IUpdateNewsItemFail
	| IUpdateNewsItemReset
	| IDeleteNewsItemPending
	| IDeleteNewsItemSuccess
	| IDeleteNewsItemFail
	| IDeleteNewsItemReset;

export type TNewsContextDispatch =
	| React.Dispatch<TNewsContextReducerAction>
	| ((value: TNewsContextReducerAction) => void);

export type TInitGetNewsItemCommentsMain = (
	newsDispatch: TNewsContextDispatch,
	{
		news_id,
		urlOptions,
	}: {
		news_id: TNewsItemData['news_id'];
		urlOptions: IGetNewsItemCommentsReqArgs['urlOptions'];
	}
) => Promise<void>;
export type TInitGetNewsItemTypeBlogContent = (
	newsDispatch: TNewsContextDispatch,
	{
		news_id,
		urlOptions,
	}: {
		news_id: TNewsItemData['news_id'];
		urlOptions: IGetNewsItemBlogContentReqArgs['urlOptions'];
	}
) => Promise<void>;
export type TGetMoreNewsItems = (
	newsDispatch: TNewsContextDispatch,
	{
		urlOptions,
	}: {
		urlOptions: IGetNewsReqArgs['urlOptions'];
	}
) => Promise<void>;
//
export type TGetMoreNewsItemCommentsMain = (
	newsDispatch: TNewsContextDispatch,
	{
		news_id,
		urlOptions,
	}: {
		news_id: TNewsItemData['news_id'];
		urlOptions: IGetNewsItemCommentsReqArgs['urlOptions'];
	}
) => Promise<void>;

//
export type TCreateNewsItem = (
	newsDispatch: TNewsContextDispatch,
	{
		newsItemBasicData,
		newNewsItemAuthorData,
		token,
	}: {
		newsItemBasicData: ICreateNewsItemSuccess['payload']['newsItemBasicData'];
		newNewsItemAuthorData: ICreateNewsItemSuccess['payload']['newNewsItemAuthorData'];
		token?: string;
	}
) => Promise<void>;
export type TResetCreateNewsItemAction = (
	newsDispatch: TNewsContextDispatch
) => void;
export type TUpdateNewsItem = (
	newsDispatch: TNewsContextDispatch,
	{
		bodyContent,
		news_id,
		token,
	}: {
		bodyContent: IUpdateNewsItemReqArgs['bodyContent'];
		news_id: TNewsItemData['news_id'];
		token?: string;
	}
) => Promise<void>;
export type TResetUpdateNewsItemAction = (
	newsDispatch: TNewsContextDispatch,
	{
		news_id,
	}: {
		news_id: TNewsItemData['news_id'];
	}
) => void;
export type TDeleteNewsItem = (
	newsDispatch: TNewsContextDispatch,
	{
		bodyContent,
		news_id,
		token,
	}: {
		bodyContent: IDeleteNewsItemReqArgs['bodyContent'];
		news_id: TNewsItemData['news_id'];
		token?: string;
	}
) => Promise<void>;
export type TResetDeleteNewsItemAction = (
	newsDispatch: TNewsContextDispatch,
	{
		news_id,
	}: {
		news_id: TNewsItemData['news_id'];
	}
) => void;

export type TNewsContextStateReducer = (
	state: INewsContextState, // | undefined,
	actions: TNewsContextReducerAction
) => INewsContextState;
