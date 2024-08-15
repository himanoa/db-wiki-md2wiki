import { Nodes } from 'mdast'
export const addHeadingModifier = (value: string, level: number): string => {
  const modifiers = new Array(6).fill("=")
  const modifiesString = modifiers.slice(0,level).join("")
  return `${modifiesString} ${value} ${modifiesString}\n`
}

export const addListItemModifier = (value: string, level: number, ordered: boolean): string => {
  const modifler = ordered ? '#' : "*"
  const modifiers = new Array(level).fill(modifler)
  const modifiesString = modifiers.join("")
  return `${modifiesString} ${value}`
}

type Context = {
  isOrderedList: boolean,
  listNestLevel: number
}

export const toWikiText = (ctx: Context = { isOrderedList: false, listNestLevel: 0 }) => (tree: Nodes): string => {
  if(tree.type === 'text') {
    return tree.value
  }
  if(tree.type === 'paragraph') {
    return `${tree.children.map(toWikiText(ctx)).join("\n")}\n`
  }
  if(tree.type === 'blockquote') {
    return `<blockquote>${Array.from(tree.children.values()).map(toWikiText(ctx))}</blockquote>`
  }
  if(tree.type === 'code') {
    return tree.value.split("\n").map(v => ` ${v}\n`).join('')
  }
  if(tree.type === 'heading') {
    return addHeadingModifier(tree.children.map(toWikiText(ctx)).join(""), tree.depth)
  }
  if(tree.type === 'list') {
    return tree.children.map(toWikiText({
      isOrderedList: tree.ordered === true,
      listNestLevel: ctx.listNestLevel + 1
    })).join("")
  }
  if(tree.type === 'listItem') {
    return addListItemModifier(`${tree.children.map(c => toWikiText(ctx)(c)).join("")}`, ctx.listNestLevel, ctx.isOrderedList)
  }

  if(tree.type === 'emphasis') {
    return `''${tree.children.map(c => toWikiText(ctx)(c)).join("\n")}''`
  }

  if(tree.type === 'strong') {
    return `'''${tree.children.map(c => toWikiText(ctx)(c)).join("\n")}'''`
  }

  if(tree.type === 'root') {
    return tree.children.map(toWikiText()).join("")
  }

  // TODO: 不完全な実装です
  return ''
}

export function toWikiPlugin() {
  // @ts-expect-error unifiedの仕様のためこれは通ってほしい
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const self = this
  self.compiler = toWikiText()
}
