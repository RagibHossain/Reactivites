import React, { useState, useContext, useEffect } from "react";
import { Form, Button, Grid } from "semantic-ui-react";
import { IActivity } from "../../../Models/Activity";
import { v4 as uuid } from "uuid";
import { observer } from "mobx-react-lite";
import ActivityStore from "../../../App/Stores/activityStore";
import { RouteComponentProps } from "react-router-dom";
interface DetailParams {
  id: string;
}
const ActivityForm: React.FC<RouteComponentProps<DetailParams>> = ({
  match,
  history
}) => {
  const handleSubmit = () => {
    if (activity.id.length === 0) {
      let newActivity = {
        ...activity,
        id: uuid(),
      };
      createActivity(newActivity).then(() => history.push(`/activities/${newActivity.id}`) );
    } else {
      editActivity(activity).then(() => history.push(`/activities/${activity.id}`) );
    }
  };
  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setActivity({ ...activity, [name]: value });
  };

  const [activity, setActivity] = useState<IActivity>({
    id: "",
    title: "",
    category: "",
    description: "",
    date: "",
    city: "",
    venue: "",
  });
  const activityStore = useContext(ActivityStore);
  const {
    submitting,
    createActivity,
    editActivity,
    selectedActivity: initializeFormState,
    loadActivity,
    clearActivity
  } = activityStore;
  useEffect(() => {
    if(match.params.id && activity.id.length === 0)
    {
      loadActivity(match.params.id).then(() => {
        initializeFormState && setActivity(initializeFormState)
      })
    }

    return (() => {
      clearActivity()
    })
    
  },[loadActivity,clearActivity,initializeFormState,match.params.id,activity.id.length]);

  return (
    <Grid>
      <Grid.Column width={10}>
      <Form onSubmit={handleSubmit}>
      <Form.Input
        onChange={handleChange}
        placeholder="Title"
        value={activity.title}
        name="title"
      />
      <Form.TextArea
        onChange={handleChange}
        rows={3}
        placeholder="Description"
        value={activity.description}
        name="description"
      />
      <Form.Input
        type="datetime-local"
        placeholder="Date"
        value={activity.date}
        name="date"
        onChange={handleChange}
      />
      <Form.Input
        placeholder="City"
        value={activity.city}
        name="city"
        onChange={handleChange}
      />
      <Form.Input
        placeholder="Venue"
        value={activity.venue}
        name="venue"
        onChange={handleChange}
      />
      <Form.Input
        placeholder="Category"
        value={activity.category}
        name="category"
        onChange={handleChange}
      />
      <Button
        loading={submitting}
        type="submit"
        content="Submit"
        color="facebook"
      />
      <Button
        onClick={() => history.push('/activities')}
        type="button"
        content="Cancel"
        color="black"
      />
    </Form>
      </Grid.Column>
    </Grid>
   
  );
};
export default observer(ActivityForm);
