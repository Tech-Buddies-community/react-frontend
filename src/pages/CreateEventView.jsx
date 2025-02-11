import React from "react";
import FormSelect from "../components/Form/FormSelect";
import FormInput from "../components/Form/FormInput";
import FormTextArea from "../components/Form/FormTextArea";
import { useNavigate, redirect } from "react-router-dom";
import customAPI from "../api";
import { toast } from "react-toastify";

export const loader = (storage) => async () => {
    const user = storage.getState().userState.user;

    // if user not login show
    if (!user) {
        toast.warn('You need to Login access this page!');
        return redirect('/login');
    }

    // if user not role owner not access this page
    if (user.role != 'admin') {
        toast.warn('You can`t access this page');
        return redirect('/');
    }

    return null;
}

const CreateEventView = () => {
    const categoryEvent = ["IT", "NON-IT Conference", "NON-IT Seminar", "NON-IT Pameran/Expo", "NON-IT Seni"];
    const statusTicket = ["Coming Soon", "Free", "Paid"];
    const statusEvent = ["Coming Soon", "Open", "Close"];
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        const form = event.target;
        const dataForm = new FormData(form);
        const data = Object.fromEntries(dataForm);
        let posterUrl = "/techbuddies.png"; // Default image path

        try {
            const file = dataForm.get("poster");

            if (file && file.size > 0) {
                const formData = new FormData();
                formData.append("poster", file);

                const responseFileUpload = await customAPI.post(
                    "/event/fileupload",
                    formData,
                    { headers: { "Content-Type": "multipart/form-data" } }
                );

                if (responseFileUpload.data.url) {
                    console.log("Response image", responseFileUpload.data.url);
                    posterUrl = responseFileUpload.data.url;
                }
            }

            // create 
            await customAPI.post('/event/add', {
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
                description: data.description,
                poster: posterUrl
            })

            toast.success('Success add new event!');
            navigate('/event');

        } catch (error) {
            const errorMessage = error?.response?.data?.message;
            toast.error(errorMessage);
        }
    }

    return (
        <>
            <div className="border-b border-neutral pb-5 mt-5">
                <h2 className="text-2xl font-bold capitalize">Add New Event</h2>
            </div>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="grid grid-cols-2 gap-x-4">
                    <FormInput name='name' label='Name Event' type='text' />
                    <FormInput name='organizer' label='Organizer Event' type='text' />
                </div>
                <label className="form-control">
                    <label className="label">
                        <span className="label-text capitalize">Poster</span>
                    </label>
                    <input type="file" name="poster" className="file-input file-input-bordered file-input-neutral w-full" />
                </label>
                <div className="grid grid-cols-3 gap-x-4">
                    <FormInput name='date' label='Date Event' type='date' />
                    <FormInput name='start_time' label='Start Event' type='time' />
                    <FormInput name='end_time' label='End Event' type='time' />
                </div>
                
                <div className="grid grid-cols-3 gap-x-4">
                    <FormInput name='location' label='Location Event' type='text' />
                    <FormInput name='link' label='Link Event' type='text' />
                    <FormInput name='source' label='Link Source' type='text' />
                </div>

                <div className="grid grid-cols-3 gap-x-4">
                    <FormSelect name='category' label='Category Event' list={categoryEvent}  />
                    <FormSelect name='ticket_status' label='Status Ticket Event' list={statusTicket}  />
                    <FormSelect name='status' label='Status Event' list={statusEvent}  />
                </div>
                <FormTextArea name='description' label='Description Event' />
                <input type="submit" value='Add New Event' className="btn btn-neutral btn-block mt-5 btn-md"></input>
            </form>
        </>
    )
};

export default CreateEventView;