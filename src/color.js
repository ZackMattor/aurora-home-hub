export function rgb(r,g,b) {
  return {
    r: r,
    g: g,
    b: b
  }
}

export function rgb_to_s(val) {
  return `rgb(${val.r},${val.g},${val.b})`;
}
