import {SmsMessage} from 'sms77-client';

import {IMessagable} from './components/App';

export default function prettyResponse(Messagable: IMessagable) {
    return ({
                messages = [], id, price, success, parts, recipient, sender, text, encoding
            }: SmsMessage,) => {
        let line = '';

        if (success) {
            line += `#${id} ${parts}x valued at`;
            line += ` ${price} sent to ${recipient} from ${sender}: ${text}`;
            Messagable.addMessage(line);
        } else {
            line += `#${id} failed sending to ${recipient}`;
            line += ` from ${sender} with encoding ${sender}: ${encoding}`;
            Messagable.addError(line);
        }

        messages.forEach((msg: string) => line += ` / ${msg}`);
    };
}