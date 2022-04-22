import React from "react";
import { FormModel } from "./../../model/FormModel";

export const InputFieldCU = ({
  label,
  type = "text",
  placeholder,
  handleChange,
  id = "",
  mendetory,
  value = {},
  formName,
  ariaBy = "",
}) => {
  const error = value?.validation?.[id];

  return (
    <div className="form-group">
      {label && (
        <label for="email">
          {label}
          {mendetory && <em className="red">*</em>}
        </label>
      )}
      <input
        type={type}
        className="form-control"
        id={id}
        aria-describedby={ariaBy}
        placeholder={placeholder}
        onChange={(e) =>
          handleChange
            ? handleChange(e, id)
            : new FormModel(formName)._update({ [id]: e.target.value })
        }
        value={value[id]}
      />
      {error && <div style={{display: 'block'}} class="invalid-feedback">{error}</div>}
    </div>
  );
};
