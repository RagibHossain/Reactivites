import React from 'react'
import { Dimmer, Loader } from 'semantic-ui-react'
import { observer } from 'mobx-react-lite'
interface IProps {
    content : string ,
}
 const LoadingComponent : React.FC<IProps> = ({content}) => {
    return (
         <Dimmer active inverted >
             <Loader content={content}/>
         </Dimmer>
    )
}

export default observer(LoadingComponent);