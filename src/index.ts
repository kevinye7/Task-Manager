import { v4 as createId} from 'uuid'

const list = document.querySelector("#list") as HTMLUListElement
const form = document.querySelector("#new-task-form") as HTMLFormElement
const input = document.querySelector("#new-task-description") as HTMLInputElement

type Task = {
    id: string,
    description: string,
    completed: boolean,
}

// Load tasks from localStorage
const tasks: Task[] = loadTasks()
tasks.forEach(addTask)

form?.addEventListener("submit", e => {
    e.preventDefault()

    if (input?.value == "" || input?.value == null) return

    const newTask: Task = {
        id: createId(),
        description: input.value,
        completed: false
    }

    tasks.push(newTask)
    saveTasks()

    addTask(newTask)
    input.value = ""
})

// Function to add task item to the list
function addTask(task: Task) {
    const item = document.createElement("li")
    const label = document.createElement("label")
    const checkbox = document.createElement("input")

    checkbox.type = "checkbox"
    checkbox.checked = task.completed

    if (task.completed) label.style.textDecoration = "line-through"

    checkbox.addEventListener("change", () => {
        task.completed = checkbox.checked
        saveTasks()

        label.style.textDecoration = task.completed ? "line-through" : "none"
    })

    label.append(checkbox, task.description)
    item.append(label)
    list?.append(item)
}

// Function to save tasks to localStorage
function saveTasks() {
    localStorage.setItem("Tasks", JSON.stringify(tasks))
}

// Function to load tasks from localStorage
function loadTasks(): Task[] {
    const taskJSON = localStorage.getItem("Tasks")
    return taskJSON ? JSON.parse(taskJSON) : []
}