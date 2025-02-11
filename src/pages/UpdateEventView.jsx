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


const updateEventView = () => {
    const [event, setEvent] = useState(null);
    const {id} = useParams();
    const categoryEvent = ["IT", "NON-IT Conference", "NON-IT Seminar", "NON-IT Pameran/Expo", "NON-IT Seni"];
    const statusTicket = ["Coming Soon", "Free", "Paid"];
    const statusEvent = ["Coming Soon", "Open", "Close"];
    const navigate = useNavigate();

    const getEventId = async () => {
        const {data} = await customAPI.get(`/event/${id}`);

        setEvent(data.data);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        const form = event.target;
        const dataForm = new FormData(form);

        const data = Object.fromEntries(dataForm);

        try {
            // update event
            await customAPI.put(`/event/${id}`, {
                name: data.name,
                organizer: data.organizer,
                date: data.date,
                start_time: data.start_time,
                end_time: data.end_time,
                location: data.location,
                link: data.link,
                source: data.source,
                category: data.category,
                ticket_status: data.ticket_status,
                status: data.status,
                description: data.description
            })

            toast.success('Success update event!');
            navigate('/event');
        } catch (error) {
            const errorMessage = error?.response?.data?.message;
            toast.error(errorMessage);
        }
    }

    useEffect(() => {
        getEventId();
    }, [])

    return (
        <>
            <div className="border-b border-neutral pb-5 mt-5">
                <h2 className="text-2xl font-bold capitalize">Update Event</h2>
            </div>
            {event ? (
                <form onSubmit={handleSubmit} encType="multipart/form-data">
                    <div className="grid grid-cols-2 gap-x-4">
                        <FormInput name='name' label='Name Event' type='text' defaultValue={event.name}/>
                        <FormInput name='organizer' label='Organizer Event' type='text' defaultValue={event.organizer} />
                    </div>

                    <div className="grid grid-cols-3 gap-x-4">
                        <FormInput name='date' label='Date Event' type='date' defaultValue={event.date} />
                        <FormInput name='start_time' label='Start Event' type='time' defaultValue={event.start_time} />
                        <FormInput name='end_time' label='End Event' type='time' defaultValue={event.end_time} />
                    </div>
                    
                    <div className="grid grid-cols-3 gap-x-4">
                        <FormInput name='location' label='Location Event' type='text' defaultValue={event.location} />
                        <FormInput name='link' label='Link Event' type='text' defaultValue={event.link} />
                        <FormInput name='source' label='Link Source' type='text' defaultValue={event.source} />
                    </div>

                    <div className="grid grid-cols-3 gap-x-4">
                        <FormSelect name='category' label='Category Event' list={categoryEvent} defaulValue={event.category} />
                        <FormSelect name='ticket_status' label='Status Ticket Event' list={statusTicket} defaulValue={event.ticket_status} />
                        <FormSelect name='status' label='Status Event' list={statusEvent} defaulValue={event.status} />
                    </div>

                    <FormTextArea name='description' label='Description Program' defaultValue={event.description} />
                    <input type="submit" value='Update Event' className="btn btn-neutral btn-block mt-5 btn-md"></input>
                </form>
            ) : (
                <Loading />
            )}
        </>
    )
};

export default updateEventView;