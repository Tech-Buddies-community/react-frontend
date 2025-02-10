import React from "react";
import { Form, Link } from "react-router-dom";
import FormInput from "./Form/FormInput";
import FormSelect from "./Form/FormSelect";
import { useLoaderData } from "react-router-dom";

const FilterEvent = () => {
    const { params } = useLoaderData();
    const { name, category, ticket_status, status } = params;
    const categories = ["IT", "NON-IT Conference", "NON-IT Seminar", "NON-IT Pameran/Expo", "NON-IT Seni"];
    const statusTicket = ["Free", "Paid"];
    const statuses = ["Open", "Coming Soon"];

    return (
        <Form method="get" className="bg-base-100 rounded-md">
            <div className="px-8 py-4 grid gap-x-4 gap-y-3 grid-cols-2 items-center">
                <FormInput label="Search Event" type="search" name="name" defaultValue={name} />
                <FormSelect label="Event category" name="category" list={categories} defaulValue={category} />
                <FormSelect label="Ticket category" name="ticket_status" list={statusTicket} defaulValue={ticket_status} />
                <FormSelect label="Ticket Status" name="status" list={statuses} defaulValue={status} />
            </div>
            <div className="px-8 py-4 grid gap-x-4 gap-y-3 grid-cols-2 items-center">
                <button type="submit" className="btn btn-neutral">SEARCH</button>
                <Link to='/event' className="btn btn-error text-white">RESET</Link>
            </div>
        </Form>
    ) 
}

export default FilterEvent;