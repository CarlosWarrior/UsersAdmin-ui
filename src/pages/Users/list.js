import React from 'react'

import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Tooltip from '@mui/material/Tooltip'
import IconButton from '@mui/material/IconButton'
import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import IndianaScroller from 'react-indiana-drag-scroll'

import {AppContext} from '../../contexts/App'
import CreateUser from './create'

const UsersToolbar = (props) => {
  const { selected, add, edit, remove } = props

  const [deleteDialog, setDeleteDialog] = React.useState(false)
  const deleteConfirmation = () => setDeleteDialog(true)
  const confirmDelete = () => remove(selected) || setDeleteDialog(false)
  const closeDelete = () => setDeleteDialog(false)


  return (
    <Toolbar sx={{ pl: { sm: 2 }, pr: { xs: 1, sm: 1 }, }} >
      <Typography
        sx={{ flex: '1 1 100%' }}
        variant="h6"
        id="tableTitle"
        component="div"
      >
        Usuarios
        <Dialog onClose={closeDelete} open={deleteDialog}>
          <DialogTitle>Eliminar</DialogTitle>
          <Button onClick={confirmDelete}>Ok</Button>
        </Dialog>
      </Typography>
      {selected && 
        <React.Fragment>
          <Tooltip title={"Editar User "}>
            <IconButton onClick={edit}>
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Eliminar">
            <IconButton onClick={deleteConfirmation}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </React.Fragment>
      }
      <Tooltip title="Añadir usuario">
        <IconButton onClick={add}>
          <AddIcon />
        </IconButton>
      </Tooltip>
    </Toolbar>
  )
}

const Users = () => {
  const app = React.useContext(AppContext)  
  const { current } = app
  const { users, detail, remove } = app.users
  const [open, setOpen] = React.useState(false)
  const openDialog = () => setOpen(true)
  return (
    <IndianaScroller>
    <Stack>
      <UsersToolbar selected={current} add={openDialog} edit={openDialog} remove={remove}/>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell alignt="left">Usuario</TableCell>
              <TableCell alignt="left">Permisos</TableCell>
  						<TableCell alignt="left">Admin</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow
                selected={current && current.id == user.id}
                onClick={() => current && current.id == user.id?detail(false):detail(user)}
                key={user.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell align="left">{user.username}</TableCell>
                <TableCell align="left">{user.permissions}</TableCell>
                <TableCell align="left">{user.admin}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <CreateUser open={open} model={current} close={() => setOpen(false)}/>
    </Stack>
    </IndianaScroller>
  )
}
export default Users