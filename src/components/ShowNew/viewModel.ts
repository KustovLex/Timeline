import * as API from "../../API/index";
import { observable, computed, runInAction, action } from "mobx";
import { ActivityModel } from "../../models/ApiModels";
import { ApplicationStore } from "../../stores/applicationStore";

export class ShowNewViewModel{
  @observable activities: ActivityModel[];
  @computed get count(){ return this.activities.length};
  applicationStore: ApplicationStore;
  subscription: any;

  constructor(applicationStore: ApplicationStore) {
    this.applicationStore = applicationStore;
    this.activities = new Array<ActivityModel>();
  }

  @action
  subscribe =() =>{
    return this.subscription = API.user(3).subscribe(data => {
      runInAction(() => {
        data["idNew"] = this.applicationStore.ids++;
        this.activities.unshift(data);
      });
    });
  }

  unsubscribe = () =>{
    if(this.subscription != undefined){
      this.subscription.unsubscribe();
    }
  }

  @action
  displayNew = () => {
    runInAction(()=>{
      this.applicationStore.activities.unshift(...this.activities);
      this.activities = [];
    });
  }
}