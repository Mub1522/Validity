export function isPlainObject(x: unknown): x is Record<string, unknown> {
    return x !== null && typeof x === 'object' && !Array.isArray(x)
}

export function isAllowedPrimitive(x: unknown): x is string | number | boolean {
    const t = typeof x
    return t === 'string' || t === 'number' || t === 'boolean'
}

export function isString(x: unknown): x is string {
    return typeof x === 'string'
}

export function isStringRecord(x: unknown): x is Record<string, string> {
    if (!isPlainObject(x)) return false
    for (const v of Object.values(x)) {
        if (typeof v !== 'string') return false
    }
    return true
}


