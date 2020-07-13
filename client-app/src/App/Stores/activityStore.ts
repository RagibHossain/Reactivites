import { IActivity } from "../../Models/Activity";

import { observable, action, computed,configure,runInAction} from "mobx";
import Agent from "../../Api/Agent";
import { createContext, SyntheticEvent } from "react";

configure({enforceActions : 'always'});

class ActivityStore {
  @observable activityRegistry = new Map();
  @observable activities: IActivity[] = [];
  @observable loadingInitial = false;
  @observable selectedActivity: IActivity | undefined;
  @observable editMode = false;
  @observable submitting = false;
  @observable target = '';
  @computed get activitiesByDate() {
    return Array.from(this.activityRegistry.values()).sort((a,b) => Date.parse(a.date) - Date.parse(b.date))
  }
  @action createActivity = async (activity : IActivity) => {
   this.submitting = true ;
    try{
      await Agent.Activities.Create(activity);
      runInAction('create activity',() => {
        this.activityRegistry.set(activity.id,activity);
      this.editMode = false;
      this.submitting = false;
      this.selectedActivity = activity
      }) 
      
    } catch(error)
    { 
      runInAction('create activity error',() => {
        this.submitting = false;
      })
    
      console.log(error)
    } 
  }

  @action editActivity = async (activity : IActivity) => {
    this.submitting = true;

    try{
    await Agent.Activities.Edit(activity) ;
    runInAction('edit activity',() => {
      this.activityRegistry.set(activity.id,activity);
    this.editMode = false;
    this.submitting = false;
    this.selectedActivity = activity;
    })
    

    } catch (error)
    {
      runInAction('edit activity',() => {
        this.submitting = false;
      })
        console.log(error);
    }
  }
@action deleteActivity = async (event : SyntheticEvent<HTMLButtonElement>,id : string) => {
    this.submitting = true ;
    this.target = event.currentTarget.name ;
    try{
    await  Agent.Activities.Delete(id) ;
    runInAction('delete activity',() => {
      this.activityRegistry.delete(id);
      this.submitting = false;
      this.target = ''
    })

    }catch (error)
    {
      runInAction('delete activity error',() => {
        this.submitting = false;
      })
      console.log(error);
    }
}

  @action openEditForm = (activity : IActivity) =>{
    this.editMode = true ;
    this.selectedActivity = activity;
  }
  @action cancelForm = () => {
    this.editMode = false;
  }
  @action cancelDisplay = () => {
    this.selectedActivity = undefined;
  }
  @action openCreateForm = () => {
    this.editMode  = true;
    this.selectedActivity = undefined;
  }
  @action loadActivities = async () => {
    this.loadingInitial = true;
    try {
      const activities = await Agent.Activities.List();
      runInAction('load activities',() => {
        activities.forEach((activity) => {
          activity.date = activity.date.split(".")[0];
          this.activityRegistry.set(activity.id,activity);
            
        this.loadingInitial = false;
        });

      })
     
    } catch (error) {
      console.log(error);
      runInAction('load activities error',() => {
        this.loadingInitial = false;
      })

    } 
  };
  @action selectActivity = (id: string) => {
    this.selectedActivity =  this.activityRegistry.get(id)
    this.editMode = false;
  };
}

export default createContext(new ActivityStore());
