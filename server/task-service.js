import postgres from "postgres";

const sql = postgres();

//TODO: use a different ID system than "id SERIAL PRIMARY KEY"

//Create a new task
const createTask = async (task) => {
  const { name, description } = task;
  
  const result = await sql`
    INSERT INTO tasks (name, description)
    VALUES (${name}, ${description});
  `;

  console.log(result);
}

//Get all tasks with name
const readTask = async (id) => {
  const result = await sql`
    SELECT * FROM tasks WHERE id=${id};
  `;

  console.log(result);
}

//Update a task with a given ID
const updateTask = async (id, task) => {
  const { name, description } = task;

  const result = await sql`
    UPDATE tasks
    SET name=${name}, description=${description}, time=CURRENT_TIMESTAMP
    WHERE id=${id};
  `;

  console.log(result);
}

//Delete a task 
const deleteTask = async (id) => {
  const result = await sql`DELETE FROM tasks WHERE id=${id};`;

  console.log(result);
}

const listTasks = async () => {
  const result = await sql`
    SELECT * FROM tasks WHERE name=${name}
    ORDER BY time DESC;
  `;

  return result;
}

export { createTask, readTask, updateTask, deleteTask, listTasks }