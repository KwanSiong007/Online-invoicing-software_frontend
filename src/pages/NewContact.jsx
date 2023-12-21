import { useForm } from "react-hook-form";
import { BACKEND_URL } from "../constants/BackendUrl";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function NewContact() {
  const { register, handleSubmit } = useForm();
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
            <input type="text" {...register("companyName")} />
          </label>{" "}
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>
            Unique Entity Number (UEN)
            <input type="text" {...register("uen")} />
          </label>
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>
            Customer Name
            <input type="text" {...register("customerName")} />
          </label>
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>
            Email
            <input type="text" {...register("email")} />
          </label>
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>
            Phone
            <input type="number" {...register("phone")} />
          </label>
        </div>
        <input type="submit" />
      </div>
    </form>
  );
}
export default NewContact;
