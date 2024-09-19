import {PrettyChatWindow } from 'react-chat-engine-pretty'
const ChatsPage = (props) =>{
    
    return <div style={{height: '100vh'}}>
          <PrettyChatWindow
            projectId='1e4dc223-ee8b-4795-a656-55152f63b152'
            username={props.user.username}
            secret={props.user.secret}
            style={{height: '100%'}}
          
          />
        </div>

}

export default ChatsPage