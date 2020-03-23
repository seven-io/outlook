export class LocalStore {
    static store = localStorage;

    static get(key: string, fallback?: any): any {
        let value = LocalStore.store.getItem(key);

        if (null === value) {
            if (2 === arguments.length) {
                return fallback;
            }
        } else {
            try {
                value = JSON.parse(value);
            } catch (e) {
            }
        }

        return value;
    }

    static remove(key: string): void {
        LocalStore.store.removeItem(key);
    }

    static set(key: string, value: any): void {
        LocalStore.store.setItem(key, 'string' === typeof value ? value : JSON.stringify(value));
    }

    static append(key: string, value: any): void {
        const list = LocalStore.get(key);

        if (Array.isArray(list)) {
            list.push(value);

            LocalStore.set(key, list);
        } else {
            LocalStore.set(key, [value]);
        }
    }
}