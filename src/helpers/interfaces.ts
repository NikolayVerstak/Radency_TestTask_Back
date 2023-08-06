export interface Note {
    id: string;
    name: string;
    createdAt: string;
    updatedAt?: string;
    category: string;
    content: string;
    dates: string[];
    archived: boolean;
}

export interface NoteCreationData {
    name: string;
    category: string;
    content: string;
}
export interface NoteEditableData {
    name: string;
    category: string;
    content: string;
    archived: boolean;
}

export interface NoteUpdateData extends NoteEditableData {
    dates?: string[];
    updatedAt: string;
}

export interface CategorySummary {
    name: string;
    active: number;
    archived: number;
}
