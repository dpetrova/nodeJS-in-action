/* Using localStorage for persistent memoization */

function expensiveWork() {
}

// subsequent calls with the same argument will fetch the memoized result
function memoizedExpensiveOperation(data) {
  const key = `/memoized/${JSON.stringify(data)}`;
  const memoizedResult = localStorage.getItem(key);
  if (memoizedResult != null) return memoizedResult;
  // do expensive work
  const result = expensiveWork(data);
  // save result to localStorage, never calculate again
  localStorage.setItem(key, result);
  return result;
}

memoizedExpensiveOperation('example');

console.log(getNamespaceItems('/memoized'));
