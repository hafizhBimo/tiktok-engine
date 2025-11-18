type typeOfEvent = "CREATE" | "EDIT" | "PRIVACY_CHANGE"
type mentionType = "COMMENT" | "VIDEO_MENTION"

export interface mentionContentResponseDto {
    type_of_event: typeOfEvent,
    mention_type: mentionType,
    video_id: string,
    video_create_time: number,
    open_id_of_mentioned_user: string,
    unique_name_of_mentioned_user: string,
    unique_identifier: string,
    share_url: string,
    video_caption: string,
    comment_id: string,
}