export const json = (...args) => JSON.parse(String.raw.apply(null, args).trim());
