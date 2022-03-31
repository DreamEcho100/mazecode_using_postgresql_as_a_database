enum NewsItemContextConstants {
	INIT_GET_COMMENTS_PENDING = 'INIT_NEWS_ITEM_GET_COMMENTS_PENDING',
	INIT_GET_COMMENTS_SUCCESS = 'INIT_NEWS_ITEM_GET_COMMENTS_SUCCESS',
	INIT_GET_COMMENTS_FAIL = 'INIT_NEWS_ITEM_GET_COMMENTS_FAIL',

	GET_MORE_MAIN_COMMENTS_PENDING = 'NEWS_ITEM_GET_MORE_MAIN_COMMENTS_PENDING',
	GET_MORE_MAIN_COMMENTS_SUCCESS = 'NEWS_ITEM_GET_MORE_MAIN_COMMENTS_SUCCESS',
	GET_MORE_MAIN_COMMENTS_FAIL = 'NEWS_ITEM_GET_MORE_MAIN_COMMENTS_FAIL',

	ADD_REPLIES_TO_COMMENT_MAIN = 'ADD_REPLIES_TO_COMMENT_MAIN',
	ADD_NEW_COMMENT_TYPE_MAIN_OR_MAIN_REPLY = 'ADD_NEW_COMMENT_TYPE_MAIN_OR_MAIN_REPLY',
	UPDATE_MAIN_OR_MAIN_REPLY_COMMENT = 'NEWS_ITEM_UPDATE_MAIN_OR_MAIN_REPLY_COMMENT',

	CREATE_MAIN_OR_MAIN_REPLY_COMMENT_PENDING = 'NEWS_ITEM_CREATE_MAIN_OR_MAIN_REPLY_COMMENT_PENDING',
	CREATE_MAIN_OR_MAIN_REPLY_COMMENT_SUCCESS = 'NEWS_ITEM_CREATE_MAIN_OR_MAIN_REPLY_COMMENT_SUCCESS',
	CREATE_MAIN_OR_MAIN_REPLY_COMMENT_FAIL = 'NEWS_ITEM_CREATE_MAIN_OR_MAIN_REPLY_COMMENT_FAIL',

	UPDATE_MAIN_OR_MAIN_REPLY_COMMENT_PENDING = 'NEWS_ITEM_UPDATE_MAIN_OR_MAIN_REPLY_COMMENT_PENDING',
	UPDATE_MAIN_OR_MAIN_REPLY_COMMENT_SUCCESS = 'NEWS_ITEM_UPDATE_MAIN_OR_MAIN_REPLY_COMMENT_SUCCESS',
	UPDATE_MAIN_OR_MAIN_REPLY_COMMENT_FAIL = 'NEWS_ITEM_UPDATE_MAIN_OR_MAIN_REPLY_COMMENT_FAIL',

	INIT_TYPE_BLOG_DETAILS_TYPE_CONTENT_CONTENT_PENDING = 'INIT_GET_NEWS_ITEM_TYPE_BLOG_DETAILS_TYPE_CONTENT_CONTENT_PENDING',
	INIT_TYPE_BLOG_DETAILS_TYPE_CONTENT_CONTENT_SUCCESS = 'INIT_GET_NEWS_ITEM_TYPE_BLOG_DETAILS_TYPE_CONTENT_CONTENT_SUCCESS',
	INIT_TYPE_BLOG_DETAILS_TYPE_CONTENT_CONTENT_FAIL = 'INIT_GET_NEWS_ITEM_TYPE_BLOG_DETAILS_TYPE_CONTENT_CONTENT_FAIL',

	CREATE_PENDING = 'NEWS_ITEM_CREATE_PENDING',
	CREATE_SUCCESS = 'NEWS_ITEM_CREATE_SUCCESS',
	CREATE_FAIL = 'NEWS_ITEM_CREATE_FAIL',
	CREATE_RESET = 'NEWS_ITEM_CREATE_RESET',

	UPDATE_PENDING = 'NEWS_ITEM_UPDATE_PENDING',
	UPDATE_SUCCESS = 'NEWS_ITEM_UPDATE_SUCCESS',
	UPDATE_FAIL = 'NEWS_ITEM_UPDATE_FAIL',
	UPDATE_RESET = 'NEWS_ITEM_UPDATE_RESET',

	DELETE_PENDING = 'NEWS_ITEM_DELETE_PENDING',
	DELETE_SUCCESS = 'NEWS_ITEM_DELETE_SUCCESS',
	DELETE_FAIL = 'NEWS_ITEM_DELETE_FAIL',
	DELETE_RESET = 'NEWS_ITEM_DELETE_RESET',
}

export default NewsItemContextConstants;
