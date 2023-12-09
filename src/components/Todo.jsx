import React, { useEffect, useState } from 'react'
import {Box, Menu, Typography} from "@mui/material"
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Todo = () => {
    const [todos,setTodos]=useState([]);
    const [toggle,setToggle] = useState(false)

    useEffect(()=>{
        fetchTodos()
    },[])

    const fetchTodos=async()=>{
      try{
        const response= await axios.get("https://jsonplaceholder.typicode.com/users/1/todos")
        setTodos(response.data)
      }
      catch(err){
       console.log(err)
      }
    }
   

    const handleDeleteTodo=async(id)=>{
        try{
          const response = await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
          
        }
        catch(err){
           console.log(err)
        }
    }

    const filterCompletedTodo=()=>{
        const filterData = todos?.filter((todo,i)=>todo.completed)
        setTodos(filterData)

    }
  return (
    <div>
      <Box padding={"2%"} sx={{width:"50%",margin:"auto",display:"flex",justifyContent:"space-between",border:"1px solid purple",bgcolor:"grey",color:"white"}} >
         <Typography fontSize={"2rem"} fontWeight={"bold"}>Todo App</Typography>
         <Box sx={{bgcolor:"purple",borderRadius:"50%",padding:"1rem",color:"white"}}>
         <Link to="/add">
         <AddCircleIcon />
         </Link>
         </Box>
      </Box>
      {
        todos.length>0?<Box sx={{width:"50%",margin:"auto",display:"flex",justifyContent:"space-around",alignItems:"center", gap:"1rem",boxShadow: "0 4px 16px rgba(0, 0, 0, 0.1)"}} >
        <Box onClick={fetchTodos} sx={{textAlign:"center",padding:"2rem", }}>
            <Menu/>
           <Typography fontSize={"1.5rem"}>All</Typography>
        </Box>
        <Box onClick={filterCompletedTodo} sx={{textAlign:"center",padding:"2rem",}}>
             <CheckCircleIcon color="primary"/>
             <Typography fontSize={"1.5rem"}>Completed</Typography>
        </Box>
    </Box>:<Box>Todos not Found</Box>
      }
      <Box>
        {todos?.map((todo,i)=>(
            <Box key={todo.id} sx={{width:"50%",padding:"2rem",margin:"auto",display:"flex",justifyContent:"space-between",alignItems:"center",boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",}}>
            <Box sx={{display:"flex",justifyContent:"space-between",gap:"2rem",alignItems:"center"}}>
            <Typography>{todo.id}</Typography>    
            <Typography fontSize={"1.5rem"}>{todo.title}</Typography>
            </Box>
             <Box sx={{display:"flex",justifyContent:"space-between",alignItems:"center", gap:'2rem'}}>
                <DeleteIcon color="error" onClick={()=>handleDeleteTodo(todo.id)}/>
                <EditIcon color="primary"/>
                {todo.completed?<CheckCircleIcon color="success" onClick={()=>setToggle(false)}/>:<RadioButtonUncheckedIcon onClick={()=>setToggle(true)} color="secondary"/>}
             </Box>
            </Box>
        ))}
      </Box>
      
    </div>
  )
}

export default Todo
