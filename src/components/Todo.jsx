import React, { useEffect, useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ListIcon from "@mui/icons-material/List";
import axios from "axios";
import TodoList from "./TodoList";

const Todo = () => {
  const [state, setState] = useState({
    todos: [],
    todo: "",
    isEditing: false,
    editId: null,
  });

  const { todos, todo,editId ,isEditing} = state;

  // fetch data on mount
  useEffect(() => {
    if (todos.length == 0) {
      fetchTodos();
    }
  }, [todos.length]);

  // function for fetching todos data from api
  const fetchTodos = async () => {
    try {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/users/1/todos"
      );
      setState((prevState) => ({ ...prevState, todos: response.data }));
    } catch (err) {
      console.log(err);
    }
  };

  // function to handle Delete of particular todo
  const handleDeleteTodo = async (id) => {
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/todos/${id}`,
        {
          method: "DELETE",
        }
      );
      if (response) {
        const updatedTodos = todos.filter((todo, i) => todo.id !== id);
        setState((prevState) => ({ ...prevState, todos: updatedTodos }));
      }
    } catch (err) {
      console.log(err);
    }
  };

  // function to handle Adding todo and editing todo
  const handleAddTodo = () => {
    if (!todo) {
      alert("Please type something!");
      return;
    }
    if (isEditing) {
      const updatedTodos = todos.map((t)=>t.id===editId?{...t,title:todo}:t);
      setState((prevState)=>({
        ...prevState,
        todos:updatedTodos,
        todo:"",
        isEditing:false,
        editId:null
      }))
    } else {
      const payload = {
        userId: 1,
        title: todo,
        completed: false,
        id: todos.length + 1,
      };
      setState((prevState) => ({
        ...prevState,
        todos: [payload, ...prevState.todos],
        todo: "",
      }));
    }
  };

  // function to toggle the status of todo from completed to incomplete
  const toggleTodoStatus = (id) => {
    const updatedTodos = todos?.map((todo, i) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setState((prevState) => ({ ...prevState, todos: updatedTodos }));
  };

  // function to filter the todo which is completed
  const filterCompletedTodo = () => {
    const filterData = todos?.filter((todo, i) => todo.completed);
    setState({ ...state, todos: filterData });
  };

  // function to handle the edit of todo details
  const handleEditTodo = (todo)=>{
  setState((prevState)=>({...prevState,todo:todo.title,editId:todo.id,isEditing:true}))
  }

  return (
    <div>
      <Box
        padding={"2%"}
        sx={{
          width: { xs: "100%", sm: "90%", md: "50%" },
          margin: "auto",
          display: "flex",
          justifyContent: "center",
          border: "1px solid purple",
          bgcolor: "grey",
          color: "white",
        }}
      >
        <Typography fontSize={"2rem"} fontWeight={"bold"}>
          Todo App
        </Typography>
      </Box>

      <Box
        sx={{
          width: { xs: "100%", sm: "90%", md: "50%" },
          margin: "auto",
          padding: "0 2rem",
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          gap: "1rem",
          boxShadow: "0 4px 16px rgba(0, 0, 0, 0.1)",
        }}
      >
        {todos.length > 0 && (
          <Box sx={{ display: "flex" }}>
            <Box
              onClick={fetchTodos}
              sx={{ textAlign: "center", padding: "1rem" }}
            >
              <ListIcon color="primary" />
              <Typography fontSize={"1.5rem"}>All</Typography>
            </Box>
            <Box
              onClick={filterCompletedTodo}
              sx={{ textAlign: "center", padding: "1rem" }}
            >
              <CheckCircleIcon color="primary" />
              <Typography fontSize={"1.5rem"}>Completed</Typography>
            </Box>
          </Box>
        )}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            margin: "auto",
            gap: "10px",
            marginTop: "2rem",
          }}
        >
          <TextField
            value={todo}
            onChange={(e) => setState((prevState)=>({ ...prevState, todo: e.target.value }))}
            variant="standard"
            fullWidth
            placeholder="Todo Title"
            style={{ marginBottom: "20px" }}
          />
          <Button
            variant="contained"
            sx={{ width: "60%", fontWeight: "bold",marginTop:"-1rem" }}
            onClick={handleAddTodo}
          >
            {isEditing?"Edit":"Add"} TODO
          </Button>
        </Box>
      </Box>

      <Box>
        <TodoList todos={todos} toggleTodoStatus={toggleTodoStatus} handleDeleteTodo={handleDeleteTodo} handleEditTodo={handleEditTodo}/>
      </Box>
    </div>
  );
};

export default Todo;
