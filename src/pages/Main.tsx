import classes from './Main.module.css'
import { Alignment, Colors, Navbar, NavbarGroup, NavbarHeading } from '@blueprintjs/core'
import { Converter } from '../Converter'

export function MainPage() {
  return (
    <div className={classes.page}>
      <header>
        <Navbar style={{ background: Colors.DARK_GRAY4, color: Colors.WHITE, padding: '8px' }}>
          <NavbarGroup align={Alignment.LEFT}>
            <NavbarHeading>Dungeonborne PatchNote to Wiki変換君</NavbarHeading>
          </NavbarGroup>
        </Navbar>
      </header>
      <section>
        <h2>これなに？</h2>
        <p><a href="https://dungeonborne.fandom.com/ja/wiki/%E3%83%80%E3%83%B3%E3%82%B8%E3%83%A7%E3%83%B3%E3%83%9C%E3%83%BC%E3%83%B3_Wiki">ダンジョンボーンwiki</a>をメンテナンスするにあたって、パッチノートの文章を追加する必要があります。</p>
        <p>しかし、パッチノートの文書はMarkdownで書かれていてwikiに転記するのが大変です。</p>
        <p>このツールでは、Markdownの記法をwikitextに変換して簡単にパッチノートを追加できるようにするツールです。</p>
        <h2>使い方</h2>
        <p>左側のテキストエリアにDiscordのパッチノートをコピーしたものを入力すると右側にwikitext形式に変換したものが出力されます。</p>
        <Converter />
      </section>
    </div>
  )
}
