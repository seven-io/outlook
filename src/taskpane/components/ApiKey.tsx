import React, {SyntheticEvent, useState, useRef} from 'react';
import {DefaultButton, TextField} from 'office-ui-fabric-react';

import {LocalStore} from '../LocalStore';
import getBalance from '../getBalance';
import {IOptions, Messagabled} from './App';

export type ApiKeyProps = Messagabled & {
    onInit(needsInit: false): void
}

export default function ApiKey({Messagable, onInit}: ApiKeyProps) {
    const $apiKey = useRef(null);
    const [apiKey, setApiKey] = useState(LocalStore.get('options', {}).apiKey || '');

    const handleSubmit = async (e: SyntheticEvent) => {
        e.preventDefault();

        try {
            await getBalance(Messagable, apiKey);
            LocalStore.set('options', {
                apiKey,
            } as IOptions);

            LocalStore.set('sent', []);

            onInit(false);
        } catch (e) {
            Messagable.addError(e);
        }
    };

    return <form onSubmit={handleSubmit} style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <TextField
            componentRef={$apiKey}
            onChange={(e, newValue) => setApiKey(newValue || '')}
            value={apiKey}
            description='Get yours at https://www.seven.io'
            label='API Key'
            required
        />

        <DefaultButton
            style={{marginTop: '11px'}}
            iconProps={{iconName: 'ChevronRight'}}
            text='OK'
            type='submit'
        />
    </form>;
}
