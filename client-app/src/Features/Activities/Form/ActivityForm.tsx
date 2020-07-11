import React, { useState } from "react";
import { Form, Button } from "semantic-ui-react";
import { IActivity } from "../../../Models/Activity";
import {v4 as uuid} from 'uuid'

interface IProps {
  setEditMode: (editMode: boolean) => void;
  activity: IActivity;
  createActivity: (activity: IActivity) => void;
  editActivity: (activity: IActivity) => void;
  submitting : boolean
}
export const ActivityForm: React.FC<IProps> = ({
  setEditMode,
  activity: initializeFormState,
  createActivity,
  editActivity,
  submitting
}) => {
  const initializeForm = () => {
    if (initializeFormState) return initializeFormState;
    else {
      return {
        id: "",
        title: "",
        category: "",
        description: "",
        date: "",
        city: "",
        venue: "",
      };
    }
  };
  const handleSubmit = () => {
      if(activity.id.length === 0) {
        let newActivity = {
          ...activity,
         id : uuid()
        }
        createActivity(newActivity)
      }
      else {
        editActivity(activity)
      }
  }
  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setActivity({ ...activity, [name]: value });
  };
  const [activity, setActivity] = useState<IActivity>(initializeForm);

  return (
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
      <Button loading={submitting} type="submit" content="Submit" color="facebook" />
      <Button
        onClick={() => setEditMode(false)}
        type="button"
        content="Cancel"
        color="black"
      />
    </Form>
  );
};