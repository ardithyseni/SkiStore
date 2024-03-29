import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import { FieldValues } from "react-hook-form";
import { toast } from "react-toastify";
import { history } from "../..";
import agent from "../../app/api/agent";
import { User } from "../../app/models/user";
import { setBasket } from "../basket/basketSlice";

interface AccountState {
    user: User | null;
}

const initialState: AccountState = {
    user: null
}

export const signInUser = createAsyncThunk<User, FieldValues>(
    'account/signInUser', // type prefix
    async (data, thunkAPI) => {
        try {
            const userDto = await agent.Account.login(data);
            const { basket, ...user } = userDto;

            if (basket) thunkAPI.dispatch(setBasket(basket)); // redux store work

            localStorage.setItem('user', JSON.stringify(user)); // store the token in local browser storage
            return user;
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data });
        }
    }
)

export const fetchCurrentUser = createAsyncThunk<User>(
    'account/fetchCurrentUser', // type prefix
    async (_, thunkAPI) => {
        thunkAPI.dispatch(setUser(JSON.parse(localStorage.getItem('user')!)));
        try {
            const userDto = await agent.Account.currentUser();
            const { basket, ...user } = userDto;

            if (basket) thunkAPI.dispatch(setBasket(basket)); // redux store work
            localStorage.setItem('user', JSON.stringify(user));
            return user;
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data });
        }
    },
    {
        condition: () => { // only go to the api to fetch if we have a token
            if (!localStorage.getItem('user')) return false;
        }
    }
)

// A function that accepts an initial state, 
// an object of reducer functions, and a "slice name", and automatically 
// generates action creators and action types that correspond to the reducers and state. 
export const accountSlice = createSlice({
    name: 'account',
    initialState,
    reducers: {
        signOut: (state) => {
            state.user = null;
            localStorage.removeItem('user');
            history.push('/');
        },
        setUser: (state, action) => {
            let claims = JSON.parse(atob(action.payload.token.split('.')[1]));
            let roles = claims['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
            state.user = {...action.payload, roles: typeof(roles) === 'string' ? [roles]: roles};
        }
    },
    extraReducers: (builder => {

        builder.addCase(fetchCurrentUser.rejected, (state) => {
            state.user = null;
            localStorage.removeItem('user');
            toast.error('Session expired - please log in again');
            history.push('/')
        })

        builder.addMatcher(isAnyOf(signInUser.fulfilled, fetchCurrentUser.fulfilled), (state, action) => {
            let claims = JSON.parse(atob(action.payload.token.split('.')[1]));
            let roles = claims['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
            state.user = {...action.payload, roles: typeof(roles) === 'string' ? [roles]: roles};
        }); // Allows you to match your incoming actions against your own filter function instead of only the action.type property.

        builder.addMatcher(isAnyOf(signInUser.rejected), (state, action) => {
            throw action.payload;

        })
    })
})

export const { signOut, setUser } = accountSlice.actions;