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


const CreateProgramView = () => {
    const statusTicket = ["Free", "Paid"];
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
                    "/program/fileupload",
                    formData,
                    { headers: { "Content-Type": "multipart/form-data" } }
                );

                if (responseFileUpload.data.url) {
                    console.log("Response image", responseFileUpload.data.url);
                    posterUrl = responseFileUpload.data.url;
                }
            }
    
            // Kirim data event dengan poster URL yang sudah ditentukan
            await customAPI.post("/program/add", {
                name: data.name,
                organizer: data.organizer,
                deadline_registration: data.deadline_registration,
                location: data.location,
                information: data.information,
                registration: data.registration,
                ticket_status: data.ticket_status,
                status: data.status,
                description: data.description,
                poster: posterUrl,
            });
    
            toast.success("Success add new program!");
            navigate("/program");
        } catch (error) {
            const errorMessage = error?.response?.data?.message;
            toast.error(errorMessage);
        }
    };    

    return (
        <>
            <div className="border-b border-neutral pb-5 mt-5">
                <h2 className="text-2xl font-bold capitalize">Add New Program</h2>
            </div>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="grid grid-cols-2 gap-x-4">
                    <FormInput name='name' label='Name Program' type='text' />
                    <FormInput name='organizer' label='Organizer Program' type='text' />
                </div>
                <label className="form-control">
                    <label className="label">
                        <span className="label-text capitalize">Poster</span>
                    </label>
                    <input type="file" name="poster" className="file-input file-input-bordered file-input-neutral w-full" />
                </label>
                <div className="grid grid-cols-2 gap-x-4">
                    <FormInput name='deadline_registration' label='Deadline Registration' type='date' />
                    <FormInput name='location' label='Location Program' type='text' />
                </div>
                
                <div className="grid grid-cols-2 gap-x-4">
                    <FormInput name='registration' label='Link Registration' type='text' />
                    <FormInput name='information' label='Link Information' type='text' />
                </div>

                <div className="grid grid-cols-2 gap-x-4">
                    <FormSelect name='ticket_status' label='Status Ticket Program' list={statusTicket}  />
                    <FormSelect name='status' label='Status Program' list={statusEvent}  />
                </div>
                <FormTextArea name='description' label='Description Program' />
                <input type="submit" value='Add New Program' className="btn btn-neutral btn-block mt-5 btn-md"></input>
            </form>
        </>
    )
};

export default CreateProgramView;