import React, {
  useEffect,
  Fragment,
  useContext,
} from "react";
import { Container } from "semantic-ui-react";
import { NavBar } from "../../Features/Nav/NavBar";
import ActivityDashboard from "../../Features/Activities/Dashboard/ActivityDashboard";
import LoadingComponent from "./LoadingComponent";
import ActivityStore from "../Stores/activityStore";
import { observer } from "mobx-react-lite";

const App = () => {
  const activityStore = useContext(ActivityStore);

  useEffect(() => {
    activityStore.loadActivities();
  }, [activityStore]);
  if (activityStore.loadingInitial)
    return <LoadingComponent content="activities loading" />;
  return (
    <Fragment>
      <NavBar />
      <Container style={{ marginTop: "7em" }}>
        <ActivityDashboard />
      </Container>
    </Fragment>
  );
};

export default observer(App);
