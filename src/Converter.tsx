import { ChangeEventHandler, useCallback, useState } from 'react'
import classes from "./Converter.module.css"
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import { toWikiPlugin } from './mdast-to-wiki'

const processor = unified().use(remarkParse).use(toWikiPlugin).freeze()

export function Converter() {
  const [raw, updateRaw] = useState("")
  const [wikiText, updateWikiText] = useState("")

  const handleChangeRaw = useCallback<ChangeEventHandler<HTMLTextAreaElement>>((e) => {
    updateRaw(e.target.value)

    processor.process(e.target.value).then((value) => {
      return String(value)
    }).then(processed => {
      updateWikiText(processed)
    })
  }, [])

  return (
    <div className={classes.container}>
      <textarea style={{width: "50%", height: '700px'}} onChange={handleChangeRaw} defaultValue={raw}></textarea>
      <span>→</span>
      <textarea style={{width: "50%", height: '700px'}} disabled defaultValue={wikiText}></textarea>
    </div>
  )
}
