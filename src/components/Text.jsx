// Renders text, turning any [PLACEHOLDER] into a pink striped tag
// so unfinished bits are impossible to miss.
export default function T({ children }) {
  if (typeof children !== 'string') return children
  const parts = children.split(/(\[[^\]]+\])/g)
  return parts.map((p, i) =>
    /^\[.*\]$/.test(p) ? <span key={i} className="ph">{p}</span> : p,
  )
}

export const isPlaceholder = (s) => typeof s === 'string' && /^\[.*\]$/.test(s.trim())
