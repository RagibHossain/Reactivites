import React, { useContext, useEffect } from "react";
import { Grid, List } from "semantic-ui-react";
import  ActivityList  from "./ActivityList";
import { observer } from "mobx-react-lite";
import LoadingComponent from "../../../App/Layout/LoadingComponent";
import ActivityStore from "../../../App/Stores/activityStore"
 const ActivityDashboard: React.FC = () => {
  const activityStore = useContext(ActivityStore);

  useEffect(() => {
    activityStore.loadActivities();
  }, [activityStore]);

  if (activityStore.loadingInitial)
    return <LoadingComponent content="activities loading" />;

  return (
    <Grid>
      <Grid.Column width={10}>
        <List divided relaxed>
          <ActivityList
          />
        </List>
      </Grid.Column>
      <Grid.Column width={6}>          
      </Grid.Column>
    </Grid>
  );
};
export default observer(ActivityDashboard);