export interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

export interface Comment {
  id: number;
  name: string;
  email: string;
  body: string;
  postId: number;
}

export interface Task {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
}
