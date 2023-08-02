import React from 'react'
import { usersAPI } from '../api'

export const AppContext = React.createContext({
	current: false,
	recall: false,
	setRecall: () => {},
	users: {
		users:[],
		setRecall: () => {},
		create: () => {},
		detail: () => {},
		update: () => {},
		remove: () => {},
	},
})

export function AppProvider({source, ...rest}){
	const [current, setCurrent] = React.useState(false)
	const [recall, setRecall] = React.useState(false)

	const [users, setusers] = React.useState([])

	React.useEffect(() => {
		!users.length  && usersAPI.list(setusers)
	}, [])


	const _users = {
		users,
		create: (user) => {
			usersAPI.create(user, (createdUser) => {
				setusers([...users, createdUser])
			})
			setRecall(false)
		},
		detail: (user) => {
			setCurrent(user)
		},
		update: (newUser) => {
			usersAPI.update(current.id, newUser, (updatedUser) => {
				setusers([...users.map(scopedUser => scopedUser.id == current.id?updatedUser:scopedUser)])
				setCurrent(null)
			})
			setRecall(false)
		},
		remove: (userID) => {
			usersAPI.delete(userID, () => {
				setusers(users.filter(scopedUser => scopedUser.id != userID))
			})
			setCurrent(false)
		},
	}


	return (
		<AppContext.Provider value={{
			current,
			recall,
			setRecall,
			users:_users,
		}}>
			{rest.children}
		</AppContext.Provider>
	)
}