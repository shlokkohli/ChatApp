import { useSocketContext } from '../../context/SocketContext.jsx';
import useConversation from '../../zustand/useConversation.js'

const Conversation = ( {conversation, emoji, isLast} ) => {

	const {selectedConversation, setSelectedConversation} = useConversation();
	const { onlineUsers } = useSocketContext();

	const isOnline = onlineUsers.includes(conversation._id);

	const isSelected = selectedConversation?._id === conversation._id;

  return (
		<>
			<div
				className={`flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer ${isSelected ? 'bg-sky-500' : ''} rounded-xl`}
				onClick={() => setSelectedConversation(conversation)}
			>
				<div className={`avatar ${isOnline ? 'online' : ''}`}>
					<div className='w-12 rounded-full'>
						<img
							src={conversation.profilePic}
							alt='user avatar'
						/>
					</div>
				</div>

				<div className='flex flex-col flex-1'>
					<div className='flex gap-3 justify-between'>
						<p className='font-bold text-gray-200'>{conversation.fullName}</p>
						<span className='text-xl'>{emoji}</span>
					</div>
				</div>
			</div>

			{!isLast && <div className='divider my-0 py-0 h-1 border-3 border-red-400' />}
		</>
  )
}

export default Conversation