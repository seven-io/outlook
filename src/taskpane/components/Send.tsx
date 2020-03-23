import React, {SyntheticEvent, useState} from 'react';
import {DefaultButton} from 'office-ui-fabric-react';

import postSms from '../postSms';
import Text from './Text';
import To from './To';
import {Messagabled} from './App';

export type SendProps = Messagabled & {}

export default function Send({Messagable}: SendProps) {
    const [disabled, setDisabled] = useState(false);
    const [text, setText] = useState('');
    const [to, setTo] = useState('');

    const handleSubmit = async (e: SyntheticEvent) => {
        e.preventDefault();

        await postSms({text, to}, Messagable, setDisabled);
    };

    return <form onSubmit={handleSubmit}>
        <Text Messagable={Messagable}
              setText={setText}
              setDisabled={setDisabled} value={text}/>

        <To onChange={setTo}/>

        <DefaultButton
            className='ms-welcome__action'
            disabled={disabled}
            iconProps={{iconName: 'ChevronRight'}}
            type='submit'
        >Send</DefaultButton>
    </form>;
}