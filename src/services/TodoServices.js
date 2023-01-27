import {default as axios} from 'axios';
export default class TodoService{
    getTodos(currentPage,value=null){
        return axios.get("http://localhost:8000/api/todo",{params:{
            page:currentPage,
            name:value? value.name :null
        }});
    }
    deleteTodo(id){
        return axios.delete("http://localhost:8000/api/todo/"+id)
    }
    getTodo(id){
        return axios.get("http://localhost:8000/api/todo/"+id)
    }
    createTodo(value){
        return axios.post("http://localhost:8000/api/todo/",value)
    }
    editTodo(id,value){
        return axios.put("http://localhost:8000/api/todo/"+id,value)
    }
    autocomplete(value){
        return axios.post("http://localhost:8000/api/todo/autocomplete",value)
    }
}