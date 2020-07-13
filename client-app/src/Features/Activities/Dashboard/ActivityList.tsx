import React, { useContext } from "react";
import { Item, Button, Segment, Label } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import ActivityStore from '../../../App/Stores/activityStore'

 const ActivityList: React.FC = () => {
  const activityStore = useContext(ActivityStore)
  const {activitiesByDate,selectActivity,deleteActivity,submitting,target} = activityStore
  return (
    <Segment>
      <Item.Group divided>
        {activitiesByDate.map((activity) => (
          <Item key={activity.id}>
            <Item.Content>
              <Item.Header as="a">{activity.title}</Item.Header>
              <Item.Meta>{activity.date}</Item.Meta>
              <Item.Description>
                <div>{activity.description}</div>
                <div>
                  {activity.city}, {activity.venue}
                </div>
              </Item.Description>
              <Item.Extra>
                <Button
                  floated="right"
                  content="View"
                  color="pink"
                  onClick={() => {
                    selectActivity(activity.id);
                  }}
                />
                <Button
                  name={activity.id}
                  loading={target === activity.id && submitting}
                  floated="right"
                  content="Delete"
                  color="violet"
                  onClick={(event) => deleteActivity(event,activity.id)}
                />
                <Label basic content={activity.category} />
              </Item.Extra>
            </Item.Content>
          </Item>
        ))}
      </Item.Group>
    </Segment>
  );
};
export default observer(ActivityList);