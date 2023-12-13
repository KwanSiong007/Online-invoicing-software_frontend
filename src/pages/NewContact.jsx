// import { Typography } from "@mui/material";
import { useForm } from "react-hook-form";

function Contacts() {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log(data);
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
        <label>
          Company Name
          <input type="text" {...register("companyName")} />
        </label>
        <label>
          Unique Entity Number (UEN)
          <input type="number" {...register("UEN")} />
        </label>
        <label>
          Attention
          <input type="text" {...register("attention")} />
        </label>
        <label>
          Email
          <input type="text" {...register("email")} />
        </label>
        <label>
          Phone
          <input type="number" {...register("phone")} />
        </label>
        <input type="text" placeholder="Email..." {...register("email")} />
        <input type="number" placeholder="Age..." {...register("age")} />
        <input
          type="password"
          placeholder="Password..."
          {...register("password")}
        />
        <input
          type="password"
          placeholder="Confirm Password..."
          {...register("confirmPassword")}
        />
        <input type="submit" />
      </div>
    </form>
  );
}
export default Contacts;
