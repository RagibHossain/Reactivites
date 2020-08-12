import React, { useContext, useEffect } from "react";
import { Grid, List } from "semantic-ui-react";
import  ActivityList  from "./ActivityList";
import { observer } from "mobx-react-lite";
import LoadingComponent from "../../../App/Layout/LoadingComponent";
import { RootStoreContext } from "../../../App/Stores/rootStore";
 const ActivityDashboard: React.FC = () => {
  const rootStore = useContext(RootStoreContext);
  const {loadActivities,loadingInitial} = rootStore.activityStore;
  useEffect(() => {
    loadActivities();
  }, [loadActivities]);

  if (loadingInitial)
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