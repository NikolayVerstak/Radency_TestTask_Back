import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { Note } from "../helpers/interfaces.js";
import initialNotes from "./initialNotes.js";

import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";

const __dirname = dirname(fileURLToPath(import.meta.url));
const dbPath = join(__dirname, "database.json");

const adapter = new JSONFile<Data>(dbPath);

type Data = { notes: Note[] };

const defaultData: Data = { notes: initialNotes };
const db = new Low<Data>(adapter, defaultData);

await db.write();
export { db };
