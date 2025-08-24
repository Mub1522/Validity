/* MODES TYPES */
export interface ValidityBase {
    /* Global configs */
    locale?: string
}
export type Rules = Record<string, string>

/* MODE FORM */
export interface ValidityFormOptions extends ValidityBase {
    form: Record<string, unknown>
    field?: never
}

/* MODE FIELD */
export interface FieldPayload {
    value: string | number | boolean
    rules: string
}

export interface ValidityFieldOptions extends ValidityBase {
    field: FieldPayload
    form?: never
}

export type ValidityOptions = ValidityFormOptions | ValidityFieldOptions
