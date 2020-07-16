import React, {  Fragment } from "react";
import { Container } from "semantic-ui-react";
import { NavBar } from "../../Features/Nav/NavBar";
import ActivityDashboard from "../../Features/Activities/Dashboard/ActivityDashboard";
import { observer } from "mobx-react-lite";
import { Route, withRouter, RouteComponentProps } from "react-router-dom";
import HomePage from "../../Features/Home/HomePage";
import ActivityForm from "../../Features/Activities/Form/ActivityForm";
import ActivityDetails from "../../Features/Activities/Details/ActivityDetails";

const App: React.FC<RouteComponentProps> = ({ location }) => {

  return (
    <Fragment>
      
      <Route exact path="/" component={HomePage} />
      <Route
        path={"/(.+)"}
        render={() => (
          <Fragment>
            <NavBar />
            <Container style={{ marginTop: "7em" }}>
              <Route exact path="/activities" component={ActivityDashboard} />

              <Route
                key={location.key}
                path={["/createActivity", "/manage/:id"]}
                component={ActivityForm}
              />
              <Route path="/activities/:id" component={ActivityDetails} />
            </Container>
          </Fragment>
        )}
      />
    </Fragment>
  );
};

export default withRouter(observer(App));
