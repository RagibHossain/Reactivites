import { IActivity } from "../../Models/Activity";
import { observable, action, computed,runInAction } from "mobx";
import Agent from "../../Api/Agent";
import {  SyntheticEvent } from "react";
import { history } from "../..";
import { toast } from "react-toastify";
import { RootStore } from "./rootStore";



export default class ActivityStore {
  rootStore : RootStore;
  
  constructor(rootStore : RootStore){
   this.rootStore = rootStore;
  }
  @observable activityRegistry = new Map();
  @observable loadingInitial = false;
  @observable selectedActivity: IActivity | null = null;
  @observable submitting = false;
  @observable target = "";
  @computed get activitiesByDate() {
    return this.groupActivitiesByDate(
      Array.from(this.activityRegistry.values())
    );
  }

  groupActivitiesByDate(activities: IActivity[]) {
    const sortedActivities = activities.sort(
      (a, b) => a.date!.getTime() - b.date!.getTime()
    );

    return Object.entries(
      sortedActivities.reduce((activities, activity) => {
        const date = activity.date.toISOString().split("T")[0];
        activities[date] = activities[date]
          ? [...activities[date], activity]
          : [activity];
        return activities;
      }, {} as { [key: string]: IActivity[] })
    );
  }
  @action createActivity = async (activity: IActivity) => {
    this.submitting = true;
    try {
      await Agent.Activities.Create(activity);
      runInAction("create activity", () => {
        this.activityRegistry.set(activity.id, activity);
        this.submitting = false;
        this.selectedActivity = activity;
      });
      history.push(`/activities/${activity.id}`);
    } catch (error) {
      runInAction("create activity error", () => {
        this.submitting = false;
      });
      toast.error("Problem Submitting data");
      console.log(error.response);
    }
  };

  @action editActivity = async (activity: IActivity) => {
    this.submitting = true;

    try {
      await Agent.Activities.Edit(activity);
      runInAction("edit activity", () => {
        this.activityRegistry.set(activity.id, activity);
        this.submitting = false;
        this.selectedActivity = activity;
      });
      history.push(`/activities/${activity.id}`);
    } catch (error) {
      runInAction("edit activity", () => {
        this.submitting = false;
      });
      toast.error("Problem Updating data");
      console.log(error.response);
    }
  };
  @action deleteActivity = async (
    event: SyntheticEvent<HTMLButtonElement>,
    id: string
  ) => {
    this.submitting = true;
    this.target = event.currentTarget.name;
    try {
      await Agent.Activities.Delete(id);
      runInAction("delete activity", () => {
        this.activityRegistry.delete(id);
        this.submitting = false;
        this.target = "";
      });
    } catch (error) {
      runInAction("delete activity error", () => {
        this.submitting = false;
      });
      console.log(error);
    }
  };

  @action loadActivities = async () => {
    this.loadingInitial = true;
    try {
      const activities = await Agent.Activities.List();
      runInAction("load activities", () => {
        activities.forEach((activity) => {
          activity.date = new Date(activity.date);
          this.activityRegistry.set(activity.id, activity);

          this.loadingInitial = false;
        });
      
      });
    } catch (error) {
      console.log(error);
      runInAction("load activities error", () => {
        this.loadingInitial = false;
      });
    }
  };

  @action loadActivity = async (id: string) => {
    let activity = this.getActivity(id);

    if (activity) {
      this.selectedActivity = activity;
      return activity;
    } else {
      this.loadingInitial = true;
      try {
        activity = await Agent.Activities.Details(id);

        runInAction("load activity", () => {
          activity.date = new Date(activity.date);
          this.selectedActivity = activity;
          this.activityRegistry.set(activity.id, activity);
          this.loadingInitial = false;
        });
        return activity;
      } catch (error) {
        runInAction("load activity error", () => {
          this.loadingInitial = false;
        });
      }
    }
  };
  @action clearActivity = () => {
    this.selectedActivity = null;
  };
  getActivity = (id: string) => {
    return this.activityRegistry.get(id);
  };
  @action selectActivity = (id: string) => {
    this.selectedActivity = this.activityRegistry.get(id);
  };
}


