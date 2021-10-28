export function make(tagName: string, classNames: Array<string> | string, style: string = '') {
  const el = document.createElement(tagName)
  if (Array.isArray(classNames)) {
    el.classList.add(...classNames)
  } else if (classNames) {
    el.classList.add(classNames)
  }
  el.setAttribute('style', style)
  return el
}

export function InjectCss(css: string) {
  const style = document.createElement('style')
  style.innerText = css
  document.head.appendChild(style)
}
