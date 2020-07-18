import React, { useContext } from "react";
import { Item, Button, Label, Segment, Icon } from "semantic-ui-react";
import { IActivity } from "../../../Models/Activity";
import { Link } from "react-router-dom";
import ActivityStore from "../../../App/Stores/activityStore";

const ActivityItemList: React.FC<{ activity: IActivity }> = ({ activity }) => {
  const activityStore = useContext(ActivityStore);
  const {
    activitiesByDate,
    deleteActivity,
    submitting,
    target,
  } = activityStore;
  const btnStyle = {
    backgroundColor :'rgb(17, 37, 78)',
    color : 'white'
  }
 
  return (
    <Segment.Group>
      <Segment>
        <Item.Group>
          <Item>
            <Item.Image size="tiny" circular src="/assets/user.png" />
            <Item.Content>
              <Item.Header as="a" color="blue">
                {activity.title}
              </Item.Header>
              <Item.Description>Hosted by ashik</Item.Description>
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>
      <Segment>
        <Icon name="clock" />
        {activity.date}
        <Icon name="marker" />
        {activity.city},{activity.venue}
      </Segment>
      <Segment secondary>attendees will go here</Segment>
      <Segment clearing>
        <span>{activity.description}</span>
        <Button
          floated="right"
          content="View"
          style={btnStyle}
          as={Link}
          to={`/activities/${activity.id}`}
        />
      </Segment>
    </Segment.Group>
  );
};

export default ActivityItemList;
