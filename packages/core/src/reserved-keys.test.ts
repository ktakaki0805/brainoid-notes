import { describe, expect, it } from 'vitest';
import { isReservedKey } from './reserved-keys';

describe('isReservedKey', () => {
  it('予約語を見分ける', () => {
    expect(isReservedKey('type')).toBe(true);
    expect(isReservedKey('subclass_of')).toBe(true);
  });

  it('利用者のプロパティ名は予約語ではない', () => {
    expect(isReservedKey('検証対象')).toBe(false);
    expect(isReservedKey('Type')).toBe(false);
  });
});
