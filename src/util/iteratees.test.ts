import { buildCollectionByKey, buildCollectionByCallback } from './iteratees';

describe('iteratees utilities', () => {
  interface Item { id: number; value: string }

  test('buildCollectionByKey handles undefined collection', () => {
    const result = buildCollectionByKey<Item>(undefined, 'id');
    expect(result).toEqual({});
  });

  test('buildCollectionByCallback handles undefined collection', () => {
    const callback = (item: Item) => [item.id, item.value] as [number, string];
    const result = buildCollectionByCallback<Item, number, string>(undefined, callback);
    expect(result).toEqual({});
  });
});
