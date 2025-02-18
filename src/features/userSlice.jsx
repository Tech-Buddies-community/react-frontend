import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

// Fungsi untuk mengambil user dari localStorage dengan error handling
const getUserFromLocalStorage = () => {
    try {
        const storedUser = localStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser) : null;
    } catch (error) {
        console.error('Error parsing user from localStorage:', error);
        return null; // Fallback ke null jika ada error
    }
};

const initialState = {
    user: getUserFromLocalStorage()
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        loginUser: (state, action) => {
            const user = action.payload.data;

            // Set nilai dari state
            state.user = user;

            // Set localStorage dengan validasi
            if (user) {
                localStorage.setItem('user', JSON.stringify(user));
            }
        },
        logoutUser: (state) => {
            state.user = null;
            localStorage.removeItem('user');
            toast.success('Logout Success!');
        },
        registerUser: (state, action) => {
            const user = action.payload.data;
            state.user = user;

            // Set localStorage dengan validasi
            if (user) {
                localStorage.setItem('user', JSON.stringify(user));
            }
        }
    }
});

export const { loginUser, logoutUser, registerUser } = userSlice.actions;
export default userSlice.reducer;
