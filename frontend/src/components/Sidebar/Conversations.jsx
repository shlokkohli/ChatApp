import { useEffect } from "react";
import useGetConversations from "../../hooks/useGetConversations"
import Conversation from "./Conversation"
import { getRandomEmoji } from '../../utils/emojis.js'

const Conversations = () => {

  const {loading, conversations} = useGetConversations();

  return (
    <div className='py-2 flex flex-col overflow-auto'>

      {conversations.map((eachConvo, index) => (
        <Conversation
          key={eachConvo._id}
          conversation={eachConvo}
          emoji={getRandomEmoji()}
          isLast={index === conversations.length - 1} // checking if this is the last index or not
        />
      ))}

      {loading ? <span className="loading loading-spinner mx-auto"></span> : null}
    </div>
  )
}

export default Conversations