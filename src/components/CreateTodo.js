import React, {useState} from "react"
import TodoList from "./TodoList"
import swal from "sweetalert"

function CreateTodo() {

    const [todo,setTodo]=useState({title:"", done:false})
    const [todoArr, setTodoArr] =useState([])

    let todos = localStorage.hasOwnProperty("todos")? JSON.parse(localStorage.getItem("todos")):[]

    const onChange = (event) =>{
        let {value} =event.target
        let obj ={}
        obj["title"]=value
        obj["done"]=false
        setTodo(obj)
    }

    const createTodo =(event) =>{
        const {name} = event.target
        if( event.key === "Enter" || name==="addTodo"){
            if(todo.title !==""){
               todos.unshift(todo)
                localStorage.setItem('todos', JSON.stringify(todos))
                setTodo({title : "", done: false})
            }else{
         
                swal("Oops","Please Write todo first","error")
           
            }
            }
        }
    const completeTodo =(i) =>{
        if(todos[i]["done"]!== true){
            todos[i]["done"] =true
            localStorage.setItem("todos",JSON.stringify(todos))
            setTodoArr(todos)
            swal("Good Job!", "Todo completed", "success");
        }
    }

    const deleteTodo =(i) =>{
        swal({

            title:"Are you sure",
            text: "Once deleted, you will not be able to recover this title! ",
            icon:"warnig",
            buttons:true,
            dangerMode:true
        }).then(res => {
    if(res){
    todos.splice(i,1)
    localStorage.setItem('todos', JSON.stringify(todos))
    setTodoArr(todos)
        }
    })
}

    return (
        <>

        <div className="box">
            <div className="text_end">
             <h1>MY TODO APP</h1>
             <h4>Add a new TODO</h4>

            </div>
            <div className="text_addtodo">
            <input type="text" name="todo" placeholder="write here...." value={todo.title} onKeyPress={createTodo} onChange={onChange}/>
            <button classNAme="btn_addTodo" type="button" name="addtodo"  onClick={createTodo}>Add todo</button>
        </div>
        </div>
        <TodoList todoArr={todoArr}
        completeTodo={completeTodo} 
       deleteTodo={deleteTodo} />
        </>

    )
}

export default CreateTodo
