export interface getVideoResponseDto {
  code: number;
  message: string;
  request_id: string;
  data: {
    cursor: number;
    has_more: boolean;
    videos: tikTokVideo[];
  };
}

export interface tikTokVideo {
  audience_countries?: string[];
  average_time_watched?: number;
  caption: string;
  comments?: number;
  create_time: string; // looks like a Unix timestamp, but returned as string
  embed_url: string;
  full_video_watched_rate?: number;
  impression_sources?: tikTokImpressionSource[];
  item_id: string;
  likes?: number;
  reach?: number;
  share_url: string;
  shares?: number;
  thumbnail_url: string;
  total_time_watched?: number;
  video_duration?: number;
  video_views?: number;
}

export interface tikTokImpressionSource {
  impression_source: string;
  percentage: number;
}