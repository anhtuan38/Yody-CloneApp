import { createAction } from "../../helper";

import { REQUEST, COMMENT_ACTION } from "../constants";

export const getCommentListAction = (payload) =>
  createAction(REQUEST(COMMENT_ACTION.GET_COMMENT_LIST), payload);

export const sendCommentAction = (payload) =>
  createAction(REQUEST(COMMENT_ACTION.SEND_COMMENT), payload);
