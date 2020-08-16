import { IActivity } from "../../Models/Activity";
import { observable, action, computed, runInAction } from "mobx";
import Agent from "../../Api/Agent";
import { SyntheticEvent } from "react";
import { history } from "../..";
import { toast } from "react-toastify";
import { RootStore } from "./rootStore";
import { createAttendee } from "../Common/Util/Util";

export default class ActivityStore {
  rootStore: RootStore;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }
  @observable activityRegistry = new Map();
  @observable loadingInitial = false;
  @observable loading = false;
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

      const attendee = createAttendee(this.rootStore.userStore.user!);
      attendee.isHost = true;
      let attendees = [];
      attendees.push(attendee);
      activity.attendees = attendees;
      activity.isHost = true;
      runInAction("create activity", () => {
        this.activityRegistry.set(activity.id, activity);
        this.submitting = false;
        
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
    const user = this.rootStore.userStore.user;
    try {
      const activities = await Agent.Activities.List();
      runInAction("load activities", () => {
        activities.forEach((activity) => {
          activity.date = new Date(activity.date);
          activity.isGoing = activity.attendees.some(
            (x) => x.username === user?.username
          );
          activity.isHost = activity.attendees.some(
            (x) => x.username === user?.username && x.isHost
          );
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
    let activity: IActivity = this.getActivity(id);
    const user = this.rootStore.userStore.user;
    if (activity) {
      this.selectedActivity = activity;
      return activity;
    } else {
      this.loadingInitial = true;
      try {
        activity = await Agent.Activities.Details(id);

        runInAction("load activity", () => {
          activity.date = new Date(activity.date);
          activity.isGoing = activity.attendees.some(
            (x) => x.username === user?.username
          );
          activity.isHost = activity.attendees.some(
            (x) => x.username === user?.username && x.isHost
          );
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

  @action attendActivity = async () => {
    const attendance = createAttendee(this.rootStore.userStore.user!);
    this.loading = true;
    try {
      await Agent.Activities.Attend(this.selectedActivity!.id);
      runInAction(() => {
        if (this.selectedActivity) {
          this.selectedActivity.attendees.push(attendance);
          this.selectedActivity.isGoing = true;
          this.activityRegistry.set(
            this.selectedActivity.id,
            this.selectedActivity
          );
          this.loading = false;
        }
      });
    } catch (error) {
      runInAction(() => {
        this.loading = false;
      });
      toast.error("Problem attending activity");
    }
  };

  @action cancelAttendance = async() => {
    this.loading = true;
    try {
      await Agent.Activities.UnAttend(this.selectedActivity!.id);
      runInAction(() => {
        if (this.selectedActivity) {
          this.selectedActivity.attendees = this.selectedActivity.attendees.filter(
            (a) => a.username !== this.rootStore.userStore.user?.username
          );
          this.selectedActivity.isGoing = false;
          this.activityRegistry.set(
            this.selectedActivity.id,
            this.selectedActivity
          );
          this.loading = false;
        }
      })
    } catch (error) {
      runInAction(() => {
        this.loading = false;
      })
      toast.error("problem canceling attendance");
    }

 
  };
}
