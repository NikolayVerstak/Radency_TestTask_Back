export class CustomError extends Error {
    constructor(message: string, public code: number) {
        super(message);
        this.name = "CustomError";
    }
}

export const sendErrorResponse = (message: string, code: number = 400): CustomError => {
    return new CustomError(message, code);
};

export const notFoundNote = (id: string) => {
    return sendErrorResponse(`The note '${id}' isn't found`, 404);
};

export const noteIsArchived = (id: string) => {
    return sendErrorResponse(
        `The note '${id}' can't be modified because it's archived. Unarchive it first then edit.`,
        400
    );
};

export const archiveOrModifyNote = (id: string) => {
    return sendErrorResponse(
        `It's not possible to archive and modify the note '${id}' at a time`,
        400
    );
};

export const validationError = (error: any): CustomError => {
    if (error instanceof Error && "inner" in error) {
        const innerErrors = (error as any).inner.map((err: any) => err.message).join(". ");
        return sendErrorResponse(`${innerErrors}`, 400);
    } else {
        return sendErrorResponse("Request validation failed", 400);
    }
};
