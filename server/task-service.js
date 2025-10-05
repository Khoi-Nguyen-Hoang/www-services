import postgres from "postgres";

const sql = postgres();

//Create a new task
const createTask = async (task) => {
  const id = crypto.randomUUID();
  
  const { name, description } = task;
  
  const result = await sql`
    INSERT INTO tasks (id, name, description)
    VALUES (${id}, ${name}, ${description})
    RETURNING *;
  `;

  console.log(result[0]);
}

//Get task with id
const readTask = async (id) => {
  const result = await sql`
    SELECT * FROM tasks WHERE id=${id};
  `;

  return result[0];
}

//Update a task of a given ID
const updateTask = async (id, task) => {
  const { name, description } = task;

  const result = await sql`
    UPDATE tasks
    SET name=${name}, description=${description}, time=CURRENT_TIMESTAMP
    WHERE id=${id}
    RETURNING *;
  `;

  console.log(result[0]);
}

//Delete a task 
const deleteTask = async (id) => {
  const result = await sql`DELETE FROM tasks WHERE id=${id} RETURNING *;`;

  console.log(result[0]);
}

const listAllTasks = async () => {
  const result = await sql`
    SELECT * FROM tasks
    ORDER BY time DESC;
  `;

  return result;
}

const markTaskAsComplete = async (id) => {
  const result = await sql `
    UPDATE tasks
    SET completed=${true}, time=CURRENT_TIMESTAMP
    WHERE id=${id}
  `;
}

const markTaskAsIncomplete = async (id) => {
  const result = await sql `
    UPDATE tasks
    SET completed=${false}, time=CURRENT_TIMESTAMP
    WHERE id=${id}
  `;
}

export { createTask, readTask, updateTask, deleteTask, listAllTasks, markTaskAsComplete, markTaskAsIncomplete }