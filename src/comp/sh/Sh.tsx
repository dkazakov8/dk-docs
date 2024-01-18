import { CodeHighlightTabs, CodeHighlightTabsProps } from '@mantine/code-highlight';

import { transformers } from 'compSystem/transformers';

// https://mantine.dev/others/code-highlight/

export const Sh = transformers.observer(function Sh(
  props: CodeHighlightTabsProps & { noExpand?: boolean }
) {
  return (
    <CodeHighlightTabs
      code={props.code}
      withExpandButton={!props.noExpand}
      defaultExpanded={Boolean(props.noExpand)}
      maxCollapsedHeight={50}
    />
  );
});
