import { red } from '@mui/material/colors'
import { createTheme } from '@mui/material/styles'
const source = {
  palette: {
    primary: {
      main: '#556cd6',
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: red.A400,
    },
  },
}
const theme = createTheme(source)
export default { theme, source }