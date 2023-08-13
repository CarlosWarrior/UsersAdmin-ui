import React from 'react'
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';

import {AppContext} from '../../contexts/App'
import ObjectForm from '../../components/ObjectForm'

const UsersCreate = ({open, close, model,  ...rest}) => {
  const app = React.useContext(AppContext)
  const { recall, setRecall } = app
  const { create, update } = app.users

  const scope = model?"Editar" : "Añadir"
  const submit = d=>  model?update(d):create(d)
  return (
    <Dialog onClose={close} open={open}>
      <DialogTitle>{scope} Paquete</DialogTitle>
      <ObjectForm ignored={['id']} recall={recall} submit={submit}
        obj={{username:'', password:'', repassword:''}}
        labels={{username:'Usuario', password:'Contraseña',  repassword:'Confirmación'}}
        types={{username:'text', password:'password',  repassword:'password'}}
        changed={model?{...model}:{}} 
      />
      <Button onClick={() => {setRecall(true);close()}}>{scope}</Button>
    </Dialog>
  )
}
export default UsersCreate