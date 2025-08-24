import type { ValidityFormOptions } from '../types'

export function handleForm(opts: ValidityFormOptions) {
    console.log('validity → modo: form')
    return { mode: 'form' as const }
}
