import { useForm } from "react-hook-form";

function NewContact() {
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
        <div style={{ marginBottom: "10px" }}>
          <label>
            Company Name
            <input type="text" {...register("companyName")} />
          </label>{" "}
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>
            Unique Entity Number (UEN)
            <input type="text" {...register("UEN")} />
          </label>
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>
            Attention
            <input type="text" {...register("attention")} />
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
