import { useForm, Controller, useFieldArray } from "react-hook-form";
import { BACKEND_URL } from "../constants/BackendUrl";
import axios from "axios";
import { useEffect, useState } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { useAuth0 } from "@auth0/auth0-react";

function Invoice() {
  const { register, handleSubmit, control, setValue, watch, reset } = useForm({
    defaultValues: {
      items: [
        { invoiceItem: "", description: "", quantity: "", priceOfEachItem: "" },
      ],
    },
  });
  const [companies, setCompanies] = useState([]);
  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  });
  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    const getContacts = async () => {
      try {
        let response = await axios.get(`${BACKEND_URL}/contacts`, {
          headers: {
            Authorization: `Bearer ${await getAccessTokenSilently()}`,
          },
        });

        setCompanies(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    getContacts();
  }, []);

  const companyLabelOptions = companies.map((company) => ({
    label: company.company_name,
    value: company.id,
    customer_id: company.id,
    uen: company.uen,
    customer_name: company.customer_name,
    email: company.email,
    phone: company.phone,
  }));

  const watchedItems = watch("items");

  const calculateItemTotalPrice = (quantity, priceOfEachItem) => {
    const quantityNum = parseFloat(quantity) || 0;
    const priceNum = parseFloat(priceOfEachItem) || 0;
    return quantityNum * priceNum;
  };

  const calculateTotalPrice = () => {
    return watchedItems.reduce((acc, currentItem) => {
      return (
        acc +
        calculateItemTotalPrice(
          currentItem.quantity,
          currentItem.priceOfEachItem
        )
      );
    }, 0);
  };

  const calculateGst = () => {
    return calculateTotalPrice() * 0.09;
  };

  const calculateTotalAmountWithGst = () => {
    return calculateTotalPrice() + calculateGst();
  };

  // Trigger the calculation of the total price whenever items change
  useEffect(() => {
    setValue("totalPrice", calculateTotalPrice().toFixed(2));
  }, [watchedItems]);

  const onSubmit = async (data) => {
    try {
      // Make the POST request to the server with the access token in the Authorization header
      await axios.post(
        `${BACKEND_URL}/invoices/add`,
        {
          customerID: data.customerIDField,
          companyName: data.autocompleteField.label,
          uen: data.uenField,
          customerName: data.customerNameField,
          email: data.emailField,
          phone: data.phoneField,
          invoiceNumber: data.invoiceNumber,
          issueDate: data.issueDate,
          dueDate: data.dueDate,
          invoiceItems: data.items,
          totalPrice: calculateTotalPrice(),
          gst: calculateGst(),
          totalAmountWithGst: calculateTotalAmountWithGst(),
        },
        {
          headers: {
            Authorization: `Bearer ${await getAccessTokenSilently()}`,
          },
        }
      );
      // Reset the form after successful submission
      reset();
    } catch (error) {
      console.error(error);
    }
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
            <strong>Please insert the invoice details.</strong>
          </label>
        </div>
        {/* control={control}: Provides the form control methods from
        react-hook-form. */}
        {/* render={({ field: { onChange, value } }) => (...)}: Defines a render function that receives the onChange 
        and value properties from react-hook-form. */}
        <Controller
          name="autocompleteField"
          control={control}
          defaultValue={null}
          render={({ field: { onChange, value } }) => (
            <Autocomplete
              value={value}
              onChange={(e, newValue) => {
                //onChange is a function passed from react-hook-form that updates the form value.
                //This line calls the onChange function and passes the selected newValue, updating the form value with the selected option.
                onChange(newValue);
                //setValue is a function from react-hook-form used to set values for specific form fields.
                //It sets the value of the field with the name "customerIDField" to newValue.customer_id if newValue is truthy, otherwise, it sets it to null.
                setValue(
                  "customerIDField",
                  newValue ? newValue.customer_id : null
                );
                setValue("uenField", newValue ? newValue.uen : null);
                setValue(
                  "customerNameField",
                  newValue ? newValue.customer_name : null
                );
                setValue("emailField", newValue ? newValue.email : null);
                setValue("phoneField", newValue ? newValue.phone : null);
              }}
              //Following line Provides the array of options for the autocomplete.
              options={companyLabelOptions}
              getOptionLabel={(option) => option.label}
              getOptionSelected={(option, value) =>
                option.value === value.value
              }
              //{...params}: Spreads the params object to apply its properties to the TextField.
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Customer details"
                  style={{ width: 300 }}
                />
              )}
            />
          )}
        />
        <Controller
          name="customerIDField"
          control={control}
          defaultValue={null}
          render={({ field }) => <input type="hidden" {...field} />}
        />
        <Controller
          name="uenField"
          control={control}
          defaultValue={null}
          render={({ field }) => <input type="hidden" {...field} />}
        />
        <Controller
          name="customerNameField"
          control={control}
          defaultValue={null}
          render={({ field }) => <input type="hidden" {...field} />}
        />
        <Controller
          name="emailField"
          control={control}
          defaultValue={null}
          render={({ field }) => <input type="hidden" {...field} />}
        />
        <Controller
          name="phoneField"
          control={control}
          defaultValue={null}
          render={({ field }) => <input type="hidden" {...field} />}
        />
        <div style={{ marginBottom: "10px" }}>
          <label>
            Invoice number
            <input type="text" {...register("invoiceNumber")} />
          </label>
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>
            Issue date
            <input type="date" {...register("issueDate")} />
          </label>
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>
            Due date
            <input type="date" {...register("dueDate")} />
          </label>
        </div>

        <table>
          <thead>
            <tr>
              <th>Number</th>
              <th>Invoice Item</th>
              <th>Description</th>
              <th>Quantity</th>
              <th>Price of Each Item</th>
              <th>Total Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {fields.map((item, index) => (
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td>
                  <input
                    {...register(`items[${index}].invoiceItem`)}
                    defaultValue={item.invoiceItem}
                  />
                </td>
                <td>
                  <input
                    {...register(`items[${index}].description`)}
                    defaultValue={item.description}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    {...register(`items[${index}].quantity`)}
                    defaultValue={item.quantity}
                    onChange={() => {
                      // Trigger re-calculation when quantity changes
                      const values = watchedItems;
                      values[index].quantity = event.target.value;
                      setValue("items", values);
                    }}
                  />
                </td>
                <td>
                  <input
                    {...register(`items[${index}].priceOfEachItem`, {
                      pattern: {
                        value: /^\d+(\.\d{1,2})?$/,
                        message: "Maximum two decimal places allowed.",
                      },
                    })}
                    defaultValue={item.priceOfEachItem}
                    onChange={() => {
                      // Trigger re-calculation when quantity changes
                      const values = watchedItems;
                      values[index].priceOfEachItem = event.target.value;
                      setValue("items", values);
                    }}
                  />
                </td>
                <td>
                  {calculateItemTotalPrice(
                    watchedItems[index]?.quantity,
                    watchedItems[index]?.priceOfEachItem
                  ).toFixed(2)}
                </td>
                <td>
                  <button type="button" onClick={() => remove(index)}>
                    Remove
                  </button>
                </td>
              </tr>
            ))}

            <tr>
              <td colSpan="4"></td>
              <td>Total price:</td>
              <td>{calculateTotalPrice().toFixed(2)}</td>
              <td></td>
            </tr>
            <tr>
              <td colSpan="4"></td>
              <td>GST (9%):</td>
              <td>{calculateGst().toFixed(2)}</td>
              <td></td>
            </tr>
            <tr>
              <td colSpan="4"></td>
              <td>Total amount with GST:</td>
              <td>{calculateTotalAmountWithGst().toFixed(2)}</td>
              <td></td>
            </tr>
          </tbody>
        </table>
        <button
          type="button"
          onClick={() =>
            append({
              invoiceItem: "",
              description: "",
              quantity: "",
              priceOfEachItem: "",
            })
          }
        >
          Add Row
        </button>
        <button type="submit">Send Email</button>
      </div>
    </form>
  );
}
export default Invoice;
