import React from 'react'
import { Menu, Container, Button } from 'semantic-ui-react'
import logo from '../../logo.png'
import { NavLink } from 'react-router-dom'

export const NavBar : React.FC = () => {
   
    return (
          
        <Menu fixed='top' inverted>
        <Container>
        <Menu.Item as={NavLink} exact to='/'>
            <img src={logo} alt="Logo"/>
            Reactivities
        </Menu.Item>
        <Menu.Item as={NavLink} to='/activities'>Activities</Menu.Item>
        <Menu.Item >
            <Button as={NavLink} to='/createActivity' floated='right' positive content='Add Acitivity'/>
        </Menu.Item>
           
         </Container>
      </Menu>
                            
    )
}
