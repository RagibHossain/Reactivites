import React from 'react'
import { Card, Image, Button } from 'semantic-ui-react'
import { IActivity } from '../../../Models/Activity'

interface IProps{
  activity : IActivity,
  setEditMode : (editMode : boolean) => void ,
  setSelectedActivity : (activity : IActivity | null) => void
}
export const ActivityDetails : React.FC<IProps> = ({activity,setEditMode,setSelectedActivity}) => {
    return (
        <Card fluid>
        <Image src={`/assets/categoryImages/${activity.category}.jpg`} wrapped ui={false} />
        <Card.Content>
          <Card.Header>{activity.title}</Card.Header>
          <Card.Meta>
            <span className="date">{activity.category}</span>
          </Card.Meta>
          <Card.Description>
          {activity.description}
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
         <Button.Group widths={2}>
            <Button onClick={ () =>setEditMode(true) } basic content='Edit' color='blue'/>
            <Button onClick={() => setSelectedActivity(null)} basic content='Cancel' color='grey'/>
         </Button.Group>
        </Card.Content>
      </Card>
    )
}
