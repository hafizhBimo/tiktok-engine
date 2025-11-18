export interface ReplyCommentResponseDto {
  code: number;
  message: string;
  request_id: string;
  data: ReplyCommentData;
}

export interface ReplyCommentData {
  comment_id: string;
  create_time: string; // Unix timestamp, but returned as string
  parent_comment_id: string;
  text: string;
  unique_identifier: string;
  user_id?: string;
  video_id: string;
}
