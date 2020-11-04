/* global $, APP, config */

import { toJid } from '../../../react/features/base/connection/functions';
import {
    JitsiConnectionErrors
} from '../../../react/features/base/lib-jitsi-meet';



/**
 * Build html for "password required" dialog.
 * @returns {string} html string
 */
function getSubscriptionInputHtml() {
    const placeholder = config.hosts.authdomain
        ? 'user identity'
        : 'user@domain.net';

    return `
    <p>Please choose from below available options</p>
    <ul class="subscription-control"><li><input type="radio" id="subscriptionmonthly" name="subscriptiontype" value="30"> Monthly for Rs 1000</li>
    <li><input type="radio" id="subscriptionyearly" name="subscriptiontype" value="365"> Yearly for Rs 10000</li></ul>`;
}

function getSubscriptionBoxInputHtml(){
    return `<div class="flex-container">
    <div class="flex-child magenta">
      <div> <span class="currency-symbol">Rs</span><span class="actual-amount">1000</span><span class="subscription-period">/mo</span></div>
      <div class="subscription-period"> Monthly</div>
      <div> <input type="radio" id="subscriptionmonthly" name="subscriptiontype" value="30"></div>
    </div>
    <div class="flex-child green">
        <div> <span>Rs</span><span>10000</span><span>/yr</span></div>
        <div class="subscription-period">Yearly</div>
        <div> <input type="radio" id="subscriptionyearly" name="subscriptiontype" value="365"></div>
    </div> 
  </div>`
}

/**
 * Build html for "password required" dialog.
 * @returns {string} html string
 */
function subscriptionSuccess() {
    return `
    <p>Your subscription is successful!</p>`;
}



/**
 * Auth dialog for JitsiConnection which supports retries.
 * If no cancelCallback provided then there will be
 * no cancel button on the dialog.
 *
 * @class LoginDialog
 * @constructor
 *
 * @param {function(jid, password)} successCallback
 * @param {function} [cancelCallback] callback to invoke if user canceled.
 */
function SubscriptionDialog(successCallback, cancelCallback) {
    const subscriptionButtons = [ {
        title: APP.translation.generateTranslationHTML('dialog.Ok'),
        value: true
    }];

    const cancelButtons = [ {
        title: APP.translation.generateTranslationHTML('dialog.Ok'),
        value: true
    } ,{
        title: APP.translation.generateTranslationHTML('dialog.Cancel'),
        value: false
    }];

    const states = {
        planselection: {
            buttons: subscriptionButtons,
            html: getSubscriptionInputHtml(),
            titleKey: 'dialog.subscriptionRequired',

            submit(e, v, m, f) { // eslint-disable-line max-params
                e.preventDefault();
                if (v) {
                    const selectedplan = f.subscriptiontype

                    if (selectedplan) {
                        // eslint-disable-next-line no-use-before-define
                        //connDialog.goToState('connecting');
                        successCallback(selectedplan);
                    }
                } else {
                    // User cancelled
                    cancelCallback();
                }
            }
        },
    };
    const connDialog = APP.UI.messageHandler.openDialogWithStates(
        states,
        {
            closeText: '',
            persistent: true,
            zIndex: 1020
        },
        null
    );
    
    /**
     * Closes LoginDialog.
     */
    this.close = function() {
        connDialog.close();
    };
}

/**
 * Auth dialog for JitsiConnection which supports retries.
 * If no cancelCallback provided then there will be
 * no cancel button on the dialog.
 *
 * @class LoginDialog
 * @constructor
 *
 * @param {function(jid, password)} successCallback
 * @param {function} [cancelCallback] callback to invoke if user canceled.
 */
function SubscriptionSuccessDialog(successCallback, cancelCallback) {
    const subscriptionSuccessButtons = [ {
        title: APP.translation.generateTranslationHTML('dialog.Ok'),
        value: true
    }];

    const states = {
        subscribed: {
            buttons: subscriptionSuccessButtons,
            html: subscriptionSuccess(),
            titleKey: 'dialog.subscriptionSuccess',

            submit(e, v, m, f) { // eslint-disable-line max-params
                e.preventDefault();
                if (v) {
                    successCallback('success');
                    connDialogSubscription.close();
                } else {
                    // User cancelled
                    cancelCallback();
                }
            }
        },
    };
    const connDialogSubscription = APP.UI.messageHandler.openDialogWithStates(
        states,
        {
            closeText: '',
            persistent: true,
            zIndex: 1020
        },
        null
    );
    
    /**
     * Closes LoginDialog.
     */
    this.close = function() {
        connDialogSubscription.close();
    };
}

export default {
    showSubscriptionDialog(successCallback, cancelCallback) {
        return new SubscriptionDialog(successCallback, cancelCallback);
    },
    showSubscriptionSuccessDialog(successCallback, cancelCallback) {
        return new SubscriptionSuccessDialog(successCallback, cancelCallback);
    }
}