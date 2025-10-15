import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  CircularProgress, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, TextField, Button
} from "@mui/material";

function UserTable() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [feedback, setFeedback] = useState({ name: "", comment: "", rating: "" });
  const [message, setMessage] = useState("");

  // Fetch users data from API
  useEffect(() => {
    axios.get("https://jsonplaceholder.typicode.com/users")
      .then(response => {
        setUsers(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching users:", error);
        setLoading(false);
      });
  }, []);

  // Handle feedback form change
  const handleChange = (e) => {
    setFeedback({ ...feedback, [e.target.name]: e.target.value });
  };

  // Handle feedback submission
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:5000/feedback", feedback)
      .then(res => {
        setMessage("Feedback submitted successfully!");
        setFeedback({ name: "", comment: "", rating: "" });
      })
      .catch(err => {
        setMessage("Error submitting feedback");
      });
  };

  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <CircularProgress />
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>User Data Table</h2>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><b>Name</b></TableCell>
              <TableCell><b>Email</b></TableCell>
              <TableCell><b>Phone</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map(user => (
              <TableRow key={user.id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.phone}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <h3 style={{ marginTop: "40px" }}>Feedback Form</h3>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Name"
          name="name"
          value={feedback.name}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Comment"
          name="comment"
          value={feedback.comment}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Rating (1-5)"
          name="rating"
          value={feedback.rating}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <Button variant="contained" type="submit" sx={{ mt: 2 }}>Submit</Button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default UserTable;
