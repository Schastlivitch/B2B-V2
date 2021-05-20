import { Context } from "../../index"
import firebase from 'firebase';
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { useContext, useState } from "react";
import { useSelector } from "react-redux";


const ChatsPage = () => {

  const { firestore } = useContext(Context)

  const currentUser = useSelector(state => state.user)

  const [messages, loading] = useCollectionData(firestore.collection('beermessages').orderBy('createdAt'))

  const messagesToMe = messages?.filter(message => message.recieverID === currentUser?._id)

  const [input, setInput] = useState('')

  const sendMessage = async (e) => {
    firestore.collection('beermessages').add({
      senderID: currentUser._id,
      recieverID: messagesToMe[0]?.senderID,
      text: input,
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    })
    setInput('')
  }

  return (
    <div style={{backgroundImage:'url(images/background1.jpg)', height:'100vh'}} className="pt-4">
      <div className="container">
        <ul className="list-unstyled">
          {
            messagesToMe?.map(message => {
              return (
                <>
                  <li className={message.senderID === currentUser?._id ? 'out' : 'in'}>
                    <div className="chat-body">
                      <div className={message.senderID === currentUser?._id ? "chat-message d-flex flex-row-reverse" : "chat-message d-flex flex-row"}>
                        <p>{message.text}</p>
                      </div>
                    </div>
                  </li>
                </>
              )
            })
          }
        </ul>
        <div className="d-flex align-items-center justify-content-center">
          <div className="container">
            <input className="form-control" type="text" value={input} onChange={(e) => setInput(e.target.value)} />
          </div>
          <button className="btn" onClick={sendMessage}>Отправить</button>
        </div>
      </div>
    </div>
  )
}

export default ChatsPage;
