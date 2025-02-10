import React from "react";

const FormSelect = ({label, name, list, defaulValue}) => {
    return (
        <div className="form-control">
            <label className="label">
                <span className="capitalize label-text">{label}</span>
            </label>
            <select name={name} className="select select-bordered" defaultValue={defaulValue}>
                {list.map((item) => {
                    return (
                        <option key={item} value={item}>
                            {item}
                        </option>
                    )
                })}
            </select>
        </div>
    )
}

export default FormSelect;