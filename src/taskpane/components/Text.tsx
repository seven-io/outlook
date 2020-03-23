import React, {useEffect} from 'react';
import {TextField, ITextFieldProps} from 'office-ui-fabric-react';

import {Messagabled} from './App';

export type TextProps = Messagabled & ITextFieldProps & {
    setDisabled: (disabled: boolean) => void
    setText: (text: string) => void
}

export default function Text({Messagable, setText, setDisabled, value, ...props}: TextProps) {
    useEffect(() => Office.context.mailbox.item.body.getAsync('text',
        ({value, error, status}) => {
            if ('succeeded' === status as unknown as string) {
                setText(value);
            } else {
                Messagable.addError({value, error, status});

                setDisabled(true);
            }
        }), []);

    return <TextField
        description='This defines the actual SMS content.'
        label='Message Content'
        multiline
        onChange={(e, newValue) => setText(newValue ? newValue.trim() : '')}
        required
        rows={6}
        value={value}
        {...props}
    />;
}