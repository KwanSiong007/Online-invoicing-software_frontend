import { useForm } from "react-hook-form";
import { BACKEND_URL } from "../constants/BackendUrl";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function NewContact() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    axios
      .post(`${BACKEND_URL}/contacts/add`, {
        companyName: data.companyName,
        uen: data.uen,
        customerName: data.customerName,
        email: data.email,
        phone: data.phone,
      })
      .then(navigate(`/Contacts`));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          width: "90vw",
          fontFamily: "Arial, Helvetica, sans-serif",
          marginTop: "10px",
        }}
      >
        <div style={{ marginBottom: "10px" }}>
          <label>
            <strong>Please insert the new contact details.</strong>
          </label>
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>
            Company Name
            <input
              type="text"
              {...register("companyName", {
                required: "Company Name is required",
              })}
            />
          </label>
          {errors.companyName && <p>{errors.companyName.message}</p>}
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>
            Unique Entity Number (UEN)
            <input
              type="text"
              {...register("uen", { required: "UEN is required" })}
            />
          </label>
          {errors.uen && <p>{errors.uen.message}</p>}
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>
            Customer Name
            <input
              type="text"
              {...register("customerName", {
                required: "Customer Name is required",
              })}
            />
          </label>
          {errors.customerName && <p>{errors.customerName.message}</p>}
        </div>
        <div style={{ marginBottom: "10px" }}>
          {/* pattern: {...}: This rule is used to specify a regular expression (regex) that the input value must match to be considered valid. 
          The regex used here is a common pattern for validating email addresses. 
          If the input doesn't match this pattern, React Hook Form will return an error object containing the message "Invalid email address". */}
          <label>
            Email
            <input
              type="text"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value:
                    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  message: "Invalid email address",
                },
              })}
            />
          </label>
          {errors.email && <p>{errors.email.message}</p>}
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>
            Phone
            <input
              type="number"
              {...register("phone", {
                required: "Phone number is required",
              })}
            />
          </label>
          {errors.phone && <p>{errors.phone.message}</p>}
        </div>
        <input type="submit" />
      </div>
    </form>
  );
}
export default NewContact;
