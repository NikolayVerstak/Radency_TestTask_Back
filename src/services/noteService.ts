import { noteRepository } from "../repositories/noteRepository.js";
import {
    CategorySummary,
    Note,
    NoteCreationData,
    NoteEditableData,
    NoteUpdateData,
} from "../helpers/interfaces.js";
import { v4 as uuidv4 } from "uuid";

class NoteService {
    private noteRepository = noteRepository;

    getAllNotes(): Note[] {
        return this.noteRepository.getAll();
    }

    getNoteById(id: string): Note | undefined {
        return this.noteRepository.getOne(id);
    }

    createNote(data: NoteCreationData): Note | undefined {
        const newNote: Note = {
            ...data,
            id: uuidv4(),
            createdAt: new Date().toISOString(),
            dates: this.extractDatesFromContent(data.content),
            archived: false,
        };
        return this.noteRepository.create(newNote);
    }

    updateNote(id: string, dataToUpdate: NoteEditableData): Note | null {
        const noteToUpdate = this.noteRepository.getOne(id);
        const noteIndex = this.noteRepository.getNoteIndex(id);

        if (!noteToUpdate) {
            return null;
        }

        if (noteToUpdate.archived) {
            return this.toggleArchiveStatus(noteIndex, dataToUpdate, false);
        }

        if (!noteToUpdate.archived && dataToUpdate.archived) {
            return this.toggleArchiveStatus(noteIndex, dataToUpdate, true);
        }

        const updatedNote = this.buildUpdatedNote(dataToUpdate, noteToUpdate);
        return this.noteRepository.update(noteIndex, updatedNote);
    }

    deleteNote(id: string): Note | null {
        const noteIndex = this.noteRepository.getNoteIndex(id);
        if (noteIndex === -1) {
            return null;
        }

        return this.noteRepository.delete(noteIndex);
    }

    getStats(): CategorySummary[] {
        const notes = this.noteRepository.getAll();
        const categoryMap = new Map<string, CategorySummary>();
        for (const note of notes) {
            const category = note.category;
            if (categoryMap.has(category)) {
                const summary = categoryMap.get(category);
                if (summary) {
                    if (note.archived) {
                        summary.archived++;
                    } else {
                        summary.active++;
                    }
                }
            } else {
                categoryMap.set(category, {
                    name: category,
                    active: note.archived ? 0 : 1,
                    archived: note.archived ? 1 : 0,
                });
            }
        }
        return Array.from(categoryMap.values());
    }

    private buildUpdatedNote(dataToUpdate: NoteEditableData, noteToUpdate: Note): NoteUpdateData {
        const { content: newContent } = dataToUpdate;
        const newDates =
            newContent !== undefined
                ? this.extractDatesFromContent(newContent)
                : noteToUpdate.dates;

        return {
            ...dataToUpdate,
            updatedAt: new Date().toISOString(),
            dates: newDates,
        };
    }

    private toggleArchiveStatus(
        noteIndex: number,
        dataToUpdate: NoteEditableData,
        necessaryStatus: boolean
    ): Note | null {
        const { archived: newArchivedStatus } = dataToUpdate;

        if (newArchivedStatus === necessaryStatus && Object.keys(dataToUpdate).length === 1) {
            const updatedNote = {
                ...dataToUpdate,
                archived: necessaryStatus,
                updatedAt: new Date().toISOString(),
            };

            return this.noteRepository.update(noteIndex, updatedNote);
        } else {
            const errorMessage =
                necessaryStatus === true
                    ? "Not possible to archive and modify"
                    : "Archived note can't be modified";
            throw new Error(errorMessage);
        }
    }

    private extractDatesFromContent(content: string): string[] {
        const dateRegex = /\b(0?[1-9]|[12][0-9]|3[01])\/(0?[1-9]|1[0-2])\/(19\d\d|20\d\d|2100)\b/g;
        return content.match(dateRegex) || [];
    }
}
const noteService = new NoteService();

export { noteService };
