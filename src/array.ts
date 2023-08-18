const arrayDiff = <TArrayElement>(
  originalArray: TArrayElement[],
  newArray: TArrayElement[]
): [TArrayElement[], TArrayElement[]] => {
  const added: TArrayElement[] = [];
  const removed: TArrayElement[] = [];

  for (const item of originalArray) {
    if (!newArray.includes(item)) {
      removed.push(item);
    }
  }

  for (const item of newArray) {
    if (!originalArray.includes(item)) {
      added.push(item);
    }
  }

  return [added, removed];
};

export { arrayDiff };
