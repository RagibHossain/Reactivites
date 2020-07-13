import React, { useContext } from "react";
import { Grid, List } from "semantic-ui-react";
import  ActivityList  from "./ActivityList";
import  ActivityDetails  from "../Details/ActivityDetails";
import  ActivityForm  from "../Form/ActivityForm";
import { observer } from "mobx-react-lite";
import ActivityStore from "../../../App/Stores/activityStore";

 const ActivityDashboard: React.FC = () => {
  const activityStore = useContext(ActivityStore)
  const {selectedActivity,editMode} = activityStore
  return (
    <Grid>
      <Grid.Column width={10}>
        <List divided relaxed>
          <ActivityList
          />
        </List>
      </Grid.Column>
      <Grid.Column width={6}>
        {selectedActivity && !editMode && (
          <ActivityDetails        
          />
        )}

        {editMode && (
          <ActivityForm
            key={(selectedActivity && selectedActivity.id) || '0'}
            activity={selectedActivity!}     
          />
        )}
      </Grid.Column>
    </Grid>
  );
};
export default observer(ActivityDashboard);