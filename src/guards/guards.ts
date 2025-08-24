import type {
    ValidityOptions,
    ValidityFormOptions,
    ValidityFieldOptions,
} from '../types'
import { isAllowedPrimitive, isPlainObject, isString } from './helpers'

/* MODE FORM */
export function isFormOptions(o: ValidityOptions): o is ValidityFormOptions {
    return isPlainObject((o as any)?.form)
}
/* MODE FIELD */
export function isFieldOptions(o: ValidityOptions): o is ValidityFieldOptions {
    const f = (o as any)?.field

    /* Validations */
    if (!('value' in f) || !('rules' in f)) return false
    if (!isPlainObject(f)) return false
    if (!isAllowedPrimitive((f as any).value)) return false
    if (!isString((f as any).rules)) return false
    return true
}
