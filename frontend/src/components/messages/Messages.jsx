import useGetMessages from '../../hooks/useGetMessages'
import Message from './Message'
import MessageSkeleton from '../skeletons/MessageSkeleton.jsx'
import { useEffect, useRef } from 'react';
import useListenMessages from '../../hooks/useListenMessages.js';

const Messages = () => {

  const {loading, messages} = useGetMessages();
  useListenMessages();

  const lastMessageRef = useRef();

  useEffect(() => {
    lastMessageRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  return (
    <div className='px-4 flex-1 overflow-auto'>

      {!loading && messages.length > 0 && messages.map((eachMessage) => (
        <div
          key={eachMessage._id}
          ref={lastMessageRef}
        >
          <Message message={eachMessage} />
        </div>
      ))}

      {loading && Array.from({ length: 3 }).map((_, index) => <MessageSkeleton key={index} />)}

      {!loading && messages.length === 0 && (
				<p className='text-center'>Send a message to start the conversation</p>
			)}
    </div>
  )
}

export default Messages