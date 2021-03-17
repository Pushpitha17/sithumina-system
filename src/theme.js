import { createMuiTheme } from '@material-ui/core/styles'
import { red } from '@material-ui/core/colors'

// Create a theme instance.
const theme = createMuiTheme({
	props: {
    MuiInput: { inputProps: { spellCheck: 'false' } }
  },
	palette: {
		primary: {
			main: '#0d47a1',
		},
		secondary: {
			main: '#eceff1',
		},
		error: {
			main: red.A400,
		},
		background: {
			default: '#f5f5f5',
		},
		white: {
			main: '#ffffff',
		},
	},
})

export default theme
