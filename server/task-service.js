import postgres from "postgres";

/*
const sql = postgres('postgres://username:password@host:port/database', {
  host                 : '',            // Postgres ip address[es] or domain name[s]
  port                 : 5432,          // Postgres server port[s]
  path                 : '',            // unix socket path (usually '/tmp')
  database             : '',            // Name of database to connect to
  username             : '',            // Username of database user
  password             : '',            // Password of database user
  ssl                  : false,         // true, prefer, require, tls.connect options
  max                  : 10,            // Max number of connections
  max_lifetime         : null,          // Max lifetime in seconds (more info below)
  idle_timeout         : 0,             // Idle connection timeout in seconds
  connect_timeout      : 30,            // Connect timeout in seconds
  prepare              : true,          // Automatic creation of prepared statements
  types                : [],            // Array of custom types, see more below
  onnotice             : fn,            // Default console.log, set false to silence NOTICE
  onparameter          : fn,            // (key, value) when server param change
  debug                : fn,            // Is called with (connection, query, params, types)
  socket               : fn,            // fn returning custom socket to use
  transform            : {
    undefined          : undefined,     // Transforms undefined values (eg. to null)
    column             : fn,            // Transforms incoming column names
    value              : fn,            // Transforms incoming row values
    row                : fn             // Transforms entire rows
  },
  connection           : {
    application_name   : 'postgres.js', // Default application_name
    ...                                 // Other connection parameters, see https://www.postgresql.org/docs/current/runtime-config-client.html
  },
  target_session_attrs : null,          // Use 'read-write' with multiple hosts to
                                        // ensure only connecting to primary
  fetch_types          : true,          // Automatically fetches types on connect
                                        // on initial connection.
})
*/
/*
const sql = postgres(`postgresql://postgres:${PGPASSWORD}@db.bjdhmwonadorlgpuldci.supabase.co:5432/postgres`, {
  host: 'db.bjdhmwonadorlgpuldci.supabase.co',
  port: ''
});
*/

const sql = postgres('postgresql://postgres.bjdhmwonadorlgpuldci:Shinkyukyaku!!1@aws-1-eu-west-1.pooler.supabase.com:6543/postgres')

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