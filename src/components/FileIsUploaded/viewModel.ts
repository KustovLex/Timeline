import { FileModel, UserModel } from "../../models/ApiModels";
import * as API from "../../API/index";
import { observable, action, runInAction } from "mobx";

export class FileViewModel{
  @observable file: FileModel;
  @observable user: UserModel;

  constructor(file: FileModel){
    this.file = file;

    this.user = new UserModel();
    this.getUser();

    if (this.file.highlighted === undefined) {
      this.file.highlighted = true;
    }
  }

  @action
  getUser = () =>{
    return API.user(this.file.userId).entity().then(data => {
      runInAction(()=>{
        this.user = data as UserModel;
      });
    });
  }
}