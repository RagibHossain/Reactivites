import React, { useState, useEffect, Fragment, SyntheticEvent } from "react";
import { Container } from "semantic-ui-react";
import { IActivity } from "../../Models/Activity";
import { NavBar } from "../../Features/Nav/NavBar";
import { ActivityDashboard } from "../../Features/Activities/Dashboard/ActivityDashboard";
import Agent from "../../Api/Agent";
import { LoadingComponent } from "./LoadingComponent";

const App = () => {
  const [activities, setActivities] = useState<IActivity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<IActivity | null>(
    null
  );
  const [editMode, setEditMode] = useState(false);
  const [loading,setLoading] = useState(true);
  const [submitting,setSubmitting] = useState(false);
  const [target,setTarget] = useState('')

  const handleSelectedActivity = (id: string) => {
    setSelectedActivity(activities.filter((i) => i.id === id)[0]);
  };
  const handleCreateActivity = (activity: IActivity) => {
    setSubmitting(true);
    Agent.Activities.Create(activity). then(() => {
     
      setActivities([...activities, activity]);
      setSelectedActivity(activity);
      setEditMode(false);
    }).then(() => setSubmitting(false))
   
  };
  const handleEditActivity = (activity: IActivity) => {
    setSubmitting(true);
    Agent.Activities.Edit(activity).then (() => {
      setActivities([
        ...activities.filter((a) => a.id !== activity.id),
        activity,
      ]);
      setSelectedActivity(activity);
      setEditMode(false);
    }).then(() => setSubmitting(false))
   

  };
  const handleDeleteActivity = (event : SyntheticEvent<HTMLButtonElement>,id : string) => {
    setSubmitting(true)
    setTarget(event.currentTarget.name)
    Agent.Activities.Delete(id).then(() => {
      setActivities(activities.filter((i) => i.id !== id))
    }).then(() => setSubmitting(false))
   
  }
  useEffect(() => {
   Agent.Activities.List()
      .then((response ) => {
        let activities : IActivity[]  =  []
        response.forEach(actvity => {
                 actvity.date = actvity.date.split('.')[0]
                 activities.push(actvity)
        })
        setActivities(response);
      }).then(() => setLoading(false));
  }, []);
    if(loading) return <LoadingComponent content='activities loading' />
  return (
    <Fragment>
      <NavBar
        setEditMode={setEditMode}
        setSelectedActivity={setSelectedActivity}
      />

      <Container style={{ marginTop: "7em" }}>
        <ActivityDashboard
          activities={activities}
          selectActivity={handleSelectedActivity}
          selectedActivity={selectedActivity!}
          editMode={editMode}
          setEditMode={setEditMode}
          setSelectedActivity={setSelectedActivity}
          createActivity={handleCreateActivity}
          editActivity={handleEditActivity}
          deleteActivity={handleDeleteActivity}
          submitting = {submitting}
          target = {target}
        />
      </Container>
    </Fragment>
  );
};

export default App;
