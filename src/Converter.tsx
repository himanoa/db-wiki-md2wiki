import { ChangeEventHandler, useCallback, useState } from 'react'
import classes from "./Converter.module.css"
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import { toWikiPlugin } from './mdast-to-wiki'
import { Button } from '@blueprintjs/core'

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

  const handleCopyButotnClick = useCallback(() => {
    navigator.clipboard.writeText(wikiText)
    alert("クリップボードにコピーしました。")
  }, [wikiText])

  return (
    <div className={classes.container}>
      <div className={`${classes.textareaWrapper} ${classes["textarea-without-copy-button"]}`}>
        <textarea style={{width: "100%", height: "800px"}}onChange={handleChangeRaw} defaultValue={raw}></textarea>
      </div>
      <span className={classes["textarea-without-copy-button"]}>→</span>
      <div className={classes.textareaWrapper}>
        <div className={classes.buttonWrapper}>
          <Button text="コピー" icon="clipboard" onClick={handleCopyButotnClick}/>
        </div>
        <textarea style={{width: "100%", height: "800px"}} disabled defaultValue={wikiText}></textarea>
      </div>
    </div>
  )
}
