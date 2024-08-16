import { Alignment, Button, Colors, Navbar, NavbarDivider, NavbarGroup, NavbarHeading } from "@blueprintjs/core";
import { Link } from "wouter";
import classes from './Header.module.css'

export function Header() {
  return (
    <>
      <Navbar style={{ background: Colors.DARK_GRAY4, color: Colors.WHITE, padding: '8px' }}>
        <NavbarGroup align={Alignment.LEFT}>
          <div className={classes.container}>
            <NavbarHeading>
              <Link href="/db-wiki-md2wiki" className={classes.link} style={{ color: Colors.WHITE }}>Dungeonborne PatchNote to Wiki変換君</Link>
            </NavbarHeading>
            <NavbarDivider/>
            <Link className={classes.link} href="/db-wiki-md2wiki/changelog">変更履歴</Link>
          </div>
        </NavbarGroup>
      </Navbar>
    </>
  )
}
