import React from "react";
import FormAuth from "../../components/Form/FormAuth";
import customAPI from "../../api";
import { toast } from "react-toastify";
import { registerUser } from "../../features/userSlice";
import { redirect } from "react-router-dom";

export const action = (store) => async ({request}) => {
    const formInputData = await request.formData();
    const data = Object.fromEntries(formInputData);

    try {
        const response = await customAPI.post('/auth/register', data);
        store.dispatch(registerUser(response.data));
        toast.success("Register Success!");
        return redirect("/");
    } catch (error) {
        const errorMessage = error?.response?.data?.message;
        toast.error(errorMessage);
        return null;
    }
}

const RegisterView = () => {
    return (
        <main>
            <FormAuth isRegister={true} />
        </main>
    )
}

export default RegisterView;