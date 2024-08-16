import { ChangelogProtocol } from "./protocol"
import { useSuspenseQuery } from '@tanstack/react-query'

type ContainerProps = {
  render: (props: ChangelogProtocol) => JSX.Element
}

export function ChangelogContainer({ render }: ContainerProps) {
  const changelogUrl = 'https://raw.githubusercontent.com/himanoa/db-wiki-md2wiki/main/README.md'
  const { data: changelogMarkdown } = useSuspenseQuery({
    queryKey: ['changelog'],
    queryFn: async () => {
      return fetch(changelogUrl).then(res => String(res.body))
    }
  })

  return render({
    changelogMarkdown
  })
}
