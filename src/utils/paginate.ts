export function paginate(items: any[], pageNumber: number, pageSize: number) {
  const startIndex = (pageNumber - 1) * pageSize;

  console.log(startIndex);

  return items.slice(startIndex, startIndex + pageSize);
}
