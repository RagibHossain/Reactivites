import React, { useState, useContext } from 'react'
import { Menu, Container, Button, Dropdown, Image } from 'semantic-ui-react'
import logo from '../../logo.png'
import { NavLink, Link } from 'react-router-dom'
import { RootStoreContext } from '../../App/Stores/rootStore'
import { observer } from 'mobx-react-lite'

 const NavBar : React.FC = () => {
    const btnStyle : any = {
        backgroundColor : 'rgb(08, 00, 141)',
        color : 'white'
      }
      const btnStyleHover = {
        backgroundColor : 'white',
        color : 'black'
      }
    const [btn,setBtn] = useState(btnStyle)
    const rootStore = useContext(RootStoreContext);
    const {user,logout} = rootStore.userStore;
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
           {user && 
                   <Menu.Item position='right'>
                     <Image avatar spaced='right' src={user.image || '/assets/user.png'} />
                     <Dropdown pointing='top left' text={user.displayName}>
                       <Dropdown.Menu>
                         <Dropdown.Item as={Link} to={`/profile/username`} text={user.displayName} icon='user'/>
                         <Dropdown.Item onClick={logout}  text='Logout' icon='power' />
                       </Dropdown.Menu>
                     </Dropdown>
                   </Menu.Item>
           }
         </Container>
      </Menu>
                            
    )
}
export default observer(NavBar)