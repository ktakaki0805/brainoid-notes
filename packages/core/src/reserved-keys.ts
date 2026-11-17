/**
 * 予約語。利用者のプロパティ名には使えないキー。
 * 意味は docs/design/data-model.md の「予約語」を参照。
 */
export const RESERVED_KEYS = [
  'type',
  'subclass_of',
  'properties',
  'value_type',
  'range',
  'choices',
  'same_as',
  'aliases',
] as const;

export type ReservedKey = (typeof RESERVED_KEYS)[number];

export function isReservedKey(key: string): key is ReservedKey {
  return (RESERVED_KEYS as readonly string[]).includes(key);
}
