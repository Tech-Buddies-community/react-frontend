import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

const initialState = {
    user: null
};

try {
    const userData = localStorage.getItem('user');
    if (userData) {
        initialState.user = JSON.parse(userData);
    }
} catch (error) {
    console.error('Error parsing user data from localStorage:', error);
    localStorage.removeItem('user'); // Hapus data yang rusak
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        loginUser: (state, action) => {
            const user = action.payload.data;
            state.user = user;
            localStorage.setItem('user', JSON.stringify(user));
        },
        logoutUser: (state) => {
            state.user = null;
            localStorage.removeItem('user');
            toast.success('Logout Success!');
        },
        registerUser: (state, action) => {
            const user = action.payload.data;
            state.user = user;
            localStorage.setItem('user', JSON.stringify(user));
        }
    }
});

export const { loginUser, logoutUser, registerUser } = userSlice.actions;
export default userSlice.reducer;