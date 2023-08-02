import React from 'react'
import List from './list'
import Stack from '@mui/material/Stack'
const Users = () => {
  return (
    <Stack
      direction="row"
      justifyContent="space-evenly"
      alignItems="flex-start"
      spacing={2}
    >
      <List/>
    </Stack>
  )
}

export default Users;