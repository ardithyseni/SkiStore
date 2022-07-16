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
import { useForm } from 'react-hook-form';
import { LoadingButton } from '@mui/lab';
import agent from '../../app/api/agent';
import { toast } from 'react-toastify';


const theme = createTheme();

export default function Register() {

    const history = useHistory();

    // https://react-hook-form.com/api/useform
    const { register, handleSubmit, setError,
        formState: { isSubmitting, errors, isValid } } = useForm({
            mode: 'all'
        })

    function handleApiErrors(errors: any) {
        if (errors) {
            errors.forEach((error: string) => {
                if (error.includes('Password')) {
                    setError('password', { message: error })
                } else if (error.includes('Email')) {
                    setError('email', { message: error })
                } else if (error.includes('Username')) {
                    setError('username', { message: error })
                }
            });
        }
    }

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
                    Register
                </Typography>
                <Box component="form"
                    onSubmit={handleSubmit((data) =>
                        agent.Account.register(data)
                        .then(() => {
                            toast.success('Registration successful! You can login now');
                            history.push('/login');
                        })
                        .catch(error => handleApiErrors(error)))
                    }
                    noValidate sx={{ mt: 1 }}
                >
                    <TextField
                        margin="normal"
                        fullWidth
                        label="Username"
                        // name="username"
                        autoFocus
                        {...register('username', { required: 'Username is required' })} // https://react-hook-form.com/api/useform/register
                        error={!!errors.username} // cast our username into boolean if it exists
                        helperText={errors?.username?.message}
                    />
                    <TextField
                        margin="normal"
                        fullWidth
                        label="Email address"
                        {...register('email',
                            {
                                required: 'Email is required',
                                pattern: {
                                    value: /^\w+[\w-.]*@\w+((-\w+)|(\w*))\.[a-z]{2,3}$/,
                                    message: 'Not a valid email address'
                                }
                            })} // https://react-hook-form.com/api/useform/register
                        error={!!errors.email} // cast our username into boolean if it exists
                        helperText={errors?.email?.message}
                    />
                    <TextField
                        margin="normal"
                        fullWidth
                        // name="password"
                        label="Password"
                        type="password"
                        {...register('password', { 
                            required: 'Password is required',
                            pattern: {
                                value: /^(?=.*\d).{4,}$/,
                                message: 'password not strong enough'
                            } 
                        })}
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
                        Register
                    </LoadingButton>
                    <Grid container>
                        <Grid item>
                            <Link to='/register'>
                                {"Already have an account? Sign In"}
                            </Link>
                        </Grid>
                    </Grid>
                </Box>

            </Container>
        </ThemeProvider>
    );
}