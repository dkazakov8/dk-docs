import { CodeHighlightTabs, CodeHighlightTabsProps } from '@mantine/code-highlight';

import { ConnectedComponent } from 'compSystem/ConnectedComponent';

// https://mantine.dev/others/code-highlight/

export class Sh extends ConnectedComponent<CodeHighlightTabsProps & { noExpand?: boolean }> {
  render() {
    return (
      <CodeHighlightTabs
        code={this.props.code}
        withExpandButton={!this.props.noExpand}
        defaultExpanded={Boolean(this.props.noExpand)}
        maxCollapsedHeight={50}
      />
    );
  }
}
