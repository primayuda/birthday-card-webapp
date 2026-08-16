/**
 * Heuristic: detect English-looking text when Bahasa Indonesia was requested.
 * Used to reject AI responses that ignore locale and fall back to ID templates.
 */
const ID_MARKERS =
  /\b(yang|dan|di|ke|untuk|dengan|suka|lagi|tidak|adalah|ini|itu|kamu|mu|nya|si|pak|bu|mbak|mas|kak|gue|lo|lu|dong|deh|nih|banget|aja|gitu|gak|nggak|semoga|selamat|ulang|tahun|genap|resmi|cukup|umur|tahunmu|tahun|hobi|kata)\b/i;

const EN_MARKERS =
  /\b(the|and|with|your|you|master|magnificent|tiny|disco|mischief|have|has|been|will|would|could|should|may|might|must|shall|can|dear|breaking|news|quest|loot|level|basically|officially|main|bonus|side|master of|t-rex|t-rexes|balls|diving|scuba)\b/i;

const EN_TITLE_CASE = /\b[A-Z][a-z]+(?:\s+[A-Z][a-z]+)+\b/;

export function looksLikeEnglish(text: string): boolean {
  const trimmed = text.trim();
  if (!trimmed) return false;

  if (ID_MARKERS.test(trimmed)) return false;
  if (EN_MARKERS.test(trimmed)) return true;
  if (EN_TITLE_CASE.test(trimmed)) return true;

  return false;
}

export function fillLooksEnglish(fields: {
  name?: string;
  hobby?: string;
  adjective?: string;
  pluralNouns?: string;
}): boolean {
  return [fields.hobby, fields.adjective, fields.pluralNouns, fields.name]
    .filter(Boolean)
    .some((value) => looksLikeEnglish(String(value)));
}
