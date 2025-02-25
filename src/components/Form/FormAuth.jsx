import React from "react";
import { Form, Link } from "react-router-dom";
import FormInput from "./FormInput";

const FormAuth = ({isRegister}) => {
    return (
        <>
            <div className="h-screen grid place-items-center">
                <Form method="POST" className="card w-96 p-8 bg-base-300 shadow-lg flex flex-col gap-y-4">
                    <h4 className="text-center text-3xl font-bold">{ isRegister ? 'Register' : 'Login' }</h4>

                    { isRegister ? <FormInput type='name' name='name' label='username' /> : null }
                    <FormInput type='email' name='email' label='email' />
                    <FormInput type='password' name='password' label='password' />
                    <div className="mt-4 ">
                        <button type="submit" className="btn btn-success btn-block">{ isRegister ? 'Register' : 'Login' }</button>
                        { isRegister ?  (<p className="text-center">Sudah punya akun?<Link to='/login' className="ml-2 link link-hover link-info capitalize">Login</Link></p>) :  (<p className="text-center">Belum punya akun?<Link to='/register' className="ml-2 link link-hover link-info capitalize">Register</Link></p>) } 
                    </div>
                </Form>
            </div>
        </>
    )
}

export default FormAuth;