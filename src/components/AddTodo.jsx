import React, { useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Box, Button, TextField, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const AddTodo = () => {
  const [state, setState] = useState({
    todo: "",
  });
  const navigate = useNavigate()

  const handleTodoAdd = async () => {
    if(!state.todo){
      return
    }
    const payload = { userId: 1, completed: true, title: state.todo };

    try {
      const response = await axios.post(
        "https://jsonplaceholder.typicode.com/users/1/todos",
        payload
      );
      if(response){
        
        navigate("/")
      }
    } catch (err) {
      
      console.log(err);
    }
  };

  return (
    <div>
      <Box
        padding={"2%"}
        sx={{
          width:{ xs: '100%', sm: '90%', md: '50%' },
          margin: "auto",
          display: "flex",
          justifyContent: "space-between",
          border: "1px solid purple",
          bgcolor: "grey",
          color: "white",
        }}
      >
        <Link to="/">
          <ArrowBackIcon fontSize={"large"} color={"primary"}/>
        </Link>
        <Typography fontSize={"2rem"} fontWeight={"bold"}>
          Todo App
        </Typography>
      </Box>
      <Box
        sx={{
          width:{ xs: '100%', sm: '90%', md: '50%' },
          margin: "auto",
          padding: "1rem",
          marginTop: "2rem",
        }}
      >
        <TextField
          value={state.todo}
          onChange={(e) => setState({ ...state, todo: e.target.value })}
          variant="standard"
          fullWidth
          placeholder="Todo Title"
          style={{ marginBottom: "20px" }}

        />
        <Button
          variant="contained"
          sx={{ width: "100%", padding: "1rem 0", marginTop: "2rem",fontWeight:"bold" }}
          onClick={handleTodoAdd}
        >
          ADD TODO
        </Button>
      </Box>
    </div>
  );
};

export default AddTodo;
