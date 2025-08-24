import { handleForm } from './modes/form'
import { handleField } from './modes/field'
import type { ValidityOptions } from './types'
import { isFieldOptions, isFormOptions } from './guards/guards'

export function validity(opts: ValidityOptions) {
    const hasForm = isFormOptions(opts)
    const hasField = isFieldOptions(opts)

    if (hasForm && hasField) {
        throw new Error('You cannot pass `form` and `field` at the same time.')
    }
    if (!hasForm && !hasField) {
        throw new Error('You must pass `form` or `field` (one of the two).')
    }

    if (hasForm) return handleForm(opts)
    return handleField(opts)
}
