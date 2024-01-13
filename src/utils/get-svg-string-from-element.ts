export function getSvgStringFromElement(el: HTMLElement) {
  const temp = new XMLSerializer();
  return temp.serializeToString(el);
}
