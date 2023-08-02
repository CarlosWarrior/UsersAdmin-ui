import React from 'react'
import { format } from 'date-fns'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import Autocomplete from '@mui/material/Autocomplete'
import Checkbox from '@mui/material/Checkbox'

const ObjectForm = ({obj, stc, labels, ignored, types, changed, recall, submit, controlled, options, ...rest}) => {
	//.log(labels)
	const [values, setValues] = React.useState(controlled)

	const controlledChange = ({name, value}) => {
		setValues({...values, [name]: value})
		//.log(value)
	}
	
	const refs = []
	const form = { ...obj, ...stc }
	const getRef = () => {
		const ref = React.createRef()
		refs.push(ref)
		return ref
	}

	React.useEffect(() => {
		if(recall){
			refs.forEach( r => {
				let input = r.current.querySelector("textarea")
				if(!input)
					input = r.current.querySelector("input")
				if(input.type == 'checkbox')
					form[input.name] = input.checked?1:0
				else
					form[input.name] = input.value
			})
			submit({...form, ...values})
		}
	}, [recall])
	const _obj = Object.keys(obj)
	return (
		<Box sx={{display:'flex', justifyContent:'flex-start', alignItems:'flex-start'}}>
			<Box component="form" autoComplete="off" noValidate>
	    	{_obj && _obj.map((key, i) => {
	    		//.log(key, labels[key])
	    			return(
							typeof(obj[key]) != 'object' && 
							!ignored.includes(key) &&(
								types[key] == 'email'?
									<FormControl sx={{ m: 1, width: '25ch' }}>
										<TextField key={i} multiline variant="outlined"
											ref={getRef()}
											label={labels && labels[key]?labels[key]:key+`${changed && changed[key]?'*':''}`}
											name={key}
											type="email"
											defaultValue={changed && changed[key]?changed[key]:obj[key]}
										/>
									</FormControl>
								:types[key] == 'select'?
									<FormControl sx={{ m: 1, width: '25ch' }} ref={getRef()}>
										<InputLabel id={"label-"+key}>{labels && labels[key]?labels[key]:key+`${changed && changed[key]?'*':''}`}</InputLabel>
										<Select
											labelId={"label-"+key}
											name={key}
											label={labels && labels[key]?labels[key]:key+`${changed && changed[key]?'*':''}`}
						          defaultValue={changed && changed[key]?changed[key]:obj[key]}
						        >
						        	{options[key].map(so => (
							          <MenuItem value={so.value}>{so.label}</MenuItem>
						        	))}
						        </Select>
						      </FormControl>
						    :types[key] == 'select-search'?
									<FormControl sx={{ m: 1, width: '25ch' }}>

						        <Autocomplete
						          disablePortal
						          id="combo-box-demo"
	          					labelId={"label-"+key}
	          					name={key}
	          					label={labels && labels[key]?labels[key]:key+`${changed && changed[key]?'*':''}`}
						          options={options[key]}
						          sx={{ width: 300 }}
						          renderInput={(params) => <TextField {...params} label="Producto" />}
						          getOptionLabel={(opt)=> `${opt["label"]}`}
						          onChange={(event, opt) => 
			                  controlledChange({name:key, value:opt.value })
			                }
						        />

						      </FormControl>
								:types[key] == 'date'?
									<FormControl sx={{ m: 1, width: '25ch' }}>
									<DatePicker
									    label={labels && labels[key]?labels[key]:key+`${changed && changed[key]?'*':''}`}
									    name={key} 
									    onChange={(m) => m && controlledChange({name:key, value: format(m, 'yyyy-MM-dd') })}
									    value={values[key]?values[key]:null}
									    inputFormat="yyyy-MM-dd"
									    defaultValue={null}
									    renderInput={(params) => <TextField {...params} />}
									  />
									</FormControl>
								:types[key] == 'money'?
									<FormControl sx={{ m: 1, width: '25ch' }}>
										<TextField key={i} multiline variant="outlined" 
											label={labels && labels[key]?labels[key]:key+`${changed && changed[key]?'*':''}`}
									    name={key}
									    onChange={({target}) => controlledChange(target)}
									    value={values[key]}
											type="number"
										/>
									</FormControl>
								:types[key] == 'password'?
									<FormControl sx={{ m: 1, width: '25ch' }}>
										<TextField key={i} variant="outlined" 
											ref={getRef()} 
											label={labels && labels[key]?labels[key]:key+`${changed && changed[key]?'*':''}`} 
											name={key} 
											defaultValue={changed && changed[key]?changed[key]:obj[key]}
											type="password"
										/>
									</FormControl>
								:types[key] == 'number'?
									<FormControl sx={{ m: 1, width: '25ch' }}>
										<TextField key={i} multiline variant="outlined" 
											ref={getRef()} 
											label={labels && labels[key]?labels[key]:key+`${changed && changed[key]?'*':''}`} 
											name={key} 
											defaultValue={changed && changed[key]?changed[key]:obj[key]}
											type="number"
										/>
									</FormControl>
								:types[key] == 'check'?
									<FormControl sx={{ m: 1, width: '25ch' }}>
										<Checkbox
											ref={getRef()}
											name={key}
											label={labels && labels[key]?labels[key]:key+`${changed && changed[key]?'*':''}`} 
										/>
										<InputLabel id={"label-"+key}>{labels && labels[key]?labels[key]:key+`${changed && changed[key]?'*':''}`}</InputLabel>
									</FormControl>
								:
								<FormControl sx={{ m: 1, width: '25ch' }}>
									<TextField key={i} multiline variant="outlined" 
										ref={getRef()} 
										label={labels && labels[key]?labels[key]:key+`${changed && changed[key]?'*':''}`} 
										name={key} 
										defaultValue={changed && changed[key]?changed[key]:obj[key]}
									/>
								</FormControl>
							)
	    			)
	    		})
	    	}
			</Box>
		</Box>
	)
}
export default ObjectForm