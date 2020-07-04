import React from 'react';

import './App.css';
import axios from 'axios';
import { Header, Icon, List } from 'semantic-ui-react';

class App extends React.Component {
 
  state = {
    values : []
  }
  componentDidMount(){
  

       axios.get("http://localhost:5000/api/values").then( response => {
        
         this.setState({
           values : response.data
         })
       })
  }
  render(){
     
    return (
      <div >
        
        <Header as='h2'>
          <Icon name='plug' />
          <Header.Content>Uptime Guarantee</Header.Content>
        </Header>
          
          <List divided relaxed>

          {this.state.values.map((value : any) => (
               
              
                <List.Item key={value.id}>
                <List.Icon name='github' size='large' verticalAlign='middle' />
                <List.Content>
                <List.Header as='a'>Name</List.Header>
                <List.Description  as='a'>{value.name}</List.Description>
                </List.Content>
              </List.Item>
               

          ))}

          </List>
          
     
      </div>
    );
  }

}

export default App;
