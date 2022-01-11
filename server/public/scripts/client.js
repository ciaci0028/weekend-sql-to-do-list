$(document).ready( function() {
    console.log('client.js working');

    //Click listeners
    clickListeners();

    // Render function
    getTasks();
}); // End of .ready function

function clickListeners(){
    console.log('listening for clicks');

    // Submit listener
    $('#taskForm').on('submit', addTasks);

    // Delete button
    $(document).on('click', '.deleteBtn', deleteTasks);

    // Complete button listener
    $(document).on('click', '.completeBtn', modifyTasks)

}; // End of clickListeners function

// Render tasks function
function renderTasks(tasks) {
    console.log('in render function', tasks);

    // Empty the table
    $('#taskTable').empty();

    // Render each new task
    for (let task of tasks) {
        $('#taskTable').append(`
            <tr data-id=${task.id}>
                <td class="task">${task.task}</td>
                <td class="notes">${task.notes}</td>
                <td class="completion">${task.completion}</td>
                <td>
                    <button class="completeBtn">
                        Completed
                    </button>
                </td>
                <td>
                    <button class="deleteBtn">
                        Delete
                    </button>
                </td>
            </tr>
        `);
    }
}; //End of render Tasks function

// GET Ajax
function getTasks(){
    console.log('in getTasks function');

    $.ajax({
        method: 'GET',
        url: '/tasks'
    })
    .then((res) => {
        console.log('get response', res);
        renderTasks(res);
    })
    .catch((err) => {
        console.log('error with getting tasks', err);
    })
}; // End of getTasks function

// POST Ajax
function addTasks(){
    console.log('in addTasks function');

    let newTask = {
        task: $('#taskIn').val(),
        notes: $('#notesIn').val(),
    };

    $.ajax({
        method: 'POST',
        url: '/tasks',
        data: newTask
    })
    .then((res) => {
        console.log('post response', res);
    })
    .catch((err) => {
        console.log('error with posting tasks', err);
    })
}; // End of addTask function

// DELETE Ajax
function deleteTasks(){
    console.log('in deleteTasks function');

    // Setting variable to get id
    let taskId = $(this).parents('tr').data('id');

    $.ajax({
        method: 'DELETE',
        url: `/tasks/${taskId}`,
    })
    .then((res) => {
        console.log('delete response', res);
        getTasks();
    })
    .catch((err) => {
        console.log('error with deleting task', err);
        
    })
}; // End of deleteTasks function

// PUT Ajax
function modifyTasks() {
    console.log('in modify tasks')

    // Setting variable to get id
    let taskId = $(this).parents('tr').data('id');

    // Gathering other information via variables
    // let taskTask = $(this).parent().siblings('.task').text();
    // let taskNotes = $(this).parent().siblings('.notes').text();
    // let taskCompletion = $(this).parent().siblings('.completion').text();
    
    // Ajax request
    $.ajax({
        method: "PUT",
        url: `/tasks/${taskId}`
    })
    .then((res) => {
        console.log('completion success', res)
        getTasks();
    })
    .catch((err) => {
        console.log('error modifying task', err);
    });

}; // End of modifyTasks function
