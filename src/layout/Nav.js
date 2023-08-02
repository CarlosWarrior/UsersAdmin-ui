import * as React from 'react'
import { useNavigate } from 'react-router';
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Drawer from '@mui/material/Drawer'
import Button from '@mui/material/Button'
import List from '@mui/material/List'
import Divider from '@mui/material/Divider'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'

import {Context as AuthContext} from '../contexts/Auth'
import {logout} from '../api'
import pagesHook from '../pages-index'


export default function TemporaryDrawer() {
  const navigate = useNavigate()
  const auth = React.useContext(AuthContext)
  const [open, setOpen] = React.useState(false)
  React.useEffect(() => setOpen(false), [auth])
  const pages = pagesHook()

  const toggle = (o) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return
    }
    setOpen(o)
  }

  const navTo = (e,link) => {
    console.log("Navigating to: ", link)
    toggle(false)
    e.ctrlKey || e.metaKey?
      window.open(link, '_blank')
      :navigate(link);
  }

  return (
    <React.Fragment>
      {!open && <Box sx={{position: "sticky", top: 0, background:'white', zIndex:1}}><Button onClick={toggle(true)} disabled={auth.loading || !auth.auth}>Menu</Button></Box>}
      <Drawer
        open={open}
        onClose={toggle(false)}
      >
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={toggle(false)}
          onKeyDown={toggle(false)}
        >
          <List>
            {pages.app.map((page, index) => (
              <ListItem button key={"navlink-"+index} onClick={(e) => navTo(e,page.link)}>
                <ListItemIcon>
                  {page.icon}
                </ListItemIcon>
                <ListItemText primary={page.name} />
              </ListItem>
            ))}
          </List>
          <Divider />
          <Typography onClick={logout}>Logout</Typography>
        </Box>
      </Drawer>
      
    </React.Fragment>
  )
}