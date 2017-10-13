export function extend (to, _from){
  for (const key in _from) {
    to[key] = _from[key]
  }
  return to
}
