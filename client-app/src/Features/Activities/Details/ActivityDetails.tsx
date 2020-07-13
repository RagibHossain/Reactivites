import React, { useContext } from 'react'
import { Card, Image, Button } from 'semantic-ui-react'
import { observer } from 'mobx-react-lite'
import ActivityStore from '../../../App/Stores/activityStore'

const ActivityDetails : React.FC = () => {
     const activityStore = useContext(ActivityStore)
     const {selectedActivity : activity,openEditForm,cancelDisplay} = activityStore
    return (
        <Card fluid>
        <Image src={`/assets/categoryImages/${activity!.category}.jpg`} wrapped ui={false} />
        <Card.Content>
          <Card.Header>{activity!.title}</Card.Header>
          <Card.Meta>
            <span className="date">{activity!.category}</span>
          </Card.Meta>
          <Card.Description>
          {activity!.description}
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
         <Button.Group widths={2}>
            <Button onClick={ () => openEditForm(activity!) } basic content='Edit' color='blue'/>
            <Button onClick={() => cancelDisplay()} basic content='Cancel' color='grey'/>
         </Button.Group>
        </Card.Content>
      </Card>
    )
}
export default observer(ActivityDetails);