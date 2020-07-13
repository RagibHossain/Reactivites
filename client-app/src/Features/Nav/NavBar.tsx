import React, { useContext } from 'react'
import { Menu, Container, Button } from 'semantic-ui-react'
import ActivityStore from "../../App/Stores/activityStore"

export const NavBar : React.FC = () => {
    const handleClick = () =>{
        activityStore.openCreateForm();
    }
    const activityStore = useContext(ActivityStore);

    return (
      
       
        <Menu fixed='top' inverted>
        <Container>
        <Menu.Item>
            <img src="./assets/logo.png" alt="Logo"/>
            Reactivities
        </Menu.Item>
        <Menu.Item>Activities</Menu.Item>
        <Menu.Item >
            <Button onClick={handleClick} floated='right' positive content='Add Acitivity'/>
        </Menu.Item>
           
         </Container>
      </Menu>
                            
    )
}
