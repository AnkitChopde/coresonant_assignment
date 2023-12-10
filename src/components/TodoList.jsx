import { Box, Typography } from '@mui/material'
import React from 'react'
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const TodoList = ({todos,handleDeleteTodo,handleEditTodo,toggleTodoStatus}) => {

  return (
    <>
    {todos?.map((todo, i) => (
          <Box
            key={todo.id}
            sx={{
              width: { xs: "100%", sm: "90%", md: "50%" },
              padding: "2rem",
              margin: "auto",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                gap: "2rem",
                alignItems: "center",
              }}
            >
              <Typography>{todo.id}</Typography>
              <Typography fontSize={"1.5rem"}>{todo.title}</Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "2rem",
              }}
            >
              <DeleteIcon
                color="error"
                onClick={() => handleDeleteTodo(todo.id)}
              />
              <EditIcon color="primary" onClick={()=>handleEditTodo(todo)}/>
              {todo.completed ? (
                <CheckCircleIcon
                  color="success"
                  onClick={() => toggleTodoStatus(todo.id)}
                />
              ) : (
                <RadioButtonUncheckedIcon
                  onClick={() => toggleTodoStatus(todo.id)}
                  color="secondary"
                />
              )}
            </Box>
          </Box>
        ))}
    </>
  )
}

export default TodoList
