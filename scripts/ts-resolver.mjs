/**
 * Minimal ESM resolver so the verify script can import lib/*.ts directly
 * (those modules use extensionless imports, which the bundler resolves for us).
 */
import { existsSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';

export async function resolve(specifier, context, nextResolve) {
  if (specifier.startsWith('.') || specifier.startsWith('/')) {
    const base = context.parentURL
      ? new URL(specifier, context.parentURL)
      : pathToFileURL(specifier);
    const asPath = fileURLToPath(base);
    if (!existsSync(asPath)) {
      for (const ext of ['.ts', '.tsx', '/index.ts']) {
        if (existsSync(asPath + ext)) {
          return { url: pathToFileURL(asPath + ext).href, shortCircuit: true };
        }
      }
    }
  }
  return nextResolve(specifier, context);
}
