export interface TitleSegment {
  text: string
  accent: boolean
}

export function parseAccentTitle(raw: string): TitleSegment[] {
  const segments: TitleSegment[] = []
  const regex = /\*\*(.*?)\*\*/g
  let lastIndex = 0
  let match: RegExpExecArray | null

  while ((match = regex.exec(raw)) !== null) {
    if (match.index > lastIndex) {
      segments.push({ text: raw.slice(lastIndex, match.index), accent: false })
    }
    segments.push({ text: match[1], accent: true })
    lastIndex = regex.lastIndex
  }

  if (lastIndex < raw.length) {
    segments.push({ text: raw.slice(lastIndex), accent: false })
  }

  return segments
}
