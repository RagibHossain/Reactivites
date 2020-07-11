import React, { SyntheticEvent } from "react";
import { Item, Button, Segment, Label } from "semantic-ui-react";
import { IActivity } from "../../../Models/Activity";

interface IProps {
  activities: IActivity[];
  selectActivity: (id: string) => void;
  editMode: boolean;
  setEditMode: (editMode: boolean) => void;
  deleteActivity: (event : SyntheticEvent<HTMLButtonElement>,id: string) => void;
  submitting: boolean;
  target : string
}
export const ActivityList: React.FC<IProps> = ({
  activities,
  selectActivity,
  setEditMode,
  editMode,
  deleteActivity,
  submitting,
  target
}) => {
  return (
    <Segment>
      <Item.Group divided>
        {activities.map((activity) => (
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
                    editMode && setEditMode(false);
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
