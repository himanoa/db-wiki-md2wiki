import { ChangelogProtocol } from "./protocol";
import Markdown from 'react-markdown'

export function ChangelogPresenter({ changelogMarkdown }: ChangelogProtocol) {
  return <Markdown>{changelogMarkdown}</Markdown>
}
