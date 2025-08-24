import type { RuleFn } from '../rules/types' // o donde tengas tu RuleFn

export type Registry = Record<string, RuleFn>

export interface RunOptions {
  /** Detener en la primera falla (default: true) */
  bail?: boolean
  /** Política para regla desconocida (default: 'throw') */
  onMissing?: 'throw' | 'skip'
}

type Token = { name: string; arg?: string }

function parseRuleString(ruleStr: string): Token[] {
  if (!ruleStr || !ruleStr.trim()) return []
  return ruleStr
    .split('|')
    .map(seg => seg.trim())
    .filter(Boolean)
    .map(seg => {
      const [name, arg] = seg.split(':', 2)
      return { name: name.trim(), arg: arg?.trim() }
    })
}

export function validateWithRegistry(
  registry: Registry,
  value: unknown,
  ruleStr: string,
  data?: Record<string, any>,
  opts: RunOptions = {}
): { ok: boolean; failed: string[] } {
  const { bail = true, onMissing = 'throw' } = opts
  const tokens = parseRuleString(ruleStr)
  const failed: string[] = []

  for (const { name, arg } of tokens) {
    const fn = registry[name]
    if (!fn) {
      if (onMissing === 'throw') {
        throw new Error(`Regla desconocida: "${name}"`)
      }
      // onMissing === 'skip' → simplemente ignoramos
      continue
    }
    const ok = fn(value, arg, data)
    if (!ok) {
      failed.push(name)
      if (bail) break
    }
  }

  return { ok: failed.length === 0, failed }
}

/** Azúcar para tu caso de field */
export function validateField(
  registry: Registry,
  field: { value: unknown; rules: string; data?: Record<string, any> },
  opts?: RunOptions
) {
  return validateWithRegistry(registry, field.value, field.rules, field.data, opts)
}
