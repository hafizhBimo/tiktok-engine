type commentStatus = 'HIDDEN' | 'PUBLIC'

export interface GetCommentByIdResponseDto {
    code: number;
    message: string;
    request_id: string;
    data: {
        comments: [{
            comment_id?: string;
            video_id?: string;
            user_id?: string; //to be deprecated
            unique_identifier?: string;
            create_time?: string;
            text?: string;
            likes?: number;
            replies?: number;
            owner?: boolean;
            liked?: boolean;
            pinned?: boolean;
            status?: commentStatus;
            username?: string;
            display_name?: string;
            profile_image?: string;
            parent_comment_id?: string;
            reply_list?: any[];


        }],
        has_more?: boolean;
        cursor?: string;
    }
}