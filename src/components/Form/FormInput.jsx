import React, { useState } from "react";

const FormInput = ({label, name, type, defaultValue}) => {
    const [value, setValue] = useState(defaultValue);

    const handleChange = (event) => {
        setValue(event.target.value);
    };

    return (
        <label className="form-control">
            <label className="label">
                <span className="label-text capitalize">{label}</span>
            </label>
            <input type={type} name={name} value={value} onChange={handleChange}className="input input-bordered" />
        </label>
    )
}

export default FormInput;