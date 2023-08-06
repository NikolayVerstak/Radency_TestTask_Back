import { Router } from "express";
import { archiveOrModifyNote, noteIsArchived, notFoundNote } from "../helpers/customErrors.js";
import { noteService } from "../services/noteService.js";
import validateRequest from "../middlewares/note.validation.middleware.js";
import { createNoteSchema, updateNoteSchema } from "../helpers/yupSchemas.js";

const router = Router();

router.get("/", (req, res, next) => {
    try {
        const notes = noteService.getAllNotes();
        next(notes);
    } catch (error) {
        next(error);
    }
});

router.get("/stats", async (req, res, next) => {
    try {
        const stats = noteService.getStats();
        next(stats);
    } catch (error) {
        next(error);
    }
});

router.get("/:id", async (req, res, next) => {
    const { id } = req.params;
    try {
        const note = noteService.getNoteById(id);
        if (!note) {
            next(notFoundNote(id));
        } else {
            next(note);
        }
    } catch (error) {
        next(error);
    }
});

router.post("/", validateRequest(createNoteSchema), async (req, res, next) => {
    const newNote = req.body;

    try {
        const createdNote = noteService.createNote(newNote);
        next(createdNote);
    } catch (error) {
        next(error);
    }
});

router.patch("/:id", validateRequest(updateNoteSchema), async (req, res, next) => {
    const { id } = req.params;
    const updatedData = req.body;

    try {
        const updatedNote = noteService.updateNote(id, updatedData);

        if (!updatedNote) {
            next(notFoundNote(id));
        } else {
            next(updatedNote);
        }
    } catch (error) {
        if ((error as Error).message.includes("Archived note can't be modified")) {
            next(noteIsArchived(id));
        } else if ((error as Error).message.includes("Not possible to archive and modify")) {
            next(archiveOrModifyNote(id));
        }
        next(error);
    }
});

router.delete("/:id", async (req, res, next) => {
    const { id } = req.params;

    try {
        const deletedNote = noteService.deleteNote(id);
        if (!deletedNote) {
            next(notFoundNote(id));
        } else {
            next(deletedNote);
        }
    } catch (error) {
        next(error);
    }
});

export { router };
