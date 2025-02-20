import { useState } from "react";
import { BsSend } from "react-icons/bs"
import { TiMessages } from "react-icons/ti";
import useSendMessage from "../../hooks/useSendMessage";

const MessageInput = () => {

  const [message, setMessage] = useState('');
  const {loading, sendMessage} = useSendMessage();

  const handleMessageSubmit = async (e) => {
    e.preventDefault();
    if(!message) return;
    await sendMessage( {message} );
    setMessage("");
  }

  return (
    <form onSubmit={handleMessageSubmit} className="px-4 my-3">
        <div className="w-full relative">
            <input
                type="text"
                className="border-none text-sm rounded-lg w-full p-2.5 bg-gray-700 text-white"
                placeholder="Send message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            />
            <button
              type="submit"
              className="hover:cursor-pointer absolute inset-y-0 end-0 flex items-center pe-3"
              disabled={loading}
            >
              {loading ? <div className="loading loading-spinner"></div> : <BsSend />}
            </button>
        </div>
    </form>
  )
}

export default MessageInput