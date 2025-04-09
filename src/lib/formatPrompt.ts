// @/lib/formatPrompt.ts
export const formatPrompt = (prompt: string) =>
  prompt.replace(/ /g, "-").replace(/-+/g, "-").toLocaleLowerCase();
