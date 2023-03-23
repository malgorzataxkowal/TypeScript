import {v4 as uuidV4} from 'uuid';
type Task={
    title:string,
    created:Date,
    completed?:boolean,
}

const list= document.querySelector<HTMLUListElement>("#itemList")
const inputTask= document.querySelector<HTMLInputElement>("#task")
const addButton= document.querySelector('button');
const tasksList:Task[]=loadTaske()
tasksList.forEach(item=>addTask(item))

function addTask(task:Task){
    const listElement= document.createElement("li")
    const label= document.createElement("label")
    const checkbox=document.createElement("input")
    checkbox.type="checkbox"
    checkbox.addEventListener("change", ()=>{
        task.completed=checkbox.checked
        saveTasks()
    })
    checkbox.checked=task.completed ?? false
    label.append(task.title, checkbox)
    listElement.append(label)
    list?.append(listElement)
}
addButton?.addEventListener("click",e=>{
    e.preventDefault()
    if (inputTask?.value==="" || inputTask?.value===undefined) return
    const myTask:Task={        
        title:inputTask.value,
        created: new Date()
    }
    
    addTask(myTask); 
    inputTask.value=""
    tasksList.push(myTask)
    saveTasks()
})
function saveTasks(){
    window.localStorage.setItem("ToDoList", JSON.stringify(tasksList))
}
function loadTaske():Task[]{
    const tasksJSON= window.localStorage.getItem("ToDoList")
    if (tasksJSON ==null) return []
    return JSON.parse(tasksJSON)
}



