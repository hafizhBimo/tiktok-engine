export interface getMentionInCommentResponseDto {
    code: number;
    message: string;
    request_id: string;
    data: {
        comment: {
            item_id?: string;
            video_link?: string;
            caption?: string;
            video_likes?: number;
            thumbnail_url?: string;
            commenter_display_name?: string;
            comment_id?: string;
            comment_type?: string;
            comment_text?: string;
            comment_create_time?: number;
            comment_likes?: number;
        },
        cursor?: number;
        has_more?: boolean;
    }
}