import {SmsJsonResponse, SmsParams} from 'sms77-client';

import {fetchApi} from './fetchApi';
import {LocalStore} from './LocalStore';
import {IMessagable} from './components/App';
import prettyResponse from './prettyResponse';

export default async function postSms(params: SmsParams, Messagable: IMessagable, setDisabled: (d: boolean) => void) {
    setDisabled(true);

    try {
        const res = await fetchApi({Messagable, endpoint: 'sms', payload: {...params, json: 1}}) as SmsJsonResponse;
        const {balance, messages, sms_type, success, total_price} = res;
        LocalStore.append('sent', res);

        if ('100' === success) {
            const msg = `${messages.length} ${sms_type} SMS sent valued at ${total_price} €. Balance: ${balance}`;
            Messagable.addMessage(msg);

            messages.forEach(prettyResponse(Messagable));
        } else {
            Messagable.addError(`An error occured while sending SMS: ${JSON.stringify(res)}`);
        }

        return res;
    } catch (e) {
        Messagable.addError(e);

        throw e;
    } finally {
        setDisabled(false);
    }
};