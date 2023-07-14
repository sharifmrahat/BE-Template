const pick = <T extends Record<string, unknown>, k extends keyof T>(
  obj: T,
  keys: k[]
): Partial<T> => {
  const pickedItems: Partial<T> = {}

  for (const key of keys) {
    if (obj && Object.hasOwnProperty.call(obj, key)) {
      pickedItems[key] = obj[key]
    }
  }
  return pickedItems
}

export default pick
