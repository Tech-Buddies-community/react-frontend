import React, { useEffect, useState } from "react";
import customAPI from "../api";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../components/Loading";
import FormInput from "../components/Form/FormInput";
import FormSelect from "../components/Form/FormSelect";
import FormTextArea from "../components/Form/FormTextArea";
import { toast } from "react-toastify";

export const loader = (storage) => async () => {
    const user = storage.getState().userState.user;

    // if user not login show
    if (!user) {
        toast.warn('You need to Login access this page!');
        return redirect('/login');
    }

    // if user not role owner not access this page
    if (user.role != 'owner') {
        toast.warn('You can`t access this page');
        return redirect('/');
    }

    return null;
}


const updateProgramView = () => {
    const [program, setProgram] = useState(null);
    const {id} = useParams();
    const statusTicket = ["Free", "Paid"];
    const statusEvent = ["Coming Soon", "Open", "Close"];
    const navigate = useNavigate();

    const getProgramId = async () => {
        const {data} = await customAPI.get(`/program/${id}`);

        setProgram(data.data);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        const form = event.target;
        const dataForm = new FormData(form);

        const data = Object.fromEntries(dataForm);

        try {
            // update event
            await customAPI.put(`/program/${id}`, {
                name: data.name,
                organizer: data.organizer,
                deadline_registration: data.deadline_registration,
                location: data.location,
                information: data.information,
                registration: data.registration,
                ticket_status: data.ticket_status,
                status: data.status,
                description: data.description
            })

            toast.success('Success update program!');
            navigate('/program');
        } catch (error) {
            const errorMessage = error?.response?.data?.message;
            toast.error(errorMessage);
        }
    }

    useEffect(() => {
        getProgramId();
    }, [])

    return (
        <>
            <div className="border-b border-neutral pb-5 mt-5">
                <h2 className="text-2xl font-bold capitalize">Update Event</h2>
            </div>
            {program ? (
                <form onSubmit={handleSubmit} encType="multipart/form-data">
                    <div className="grid grid-cols-2 gap-x-4">
                        <FormInput name='name' label='Name Event' type='text' defaultValue={program.name}/>
                        <FormInput name='organizer' label='Organizer Event' type='text' defaultValue={program.organizer} />
                    </div>

                    <div className="grid grid-cols-2 gap-x-4">
                        <FormInput name='deadline_registration' label='Date Event' type='date' defaultValue={program.deadline_registration} />
                        <FormInput name='location' label='Location Event' type='text' defaultValue={program.location} />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-x-4">
                        <FormInput name='registration' label='Link Registration' type='text' defaultValue={program.registration} />
                        <FormInput name='information' label='Link Information' type='text' defaultValue={program.information} />
                    </div>

                    <div className="grid grid-cols-2 gap-x-4">
                        <FormSelect name='ticket_status' label='Status Ticket Event' list={statusTicket} defaulValue={program.ticket_status} />
                        <FormSelect name='status' label='Status Event' list={statusEvent} defaulValue={program.status} />
                    </div>

                    <FormTextArea name='description' label='Description Program' defaultValue={program.description} />
                    <input type="submit" value='Update Event' className="btn btn-neutral btn-block mt-5 btn-md"></input>
                </form>
            ) : (
                <Loading />
            )}
        </>
    )
};

export default updateProgramView;