import React, { useContext, Fragment } from "react";
import { Item, Label } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import ActivityStore from "../../../App/Stores/activityStore";
import ActivityItemList from "./ActivityItemList";

const ActivityList: React.FC = () => {
  const activityStore = useContext(ActivityStore);
  const {
    activitiesByDate,
  } = activityStore;
  const labelStyle = {
    backgroundColor : ' rgb(38, 70, 141)',
    color : 'white'
  }
  return (
    <Fragment>
      {activitiesByDate.map(([group, activities]) => (
        <Fragment key={group}>
          <Label style={labelStyle} size="large" >
            {group}
          </Label>
 
            <Item.Group divided>
              {activities.map((activity) => (
                <ActivityItemList key={activity.id} activity={activity} />
              ))}
            </Item.Group>

      
        </Fragment>
      ))}
    </Fragment>
  );
};
export default observer(ActivityList);
