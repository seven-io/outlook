import React from 'react';
import {TextField} from 'office-ui-fabric-react';

export type ToProps = {
    onChange: (text: string) => void
}

export default function To({onChange}: ToProps) {
    return <TextField
        description='One or more number(s) and/or contact(s) separated by comma e.g. +4901234567890,Peter'
        label='Recipient(s)'
        onChange={(e, newValue) => onChange(newValue || '')}
        required
    />;
}