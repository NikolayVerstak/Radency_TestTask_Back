import * as Yup from "yup";
import { atLeastOneFieldChanged, forbidUnknownFields, trimValue } from "./yupValidationUtils.js";

export const createNoteSchema = Yup.object({
    name: trimValue.required("Name is required").min(3, "Name must contain at least 3 characters"),
    category: trimValue
        .required("Category is required")
        .oneOf(
            ["Task", "Idea", "Random Thought"],
            "Category must be one of the following values: Task, Idea, Random Thought"
        ),
    content: trimValue
        .required("Content is required")
        .min(6, "Content must contain at least 6 characters"),
}).test("unknown-fields", "Unknown fields are not allowed", (value) =>
    forbidUnknownFields(value, ["name", "category", "content"])
);

export const updateNoteSchema = Yup.object({
    name: trimValue.min(3, "Name must contain at least 3 characters"),
    category: trimValue.oneOf(
        ["Task", "Idea", "Random Thought"],
        "Category must be one of the following values: Task, Idea, Random Thought"
    ),
    content: trimValue.min(6, "Content must contain at least 6 characters"),
    archived: Yup.boolean().strict(),
})
    .test("unknown-fields", "Unknown fields are not allowed", (value) =>
        forbidUnknownFields(value, ["name", "category", "content", "archived"])
    )
    .test("at-least-one-field", "At least one field should be changed", atLeastOneFieldChanged);
