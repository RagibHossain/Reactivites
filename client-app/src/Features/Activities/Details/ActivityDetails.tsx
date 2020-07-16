import React, { useContext,useEffect } from 'react'
import { Card, Image, Button } from 'semantic-ui-react'
import { observer } from 'mobx-react-lite'
import ActivityStore from '../../../App/Stores/activityStore'
import { RouteComponentProps, Link } from 'react-router-dom'
import LoadingComponent from '../../../App/Layout/LoadingComponent'
interface CustomParams{
  id : string
}
const ActivityDetails : React.FC<RouteComponentProps<CustomParams>> = ({match,history}) => {
    
     const activityStore = useContext(ActivityStore)
     const {selectedActivity : activity,loadActivity,loadingInitial} = activityStore

     useEffect(() => {
      loadActivity(match.params.id)
           },[loadActivity,match.params.id])

           if(loadingInitial || !activity) return <LoadingComponent content='Loading selected activity ....'/>

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
            <Button as={Link} to={`/manage/${activity.id}`}  basic content='Edit' color='blue'/>
            <Button onClick={() => history.push('/activities')} basic content='Cancel' color='grey'/>
         </Button.Group>
        </Card.Content>
      </Card>
    )
}
export default observer(ActivityDetails);