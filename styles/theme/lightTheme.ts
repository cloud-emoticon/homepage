import { createTheme } from '@mui/material/styles';

const lightTheme = createTheme({
    palette: {
        primary: {
            main: '#3F51B5'
        },
        secondary: {
            main: '#e91e63'
        }
    },
    typography: {
        button: {
            textTransform: 'none',
        }
    }
});

export default lightTheme;
