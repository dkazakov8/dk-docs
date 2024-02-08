import { CodeHighlightTabs, CodeHighlightTabsProps } from '@mantine/code-highlight';

// https://mantine.dev/others/code-highlight/

export function Sh(props: CodeHighlightTabsProps & { noExpand?: boolean }) {
  return (
    <CodeHighlightTabs
      code={props.code}
      withExpandButton={!props.noExpand}
      defaultExpanded={Boolean(props.noExpand)}
      maxCollapsedHeight={50}
    />
  );
}
