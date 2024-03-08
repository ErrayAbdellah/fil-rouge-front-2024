import { UserDTO } from "./user-dto.model";

export interface Post {
    id: number;
    typePost: string;
    urlContent?: string;
    content: string;
    likes: { id: number; userId: number }[];
    comments: {
      id: number;
      content: string;
      urlContent?: string;
      postId: number;
      userId: number;
    }[];
    user:UserDTO;
  }

  export interface CreatePost {
    content: string;
    urlContent: string;
    typePost: string;
    user:{id: number};
  }