
/**
 *
 * Subscription module to manage components subscription
 * @class Subscription
 */
export default class Subscription {
    constructor() {
        this.subscriptions = [];
    }

    /**
     *
     * adds item into the subscribers list
     * @param {any} item
     * @memberof Subscription
     */
    subscribe = (item) => this.subscriptions.push(item);

    /**
     *
     * removes item from the subscribers list
     * @param {any} itemToBeUnsubscribed
     * @memberof Subscription
     */
    unsubscribe = (itemToBeUnsubscribed) => {
        this.subscriptions = this.subscriptions.filter(item => item !== itemToBeUnsubscribed);
        return this.subscriptions;
    }

    /**
     *
     * create a shallow copy of subscriptionsÎ
     * @returns {array} all subscriptions
     * @memberof Subscription
     */
    getAll = () => this.subscriptions.slice();
}