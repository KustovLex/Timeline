export class ProjectModel {
  id: number;
  title: string;
}

export class UserModel {
  id: number;
  name: string;
  avatar: string;
}

export class ActivityModel {
  idNew?: string;
  highlighted?: boolean;
  timer?: any;
  id: number;
  userId: number;
	type: 'comment' | 'file';
  date: Date;
}

export class FileModel extends ActivityModel {
  projectId: number;
  name: string;
}

export class CommentModel extends ActivityModel {
	text: string;
	fileId: number;
	projectId: number;
}
