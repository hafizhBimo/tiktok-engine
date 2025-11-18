export type typeInteractionDirection = 'INBOUND' | 'OUTBOUND';

export interface fileAttachmentObjI {
  url: string;
  caption?: string;
}

export interface participantObjI {
  id?: string;
  username?: string;
  name?: string;
  alias?: string;
  user_id?: number;
  avatar?: string;
}

export interface locationsObjI {
  latitude: number;
  longitude: number;
}

export interface messageContentHeaderI {
  type?: string; //'audio' | 'videos' | 'images' | 'document' | 'location';
  audio?: fileAttachmentObjI[];
  videos?: fileAttachmentObjI[];
  images?: fileAttachmentObjI[];
  document?: fileAttachmentObjI[];
  location?: locationsObjI[];
  information?: any;
}

export interface messageContentI {
  header?: messageContentHeaderI; // header content
  body?: any; // body content
  footer?: any; // footer content
  other?: any; // other optional
}

export interface messagePayloadI {
  key?: string; // key redis key: 'id'
  session_id?: string; // room_id socket
  id: string; // id interaction
  platform: string; // ex: Whatsapp etc
  channel: string; // account ex: phincon.academy etc
  timestamp: string; // date sended
  type: string; // comment / review'
  is_read?: number;
  content: messageContentI;
  interaction_direction: typeInteractionDirection;
  participant?: string;
  from: participantObjI; // id sender
  to: participantObjI;
  context?: object;
  org_id?: number;
  status_message?: string;
  chat_id?: string;
  id_interaction?: number;
  is_deleted?: boolean;
  deleted_by?: string;
  is_failed?: boolean;
  additional_message?: any
}