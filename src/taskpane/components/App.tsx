import React, {useState} from 'react';
import {MessageBarType} from 'office-ui-fabric-react';

import Header from './Header';
import Progress from './Progress';
import Send from './Send';
import Welcome from './Welcome';
import {LocalStore} from '../LocalStore';
import Messages from './Messages';
import ApiKey from './ApiKey';

export type IMessagable = {
    addError(e: any): void;

    addMessage(m: any): void;
}

export type Messagabled = {
    Messagable: IMessagable
}

export type IOptions = {
    apiKey: string,
};

export interface AppProps {
    isOfficeInitialized: boolean;
}

const title = 'seven Add-in';

const toString = (s: any) => 'string' === typeof s ? s : JSON.stringify(s);
const toStringArray = (msgs: string[], msg: string) => [...msgs, toString(msg)];

export default function App({isOfficeInitialized}: AppProps) {
    const [needsInit, setNeedsInit] = useState(0 === LocalStore.store.length);
    const [messages, setMessages] = useState<string[]>([]);
    const [errors, setErrors] = useState<string[]>([]);

    const messagable: IMessagable = {
        addError: e => setErrors(toStringArray(errors, e)),
        addMessage: m => setMessages(toStringArray(messages, m)),
    };

    return isOfficeInitialized
        ? <>
            <Header logo='assets/logo-light-128x128.png' title={title} message='seven'
                    style={{marginBottom: '32px'}}/>

            <Messages entries={messages} setState={setMessages}/>

            <Messages entries={errors} messageBarType={MessageBarType.error} setState={setErrors}/>

            {
                needsInit ? <Welcome/> : null
            }
            {
                LocalStore.get('options', {apiKey: ''}).apiKey.length ? <Send Messagable={messagable}/> : null
            }

            <ApiKey Messagable={messagable} onInit={setNeedsInit}/>
        </>
        : <Progress title={title} logo='assets/logo-filled.png' message='Please sideload your addin to see app body.'/>;
}
