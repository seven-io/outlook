import {LocalStore} from './LocalStore';
import {IMessagable} from './components/App';
import {fetchApi} from './fetchApi';

export default async function getBalance(Messagable: IMessagable, apiKey?: string) {
    try {
        const payload = apiKey ? {p: apiKey} : {};
        let balance = await fetchApi({Messagable, endpoint: 'balance', payload});
        balance = Number.parseFloat(balance).toLocaleString();

        Messagable.addMessage(`Your current balance: ${balance}`);

        LocalStore.set('balance', balance);

        return balance;
    } catch (e) {
        Messagable.addError(e);

        throw e;
    }
};