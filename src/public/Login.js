import React from 'react'
import axios from '../axios'
import FormControl from '@mui/material/FormControl'
import TextField from '@mui/material/TextField'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import CircularProgress from "@mui/material/CircularProgress"
const Login = props => {
	const [disabled, setDisabled] = React.useState(false)
	const usernameRef = React.useRef('')
	const passwordRef = React.useRef('')
	const getRefValue = (r) => {
		return r.current.querySelector('input').value
	}
	const submit = event =>
		axios.auth.post('/login',{
			username:getRefValue(usernameRef),
			password:getRefValue(passwordRef),
		}).then(res => {
			localStorage.setItem("lemonsmx-token",res.data)
			window.location.href='/'
		})
			.catch((res) => {
				setDisabled(false)
				localStorage.removeItem("lemonsmx-token")
			})
	return (
		<Box type="form" sx={{
			display: 'flex',
			justifyContent: 'center',
			margin: 'auto',
			width: 400,
			flexWrap: 'wrap',
		}}>
			<Paper>
				<Stack sx={{position:"absolute", left:"50%", transform:"translate(-50%, 29%)"}}>
					<FormControl sx={{ m: 1, width: '25ch' }}>
						<TextField variant="outlined" 
							ref={usernameRef} 
							defaultValue={null}
							label='username'
							name="username" 
						/>
					</FormControl>
					<FormControl sx={{ m: 1, width: '25ch' }}>
						<TextField variant="outlined" 
							ref={passwordRef} 
							defaultValue={null}
							label='password' 
							name="password" 
							type="password"
						/>
					</FormControl>
					<Button onClick={() => { setDisabled(true); submit(); }} disabled={disabled}>
						{disabled?<CircularProgress size={27}/>:'Login'}
					</Button>

				</Stack>
			</Paper>
		</Box>
	)
}
export default Login