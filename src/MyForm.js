import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  TextField,
  Button,
  Container,
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

const FormComponent = () => {
  const [formData, setFormData] = useState({
    name: "",
    language: "",
    framework: "",
  });

  const [data, setData] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [searchResult, setSearchResult] = useState(null);
  const [searched, setSearched] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8080/servers/create",
        formData
      );
      console.log("Form submitted successfully:", response.data);
      setFormData({
        name: "",
        language: "",
        framework: "",
      });
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8080/servers/create");
      console.log("Data retrieved successfully:", response.data);
      setData(response.data);
    } catch (error) {
      console.error("Error retrieving data:", error);
    }
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/servers/findByName?name=${searchName}`
      );
      console.log("API Response:", response.data);

      if (response.data.length > 0) {
        setSearchResult(response.data);
      } else {
        setSearchResult([]);
      }

      setSearched(true); // Set searched to true after performing the search.
    } catch (error) {
      console.error("Error searching by name:", error);
      setSearchResult([]);
      setSearched(true); // Set searched to true even if there was an error.
    }
  };

  const handleReset = () => {
    setSearchName("");
    setSearchResult(null);
    setSearched(false); // Reset the searched state
  };

  const handleUpdate = (item) => {
    // Handle update action here
    // You can pre-fill the form with the selected item's data for editing
  };

  const handleDelete = async (item) => {
    try {
      await axios.delete(`http://localhost:8080/servers/${item.id}`);
      setData(data.filter((dataItem) => dataItem.id !== item.id));
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Container maxWidth="xl" mt={2}>
      <Typography
        textAlign={"center"}
        variant="h5"
        fontWeight={"bold"}
        style={{ marginTop: "35px" }}
      >
        CRUD Operation Using React Js & Springboot
      </Typography>
      <Box mt={5}>
        <Container maxWidth="lg">
          <form onSubmit={handleSubmit}>
            <div style={{ display: "flex", gap: "50px" }}>
              <TextField
                label="Name"
                variant="outlined"
                fullWidth
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <TextField
                label="Language"
                variant="outlined"
                fullWidth
                name="language"
                value={formData.language}
                onChange={handleChange}
                required
              />
              <TextField
                label="Framework"
                variant="outlined"
                fullWidth
                name="framework"
                value={formData.framework}
                onChange={handleChange}
                required
              />
            </div>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              maxWidth="md"
              size="medium"
              style={{ marginTop: "20px" }}
            >
              Submit
            </Button>
          </form>
        </Container>
      </Box>
      <Container maxWidth="lg">
        <Typography variant="h5" gutterBottom marginTop={"50px"}>
          Mongodb Records
        </Typography>
        <div style={{ display: "flex", gap: "16px" }}>
          <TextField
            label="Search by Name"
            variant="outlined"
            fullWidth
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            margin="normal"
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleSearch}
            style={{ marginTop: "16px" }}
          >
            Search
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleReset}
            style={{ marginTop: "16px" }}
          >
            Reset
          </Button>
        </div>
        <div style={{ marginTop: "16px" }}>
          {searched && searchResult.length === 0 ? (
            <Typography variant="body1" color="error">
              Record not found
            </Typography>
          ) : (
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow style={{ backgroundColor: "#778899" }}>
                    <TableCell>ID</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Language</TableCell>
                    <TableCell>Framework</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {searchResult !== null
                    ? searchResult.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell>{item.id}</TableCell>
                          <TableCell>{item.name}</TableCell>
                          <TableCell>{item.language}</TableCell>
                          <TableCell>{item.framework}</TableCell>
                          <TableCell>
                            <Button
                              style={{ color: "#1976D2" }}
                              onClick={() => handleUpdate(item)}
                            >
                              Edit
                            </Button>
                            <Button
                              style={{ color: "#F44336" }}
                              onClick={() => handleDelete(item)}
                            >
                              Delete
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    : data.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell>{item.id}</TableCell>
                          <TableCell>{item.name}</TableCell>
                          <TableCell>{item.language}</TableCell>
                          <TableCell>{item.framework}</TableCell>
                          <TableCell>
                            <Button
                              style={{ color: "#1976D2" }}
                              onClick={() => handleUpdate(item)}
                            >
                              Edit
                            </Button>
                            <Button
                              style={{ color: "#F44336" }}
                              onClick={() => handleDelete(item)}
                            >
                              Delete
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </div>
      </Container>
      <Typography
        variant="h6"
        color="textSecondary"
        align="center"
        style={{ marginTop: "50px" }}
      >
        Nihaal Ahmed - nihaalahmed.it@gmail.com
      </Typography>
    </Container>
  );
};

export default FormComponent;
