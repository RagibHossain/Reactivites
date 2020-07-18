import React, { useState } from 'react'
import { Menu, Container, Button } from 'semantic-ui-react'
import logo from '../../logo.png'
import { NavLink } from 'react-router-dom'

export const NavBar : React.FC = () => {
    const btnStyle : any = {
        backgroundColor : 'rgb(08, 00, 141)',
        color : 'white'
      }
      const btnStyleHover = {
        backgroundColor : 'white',
        color : 'black'
      }
    const [btn,setBtn] = useState(btnStyle)
    
    return (
          
        <Menu fixed='top' inverted>
        <Container>
        <Menu.Item as={NavLink} exact to='/'>
            <img src={logo} alt="Logo"/>
            Reactivities
        </Menu.Item>
        <Menu.Item as={NavLink} to='/activities'>Activities</Menu.Item>
        <Menu.Item >
            <Button onMouseOver={() => setBtn(btnStyleHover) } onMouseOut={() => setBtn(btnStyle)} as={NavLink} to='/createActivity' floated='right' style={btn} content='Add Acitivity'/>
        </Menu.Item>
           
         </Container>
      </Menu>
                            
    )
}
