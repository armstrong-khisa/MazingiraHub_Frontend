import * as matchers from '@testing-library/jest-dom/matchers'
import { cleanup } from '@testing-library/react'
import { expect } from 'vitest'
import { afterEach } from 'vitest'

expect.extend(matchers)
afterEach(cleanup)

if (!globalThis.localStorage) {
	const values = new Map()

	globalThis.localStorage = {
		getItem: (key) => values.get(key) ?? null,
		setItem: (key, value) => values.set(key, String(value)),
		removeItem: (key) => values.delete(key),
		clear: () => values.clear(),
	}
}
