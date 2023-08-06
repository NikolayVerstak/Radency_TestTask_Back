import { db } from "../config/db.js";
import { Note, NoteUpdateData } from "../helpers/interfaces.js";

class NoteRepository {
    private dbNotes: Note[];

    constructor() {
        this.dbNotes = db.data.notes;
    }

    getAll(): Note[] {
        return this.dbNotes;
    }

    getOne(id: string): Note | undefined {
        return this.dbNotes.find((note) => note.id === id);
    }

    getNoteIndex(id: string): number {
        return this.dbNotes.findIndex((note) => note.id === id);
    }

    create(data: Note): Note | undefined {
        this.dbNotes.push(data);
        this.saveToDatabase();
        return this.getOne(data.id);
    }

    update(noteIndex: number, dataToUpdate: NoteUpdateData): Note {
        this.dbNotes[noteIndex] = { ...this.dbNotes[noteIndex], ...dataToUpdate };
        this.saveToDatabase();
        return this.dbNotes[noteIndex];
    }

    delete(noteIndex: number): Note {
        const deletedNote = this.dbNotes.splice(noteIndex, 1)[0];
        this.saveToDatabase();
        return deletedNote;
    }

    private saveToDatabase(): void {
        db.write();
    }
}
const noteRepository = new NoteRepository();
export { noteRepository };
