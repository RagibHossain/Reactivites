import React from 'react'
import { Menu, Container, Button } from 'semantic-ui-react'
import { IActivity } from '../../Models/Activity';
interface IProps{
    setEditMode : (editMode : boolean) => void;
    setSelectedActivity : (activity : IActivity | null) => void
}
export const NavBar : React.FC<IProps> = ({setEditMode,setSelectedActivity}) => {
    const handleClick = () =>{
        setSelectedActivity(null)
        setEditMode(true);
    }
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
