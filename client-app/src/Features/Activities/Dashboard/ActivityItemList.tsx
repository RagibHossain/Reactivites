import React, { useContext } from "react";
import { Item, Button, Segment, Icon } from "semantic-ui-react";
import { IActivity } from "../../../Models/Activity";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { RootStoreContext } from "../../../App/Stores/rootStore";
const ActivityItemList: React.FC<{ activity: IActivity }> = ({ activity }) => {
  const btnStyle = {
    backgroundColor: "rgb(17, 37, 78)",
    color: "white",
  };

  const itemStyle = {
    backgroundColor: "#8cacea",
    borderRadius: "50%",
  };
  const rootStore = useContext(RootStoreContext);
  const { user } = rootStore.userStore;
  return (
    <div style={itemStyle}>
      <Segment.Group>
        <Segment>
          <Item.Group>
            <Item>
              <Item.Image size="tiny" circular src="/assets/user.png" />
              <Item.Content>
                <Item.Header as="a" color="blue">
                  {activity.title}
                </Item.Header>
                <Item.Description>
                  Hosted by {user?.displayName}
                </Item.Description>
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
        <Segment>
          <Icon name="clock" />
          {format(activity.date, "hh:m a")}
          <Icon name="marker" />
          {activity.city},{activity.venue}
        </Segment>
        <Segment secondary>attendees will go here</Segment>
        <Segment clearing>
          <span>{activity.description}</span>
          <Button
            className="Item"
            floated="right"
            content="View"
            style={btnStyle}
            as={Link}
            to={`/activities/${activity.id}`}
          />
        </Segment>
      </Segment.Group>
    </div>
  );
};

export default ActivityItemList;
