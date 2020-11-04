/* global APP, config, JitsiMeetJS, Promise */

import Logger from 'jitsi-meet-logger';

import { openConnection } from '../../../connection';
import { setJWT } from '../../../react/features/base/jwt';
import {
    JitsiConnectionErrors
} from '../../../react/features/base/lib-jitsi-meet';
import UIUtil from '../util/UIUtil';
//import mainLogo from'../../../images/watermark.png';

import SubscriptionDialog from './SubscriptionDialog';
import validsubscription from '../../../mockresponse/validsubscription';
import plans from '../../../mockresponse/plans';
import getOrderId from '../../../mockresponse/getOrderId';
import confirmorder from '../../../mockresponse/confirmorder';
import AuthHandler from '../authentication/AuthHandler';


const logger = Logger.getLogger(__filename);

const RECEIPT_ID = 'rcptid_11';
const CURRENCY = 'INR';
const SECRET_KEY = 'rzp_test_eFGdVzlMuucOUS'
const MERCHANT_NAME = 'IndiaTalks Pvt Ltd.'
const API_HOST = 'https://subscrip.rkprd.com/api/v1';

const planLog = [];
planLog[30] = {
    amount:100000,
    description:'This plan will be valid for 1 Month'
}
planLog[365] = {
    amount:1000000,
    description:'This plan will be valid for 1 Year'
}

let header = new Headers({
    'Access-Control-Allow-Origin':'*',
    'Content-Type': 'application/json'
});

async function checkSubscription(emailId){
    let _data = {
        user: emailId
    }
    const response = await fetch(`${API_HOST}/subscription`, {
        method: "POST",
        body: JSON.stringify(_data),
        headers: header,
        mode: 'cors'
    }); // Execution stops here until fetch promise is fulfilled.
    const isValidSubscription = await response.json();
    return isValidSubscription; // equivalent of resolving the getGithubUser promise with user value.
}

async function getOrderDetail(amount,emailId){
    let _data = {
        user: emailId,
        amount: parseInt(amount/100)
    }
    const orderResponse = await fetch(`${API_HOST}/create`, {
        method: "POST",
        body: JSON.stringify(_data),
        headers: header,
        mode: 'cors'
    }); // Execution stops here until fetch promise is fulfilled.
    const orderDetail = await orderResponse.json();
    return orderDetail; // equivalent of resolving the getGithubUser promise with user value.*/
}

async function listSubscription(){
    const userplan = await plans(`https://api.github.com/plans`); // Execution stops here until fetch promise is fulfilled.
    const listPlans = userplan.json();
    return listPlans; // equivalent of resolving the getGithubUser promise with user value.
}

async function verifyOrderStatus(emailId,orderitem,days){
    let _data = {
        user: emailId,
        days: parseInt(days),
        razorpay_payment_id:orderitem.razorpay_payment_id,
        razorpay_order_id:orderitem.razorpay_order_id,
        razorpay_signature:orderitem.razorpay_signature
    }
    const orderstatus = await fetch(`${API_HOST}/verify`, {
        method: "POST",
        body: JSON.stringify(_data),
        headers: header,
        mode: 'cors'
    }); // Execution stops here until fetch promise is fulfilled.
    const cnforderstatus = await orderstatus.json();
    return cnforderstatus; // equivalent of resolving the getGithubUser promise with user value.
}

function goForCheckout(amount, orderId, description, responsecallback, failurecallback) {
    const options = {
        "key": SECRET_KEY,
        "amount": amount, // Example: 2000 paise = INR 20
        "name": MERCHANT_NAME,
        "description": description,
        "image": "../../../images/watermark.png",// COMPANY LOGO
        "order_id": orderId,
        "handler": function (response) {
            console.log(response);
            responsecallback(response)
            // AFTER TRANSACTION IS COMPLETE YOU WILL GET THE RESPONSE HERE.
        },
        "prefill": {
            "name": "Rashmi Ranjan", // pass customer name
            "email": 'support@rkprd.com',// customer email
            "contact": '+919123456780' //customer phone no.
        },
        "notes": {
            "address": "address" //customer address 
        },
        "theme": {
            "color": "#263758" // screen color
        }
    };
    const propay = new Razorpay(options);
    propay.on('payment.failed', function (response) {
        failurecallback(response)
    });
    propay.open();
}

function addScript(src) {
    var s = document.createElement('script');
    s.setAttribute('src', src);
    document.head.appendChild(s);
}



function showHideSubscription(emailId,room){
    addScript('https://checkout.razorpay.com/v1/checkout.js');
    checkSubscription(emailId)
    .then(isvalid => {
        if(isvalid.subscription){
            return;
        }else{
            const subscriptionDialog = SubscriptionDialog.showSubscriptionDialog((selectedplan) => {
                const billamount = planLog[selectedplan].amount;
                const billdescription = planLog[selectedplan].description;
                getOrderDetail(billamount,emailId)
                .then(orderitem => {
                    subscriptionDialog.close();
                    goForCheckout(billamount,orderitem.id,billdescription,(checkoutstatus)=>{
                        verifyOrderStatus(emailId,checkoutstatus,selectedplan)
                        .then(isValidOrder => {
                            if(isValidOrder.status === 'Success'){
                                const subscriptionSuccessDialog = SubscriptionDialog.showSubscriptionSuccessDialog((response) =>{
                                    subscriptionDialog.close();
                                },() => subscriptionSuccessDialog.close())
                            }else{
                                AuthHandler.logout(room).then(url => {
                                    if (url) {
                                        UIUtil.redirect(url);
                                    } 
                                });
                            }
                        })

                    },(failurestatus) => {

                    });
                })
                //subscriptionDialog.close();
            },() => subscriptionDialog.close())
        }
    })
    .catch(err => console.log(err));
}

export default {
    showHideSubscription,
    listSubscription
};