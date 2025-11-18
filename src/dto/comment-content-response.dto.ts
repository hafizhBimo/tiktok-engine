type commentType = 'reply' | 'comment'

type commentAction = 'insert' | 'delete' | 'set_to_hidden' | 'set_to_public' | 'set_to_friends_only'

export interface commentContentResponseDto {
    comment_id: string,
    video_id: string,
    parent_comment_id: string,
    comment_type: commentType,
    comment_action: commentAction,
    timestamp: number,
    unique_identifier:string
}