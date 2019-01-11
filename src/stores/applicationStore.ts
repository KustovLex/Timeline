import { ActivityModel } from "../models/ApiModels";
import { observable, action, runInAction } from "mobx";
import * as API from "../API/index";
import React from "react";
import { detectVisibility } from "./detectVisibility";
import * as _ from "lodash";

export class ApplicationStore{
  @observable activities: ActivityModel[];
  @observable isLoadingActivities: boolean;
  ids: number = 1;

  constructor() {
    this.activities = new Array<ActivityModel>();
  }

  @action
  getActivities = () => {
    if(!this.isLoadingActivities){
      this.isLoadingActivities = true;
      return API.timeline.getActivities().then(data => {
        runInAction(()=>{
          const newActivities = data as ActivityModel[];
          newActivities.forEach(a => (a.idNew = _.uniqueId("id_")));
          this.activities.push(...newActivities);
          this.isLoadingActivities = false;
        });
      });
    }
  };

  trackScrolling = () => {
    if ((window.innerHeight + window.pageYOffset) == document.body.offsetHeight){
      this.getActivities();
    }
    
    detectVisibility(this);
  };

}