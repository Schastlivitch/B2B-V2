import { useContext, useState } from "react"
import { useCollectionData } from 'react-firebase-hooks/firestore'
import firebase from 'firebase';
import { useSelector } from "react-redux";
import { Context } from "../../index"

const Chat = ({ partner }) => {

  const { firestore } = useContext(Context)

  const currentUser = useSelector(state => state.user)

  const [messages, loading] = useCollectionData(firestore.collection('beermessages').orderBy('createdAt'))
  const [input, setInput] = useState('')

  const sendMessage = async (e) => {
    firestore.collection('beermessages').add({
      senderID: currentUser._id,
      recieverID: partner._id,
      text: input,
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    })
    setInput('')
  }


  return (
    <>
      <div className="modal fade" id={`getChat${partner?._id}`} tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h4>Чат c {partner?.title}</h4>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div className="container">
                <ul className="list-unstyled">
                {
                  messages?.length
                    ?
                    messages.map(message => {
                      return (
                        <>
                        {
                          currentUser?._id == message?.senderID && partner?._id == message?.recieverID || currentUser?._id == message?.recieverID && partner?._id == message?.senderID ?
                          <li className={message.senderID === currentUser?._id ? 'out' : 'in'}>
                            <div className="chat-body">
                              <div className={message.senderID === currentUser?._id ? "chat-message d-flex flex-row-reverse" : "chat-message d-flex flex-row"}>
                                <p>{message.text}</p>
                              </div>
                            </div>
                          </li>
                          :
                          null
                        }
                        </>
                      )
                    })
                    :
                    'Нет сообщений...'
                }
                </ul>
              </div>
            </div>
            <div className="modal-footer">
              <div className="d-flex align-items-center justify-content-center">
                <div className="container">
                  <input className="form-control" type="text" value={input} onChange={(e) => setInput(e.target.value)} />
                </div>
                <button className="btn" onClick={sendMessage}>Отправить</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Chat;
