import { REQUEST, SUCCESS, FAIL, COMMENT_ACTION } from "../constants";

const initialState = {
  commentList: {
    data: [],
    loading: false,
    errors: null,
  },
  sendCommentData: {
    data: null,
    loading: false,
    errors: null,
  },
};

function reducer(state = initialState, { type, payload }) {
  switch (type) {
    case REQUEST(COMMENT_ACTION.GET_COMMENT_LIST):
      return {
        ...state,
        commentList: {
          loading: true,
        },
      };

    case SUCCESS(COMMENT_ACTION.GET_COMMENT_LIST):
      const { data } = payload;
      return {
        ...state,
        commentList: {
          data,
          loading: false,
          errors: null,
        },
      };
    case FAIL(COMMENT_ACTION.GET_COMMENT_LIST):
      return {
        ...state,
        commentList: {
          ...state.commentList,
          loading: false,
        },
      };

    case REQUEST(COMMENT_ACTION.SEND_COMMENT):
      return {
        ...state,
        sendCommentData: {
          ...state.sendCommentData,
          loading: true,
        },
      };
    case FAIL(COMMENT_ACTION.SEND_COMMENT):
      const { errors } = payload;
      return {
        ...state,
        commentList: {
          ...state.commentList,
          loading: false,
          errors,
        },
      };
    default:
      return state;
  }
}
export { initialState };
export default reducer;
