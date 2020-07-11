import React, { SyntheticEvent } from "react";
import { Grid, List } from "semantic-ui-react";
import { IActivity } from "../../../Models/Activity";
import { ActivityList } from "./ActivityList";
import { ActivityDetails } from "../Details/ActivityDetails";
import { ActivityForm } from "../Form/ActivityForm";

interface IProps {
  activities: IActivity[];
  selectActivity: (id: string) => void;
  selectedActivity: IActivity | null;
  editMode: boolean;
  setEditMode: (editMode: boolean) => void;
  setSelectedActivity: (activity: IActivity | null) => void;
  createActivity: (activity: IActivity) => void;
  editActivity: (activity: IActivity) => void;
  deleteActivity : (event : SyntheticEvent<HTMLButtonElement>,id : string) => void;
  submitting : boolean,
  target : string
  
}

export const ActivityDashboard: React.FC<IProps> = ({
  activities,
  selectActivity,
  selectedActivity,
  setEditMode,
  editMode,
  setSelectedActivity,
  createActivity,
  editActivity,
  deleteActivity,
  submitting,
  target
}) => {
  return (
    <Grid>
      <Grid.Column width={10}>
        <List divided relaxed>
          <ActivityList
            activities={activities}
            selectActivity={selectActivity}
            editMode={editMode}
            setEditMode={setEditMode}
            deleteActivity={deleteActivity}
            submitting = {submitting}
            target={target}
          />
        </List>
      </Grid.Column>
      <Grid.Column width={6}>
        {selectedActivity && !editMode && (
          <ActivityDetails
            activity={selectedActivity!}
            setEditMode={setEditMode}
            setSelectedActivity={setSelectedActivity}
          />
        )}

        {editMode && (
          <ActivityForm
            key={selectedActivity && selectedActivity.id || '0'}
            activity={selectedActivity!}
            setEditMode={setEditMode}
            createActivity={createActivity}
            editActivity ={editActivity}
            submitting = {submitting}
            
          />
        )}
      </Grid.Column>
    </Grid>
  );
};