import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Paper } from '@mui/material';
import { Link, useHistory } from 'react-router-dom';
import agent from '../../app/api/agent';
import { FieldValues, useForm } from 'react-hook-form';
import { LoadingButton } from '@mui/lab';
import { useAppDispatch } from '../../app/store/configureStore';
import { signInUser } from './accountSlice';


const theme = createTheme();

export default function Login() {

    const history = useHistory();
    const dispatch = useAppDispatch();

    // https://react-hook-form.com/api/useform
    const {register, handleSubmit, 
        formState: {isSubmitting, errors, isValid}} = useForm({
            mode: 'all'
        })

    async function submitForm(data: FieldValues) {
        
        await dispatch(signInUser(data));
        history.push('/catalog')
            
    }

    // const [values, setValues] = useState({
    //     username: '',
    //     password: ''
    // })

    // const handleSubmit = (event: any) => {
    //     event.preventDefault();
    //     agent.Account.login(values);
    // };
    // function handleInputChange(event: any) {
    //     const {name, value} = event.target; // each event has an event.target object
    //     setValues({...values, [name]: value});
    // }

    return (
        <ThemeProvider theme={theme}>
            <Container component={Paper} maxWidth="sm"
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    p: 4
                }}>
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <Box component="form" onSubmit={handleSubmit(submitForm)} noValidate sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        fullWidth
                        label="Username"
                        // name="username"
                        autoFocus
                        {...register('username', {required: 'Username is required'})} // https://react-hook-form.com/api/useform/register
                        error={!!errors.username} // cast our username into boolean if it exists
                        helperText={errors?.username?.message}
                    />
                    <TextField
                        margin="normal"
                        fullWidth
                        // name="password"
                        label="Password"
                        type="password"
                        {...register('password', {required: 'Password is required'})}
                        error={!!errors.password} // cast our password into boolean if it exists
                        helperText={errors?.password?.message}
                    />
                    <LoadingButton
                        disabled={!isValid}
                        loading={isSubmitting}
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign In
                    </LoadingButton>
                    <Grid container>
                        <Grid item>
                            <Link to='/register'>
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </Box>

            </Container>
        </ThemeProvider>
    );
}