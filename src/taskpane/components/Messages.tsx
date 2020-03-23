import React from 'react';
import {MessageBar, IMessageBarProps} from 'office-ui-fabric-react';

export type MessagesProps = IMessageBarProps & {
    entries: string[]
    setState: (a: []) => void
}

export default function Messages({entries, setState, ...MessageBarProps}: MessagesProps) {
    return entries.length ?
        <MessageBar
            dismissButtonAriaLabel='Close'
            onDismiss={() => setState([])}
            {...MessageBarProps}
        >
            {entries.map((e, i) => <>{e}{i + 1 === entries.length ? null : <br/>}</>)}
        </MessageBar> : null;
}