import * as Yup from "yup";
import _ from "lodash";

export const trimValue = Yup.string().transform((value, originalValue) => {
    if (typeof originalValue === "string") {
        return originalValue.trim();
    }
    return value;
});

export function forbidUnknownFields(
    value: Record<string, any>,
    allowedFields: string[]
): true | Yup.ValidationError {
    const unknownFields = Object.keys(value).filter((field) => !allowedFields.includes(field));

    if (unknownFields.length > 0) {
        const unknownFieldNames = unknownFields.join(", ");
        return new Yup.ValidationError(`Unknown field(s) detected: ${unknownFieldNames}`);
    }

    return true;
}

export function atLeastOneFieldChanged(value: Record<string, any>): boolean {
    const { name, category, content, archived } = value;
    const atLeastOneFieldChanged = _.some(
        [name, category, content, archived],
        _.negate(_.isUndefined)
    );
    return atLeastOneFieldChanged;
}
