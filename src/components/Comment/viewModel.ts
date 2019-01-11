import { CommentModel, UserModel, FileModel } from "../../models/ApiModels";
import * as API from "../../API/index";
import { observable, action, runInAction } from "mobx";

export class CommentViewModel{
  @observable comment: CommentModel;
  @observable user: UserModel;
  @observable file: FileModel;
  timer: any;

  constructor(comment: CommentModel){
    this.comment = comment;

    this.file = new FileModel();
    this.user = new UserModel();

    this.getData();

    if(this.comment.highlighted === undefined){
      this.comment.highlighted = true;
    }
  }

  @action
  getData = () =>{
    Promise.all([this.getUser(),this.getFile()]).then(data =>{
      runInAction(()=>{
        this.user = data[0] as UserModel;
        this.file = data[1] as FileModel;
      })
    });
  }

  getUser = () => {
    return API.user(this.comment.userId).entity();
  }

  getFile = () => {
    return API.file(this.comment.fileId).entity();
  }
}