import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import useConversation from "../../zustand/useConversation";
import useGetConversations from '../../hooks/useGetConversations.js'
import toast from "react-hot-toast";

const SearchInput = () => {

	const [search, setSearch] = useState("");

	// selected conversation from zustand
	const { setSelectedConversation } = useConversation();
	const { conversations } = useGetConversations();

	const handleSearch = (e) => {
		e.preventDefault();
		if(!search) return;

		if(search.length < 3){
			return toast.error('Search term must be at least 3 characters long')
		}

		const conversation = conversations.find((eachConvo) => eachConvo.fullName.toLowerCase().includes(search.toLowerCase()))

		console.log(conversation)

		if(conversation){
			setSelectedConversation(conversation)
			setSearch("");
		}
		else {
			toast.error("No user found");
		}
	}

  return (
		<form onSubmit={handleSearch} className='flex items-center gap-2'>
			<input
				type='text'
				placeholder='Search…'
				className='input input-bordered rounded-full'
				value={search}
				onChange={(e) => setSearch(e.target.value)}
			/>
			<button type='submit' className='btn btn-circle bg-sky-500 text-white'>
				<FaSearch className='w-6 h-6 outline-none' />
			</button>
		</form>
  )
}

export default SearchInput