let submitButton = document.getElementsByClassName("submitBtn")[0];
let taskNameInput = document.getElementById("taskName");
let dateInput = document.getElementById("date");
let priorityInput = document.getElementById("priority");

let isValid = [false, false, false];
let tasks = [];
let priorityColor;
submitButton.addEventListener("click",()=> {
    if(taskNameInput.value.trim() === ""){
        document.getElementById("errorNameMessage").classList.remove("hidden");
        isValid[0] = false;
    }else {
        document.getElementById("errorNameMessage").classList.add("hidden");
        let regex = new RegExp("^[a-zA-Z0-9\\s]+$");
        if(!regex.test(taskNameInput.value.trim())){
            document.getElementById("errorNameMessage").classList.remove("hidden");
            isValid[0] = false;
        }else {
            document.getElementById("errorNameMessage").classList.add("hidden");
            isValid[0] = true;
        }
    }
    if(dateInput.value.trim() === ""){
        document.getElementById("errorDateMessage").classList.remove("hidden");
        isValid[1] = false;
    }else {
        document.getElementById("errorDateMessage").classList.add("hidden");
        let taskDate = new Date(dateInput.value.trim());
        taskDate.setHours(0, 0, 0, 0);
        let today = new Date();
        today.setHours(0, 0, 0, 0);
        if(taskDate < today){
            document.getElementById("errorDateMessage").classList.remove("hidden");
            isValid[1] = false;
        }else {
            document.getElementById("errorDateMessage").classList.add("hidden");
            isValid[1] = true;
        }
    }
    if(priorityInput.value.trim() === "select"){
        document.getElementById("errorPriorityMessage").classList.remove("hidden");
        isValid[2] = false;
    }else {
        document.getElementById("errorPriorityMessage").classList.add("hidden");
        isValid[2] = true;
        if(priorityInput.value.trim() === "High"){
            priorityColor = "text-red";
        }else if(priorityInput.value.trim() === "Low"){
            priorityColor = "text-green";
        }else if(priorityInput.value.trim() === "Medium"){
            priorityColor = "text-yellow";
        }
    }
    if(isValid[0] + isValid[1] + isValid[2] === 3){
        let task = {
            name: taskNameInput.value,
            dueDate: dateInput.value,
            priority: priorityInput.value
        }
        tasks.push(task);
        let table = document.getElementById("taskList");
        table.innerHTML = "";
        for(let i = 0; i < tasks.length; i++){
            let color;
            if(tasks[i].priority === "High"){
                color = "text-red-500";
            }else if(tasks[i].priority === "Medium"){
                color = "text-yellow-500";
            }else {
                color = "text-green-500";
            }
            table.innerHTML += `
                 <tr class="bg-white border-b border-gray-200">
                    <td class="px-6 py-4 font-medium text-black">${tasks[i].name}</td>
                    <td class="px-6 py-4 font-medium">${tasks[i].dueDate}</td>
                    <td class="px-6 py-4 font-medium ${color}">${tasks[i].priority}</td>
                    <td class="px-6 py-4">
                        <button type="button" onclick="statusBtn(${i})" class="statusBtn text-white bg-yellow-500 font-medium rounded-lg text-sm px-5 py-2 text-center inline-flex items-center transition-all duration-400 ease-in-out w-[91px]">Pending</button>
                    </td>
                 </tr>
            `;
        }
    }
});

function statusBtn(index){
    const button = document.querySelectorAll(".statusBtn")[index];
    if (button.innerHTML === "Pending") {
        button.innerHTML = "Completed";
        button.classList.remove("bg-yellow-500");
        button.classList.add("bg-green-500");
        button.classList.remove("w-[91px]");
        button.classList.add("w-[110px]");
    }else {
        button.innerHTML = "Pending";
        button.classList.remove("bg-green-500");
        button.classList.add("bg-yellow-500");
        button.classList.remove("w-[110px]");
        button.classList.add("w-[91px]");
    }
}