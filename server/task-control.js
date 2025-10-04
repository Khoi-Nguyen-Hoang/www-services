//import { Eta } from "https://deno.land/x/eta@v3.1.0/src/index.ts";
import * as taskService from "./task-service.js";

//const eta = new Eta({ views: `${Deno.cwd()}/templates/` });

//Pass task as JSON file
const createTask = async (c) => {
  const body = await c.req.json();
  
  const result = await taskService.createTask(body);
  return c.json(result, 201);
}

const showTask = async (c) => {
  const id = c.req.param('id');

  return c.json(taskService.readTask(id));
}

const updateTask = async (c) => {
  const id = c.req.param('id');
  const body = await c.req.json();

  const result = await taskService.updateTask(id, body);
  return c.json(result, 201);
}

const deleteTask = async (c) => {
  const id = c.req.param('id');

  await taskService.deleteTask(id);
  return c.json({ message: "task deleted" }, 200);
}

export { createTask, showTask, updateTask, deleteTask }