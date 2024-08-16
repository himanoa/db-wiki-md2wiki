import { Suspense } from "react";
import { Changelog } from "../components/Changelog";

export function ChangelogPage() {
  return (
    <Suspense fallback={<p>Loading</p>}>
      <Changelog />
    </Suspense>
  )
}
