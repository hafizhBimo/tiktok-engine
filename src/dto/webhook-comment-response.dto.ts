export interface WebhookCommentResponseDto {
  client_key: string,
  event: string,
  create_time: number,
  user_openid: string,
  content: string
}