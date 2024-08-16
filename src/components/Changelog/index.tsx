import { ChangelogContainer } from "./container";
import { ChangelogPresenter } from "./presenter";

export function Changelog() {
  return <ChangelogContainer render={(protocol) => <ChangelogPresenter {...protocol} />} />
}
