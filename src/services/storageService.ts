export default class StorageService {
    storage = localStorage

    get(key: string) {
        return this.storage.getItem(key)
    }

    set(key: string, value: string) {
        this.storage.setItem(key, value)
        return this.get(key)
    }

    remove(key: string) {
        this.storage.removeItem(key)
    }

    clear() {
        this.storage.clear()
    }
}