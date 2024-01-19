import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  TextField,
} from "@mui/material";
import { Link } from "react-router-dom";
import { BACKEND_URL } from "../constants/BackendUrl";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import SearchIcon from "@mui/icons-material/Search";
import DateRangePicker from "@wojtekmaj/react-daterange-picker";
import "@wojtekmaj/react-daterange-picker/dist/DateRangePicker.css";
import "react-calendar/dist/Calendar.css";

function Business() {
  const linkStyle = {
    textDecoration: "none",
    color: "inherit",
  };

  const [invoices, setInvoices] = useState([]);
  const { getAccessTokenSilently } = useAuth0();
  const [searchQueryInvoiceNo, setSearchQueryInvoiceNo] = useState("");
  const [searchQueryCompany, setSearchQueryCompany] = useState("");

  const handleSearchQueryInvoiceNoChange = (e) => {
    setSearchQueryInvoiceNo(e.target.value);
  };

  const handleSearchQueryCompanyChange = (e) => {
    setSearchQueryCompany(e.target.value);
  };

  const currentDate = new Date();
  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  );
  const [selectedDateRange, setSelectedDateRange] = useState([
    firstDayOfMonth,
    new Date(),
  ]);

  const handleDateRangeChange = (range) => {
    //If user click the cross button, the range will be null
    // Check if the range is null
    if (!range) {
      // Reset the selectedDateRange to the default values
      setSelectedDateRange([firstDayOfMonth, new Date()]);
    } else {
      // Otherwise, update the selectedDateRange with the new range
      setSelectedDateRange(range);
    }
  };

  // It include searchQuery in the dependency array, so it fetches invoicesNo & company name when searchQuery changes
  useEffect(() => {
    const getInvoices = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/invoices`, {
          headers: {
            Authorization: `Bearer ${await getAccessTokenSilently()}`,
          },
        });
        // This code takes the response.data array and uses the sort function to arrange the invoices in descending order based on the issue_date
        // It ensures that the invoice with the most recent issue_date is placed at the beginning of the array
        const sortedInvoices = response.data.sort(
          (a, b) => new Date(b.issue_date) - new Date(a.issue_date)
        );
        setInvoices(sortedInvoices);
      } catch (error) {
        console.error(error);
      }
    };
    getInvoices();
  }, [searchQueryInvoiceNo, searchQueryCompany]);

  return (
    <div style={{ margin: "10px 10px" }}>
      <div style={{ marginBottom: "10px" }}>
        <Button variant="outlined">
          <Link to="/Invoice" style={linkStyle}>
            {"New Invoice"}
          </Link>
        </Button>
      </div>
      {/* wrap both fields in a flex container that uses a row direction */}
      <div
        style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}
      >
        <TextField
          variant="outlined"
          label="Invoice no."
          value={searchQueryInvoiceNo}
          onChange={handleSearchQueryInvoiceNoChange}
          InputProps={{
            endAdornment: (
              <IconButton>
                <SearchIcon />
              </IconButton>
            ),
          }}
          style={{ margin: "0 5px", width: "150px" }}
        />

        <TextField
          variant="outlined"
          label="Company Name"
          value={searchQueryCompany}
          onChange={handleSearchQueryCompanyChange}
          InputProps={{
            endAdornment: (
              <IconButton>
                <SearchIcon />
              </IconButton>
            ),
          }}
          style={{ margin: "0 5px", width: "150px" }}
        />

        <div style={{ fontWeight: "bold", paddingBottom: "5px" }}>
          Issue Date
        </div>
        <DateRangePicker
          onChange={handleDateRangeChange}
          value={selectedDateRange}
        />
      </div>
      <TableContainer component={Paper} style={{ marginTop: "20px" }}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>No.</TableCell>
              <TableCell>Invoice no.</TableCell>
              <TableCell>Company Name</TableCell>
              <TableCell>Issue Date</TableCell>
              <TableCell>Due Date</TableCell>
              <TableCell>Total Price($)</TableCell>
              <TableCell>GST($)</TableCell>
              <TableCell>Total Amount With GST($)</TableCell>
              <TableCell>PDF_URL</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {invoices
              .filter((invoice) =>
                invoice.invoice_no.includes(searchQueryInvoiceNo)
              )
              .filter((invoice) =>
                invoice.company_name
                  .toLowerCase()
                  .includes(searchQueryCompany.toLowerCase())
              )
              .filter((invoice) => {
                // If no date range is selected, show all invoices
                if (!selectedDateRange[0] || !selectedDateRange[1]) {
                  return true;
                }
                const issueDate = new Date(invoice.issue_date);
                const startDate = selectedDateRange[0];
                const endDate = selectedDateRange[1];
                // Check if the issue date is within the selected date range
                return issueDate >= startDate && issueDate <= endDate;
              })
              .map((invoice, index) => (
                <React.Fragment key={invoice.id}>
                  <TableRow>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{invoice.invoice_no}</TableCell>
                    <TableCell>{invoice.company_name}</TableCell>
                    <TableCell>
                      {new Date(invoice.issue_date).toLocaleDateString(
                        "en-SG",
                        {
                          timeZone: "Asia/Singapore",
                        }
                      )}
                    </TableCell>
                    <TableCell>
                      {new Date(invoice.due_date).toLocaleDateString("en-SG", {
                        timeZone: "Asia/Singapore",
                      })}
                    </TableCell>
                    <TableCell>{invoice.total_price}</TableCell>
                    {/*This converts the gst string to a floating-point number, rounds it to two decimal places, 
                  and then converts it back to a number to avoid the string format  */}
                    <TableCell>{invoice.gst}</TableCell>
                    <TableCell>{invoice.total_amount_with_gst}</TableCell>
                    <TableCell>{invoice.pdf_url}</TableCell>
                  </TableRow>
                </React.Fragment>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
export default Business;
