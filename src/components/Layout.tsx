import classes from './Layout.module.css'

export type Props = {
  header: JSX.Element,
  main: JSX.Element
}

export function Layout({ header, main }: Props) {
  return (
    <div className={classes.page}>
      <header>
        {header}
      </header>
      <section>
        {main}
      </section>
    </div>
  )
}
