import { describe, it, expect } from 'vitest'
import { toWikiPlugin, toWikiText } from '.'
import remarkParse from 'remark-parse'
import {unified} from 'unified'
import { readFileSync } from 'fs'
import { join } from 'path'

describe("toWikiText", () => {
  it('should be plain text', () => {
    expect(toWikiText()({ type: 'text', value: 'fooo' })).toStrictEqual("fooo")
  })

  it('should be blockquote text', () => {
    expect(toWikiText()({ type: 'blockquote', children: [{
      type: 'paragraph',
      children: [
        {
          type: 'text',
          value: 'fooo'
        }
      ]
    }]})).toStrictEqual("<blockquote>fooo\n</blockquote>")
  })

  it('should be codeblock text', () => {
    expect(toWikiText()({ type: 'code', value: 'foo\nbar'})).toStrictEqual(` foo
 bar
`)
  })

  it('should be heading text', () => {
    expect(toWikiText()({ type: 'heading', depth: 1, children:[ {
      type: 'text',
      value: 'foo'
    } ]})).toStrictEqual(`= foo =\n`)

    expect(toWikiText()({ type: 'heading', depth: 2, children:[ {
      type: 'text',
      value: 'foo'
    } ]})).toStrictEqual(`== foo ==\n`)

    expect(toWikiText()({ type: 'heading', depth: 3, children:[ {
      type: 'text',
      value: 'foo'
    } ]})).toStrictEqual(`=== foo ===\n`)

    expect(toWikiText()({ type: 'heading', depth: 4, children:[ {
      type: 'text',
      value: 'foo'
    } ]})).toStrictEqual(`==== foo ====\n`)

    expect(toWikiText()({ type: 'heading', depth: 5, children:[ {
      type: 'text',
      value: 'foo'
    } ]})).toStrictEqual(`===== foo =====\n`)

    expect(toWikiText()({ type: 'heading', depth: 6, children:[ {
      type: 'text',
      value: 'foo'
    } ]})).toStrictEqual(`====== foo ======\n`)
  })

  it("should be ordered list", () => {
    expect(toWikiText()({
      type: 'list',
      ordered: true,
      children: [
        {
          type: 'listItem',
          children: [
            {
              type: 'paragraph',
              children: [{
                type: 'text',
                value: 'foo'
              }]
            }
          ]
        },
        {
          type: 'listItem',
          children: [
            {
              type: 'paragraph',
              children: [{
                type: 'text',
                value: 'bar'
              }]
            }
          ]
        }
      ]
    })).toMatchInlineSnapshot(`
      "# foo
      # bar
      "
    `)

    expect(toWikiText()({
      type: 'list',
      ordered: true,
      children: [
        {
          type: 'listItem',
          children: [
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  value: 'foo'
                }
              ],
            },
            {
              type: 'list',
              ordered: true,
              children: [{
                type: 'listItem',
                children: [
                  {
                    type: 'paragraph',
                    children: [
                      { type: 'text', value: 'nested' }
                    ]
                  }
                ]
              }]
            }
          ]
        },
        {
          type: 'listItem',
          children: [
            {
              type: 'paragraph',
              children: [{
                type: 'text',
                value: 'bar'
              }]
            }
          ]
        }
      ]
    })).toMatchInlineSnapshot(`
      "# foo
      ## nested
      # bar
      "
    `)

    expect(toWikiText()({
      type: 'list',
      ordered: false,
      children: [
        {
          type: 'listItem',
          children: [
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  value: 'foo'
                }
              ],
            },
            {
              type: 'list',
              ordered: false,
              children: [{
                type: 'listItem',
                children: [
                  {
                    type: 'paragraph',
                    children: [
                      { type: 'text', value: 'nested' }
                    ]
                  }
                ]
              }]
            }
          ]
        },
        {
          type: 'listItem',
          children: [
            {
              type: 'paragraph',
              children: [{
                type: 'text',
                value: 'bar'
              }]
            }
          ]
        }
      ]
    })).toMatchInlineSnapshot(`
      "* foo
      ** nested
      * bar
      "
    `)
  })

  it("should be strong", () => {
    expect(toWikiText()({
      type: 'strong',
      children: [{
        type: 'text',
        value: 'foo'
      }]
    })).toStrictEqual("'''foo'''")
  })

  it("should be italic", () => {
    expect(toWikiText()({
      type: 'emphasis',
      children: [{
        type: 'text',
        value: 'foo'
      }]
    })).toStrictEqual("''foo''")
  })

  it("integration test", async () => {
    const body = readFileSync(join(__dirname, 'example-patch-note.md'), 'utf8')
    const processed = String(await unified().use(remarkParse).use(toWikiPlugin).process(body))
    expect(processed).toMatchSnapshot()
  })
})
