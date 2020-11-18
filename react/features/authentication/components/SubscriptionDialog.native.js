/* @flow */

import React, { Component } from 'react';
import { Text, TextInput, View } from 'react-native';
import { connect as reduxConnect } from 'react-redux';
import type { Dispatch } from 'redux';

import { ColorSchemeRegistry } from '../../base/color-scheme';
import { toJid } from '../../base/connection';
import { connect } from '../../base/connection/actions.native';
import {
    CustomSubmitDialog,
    FIELD_UNDERLINE,
    PLACEHOLDER_COLOR,
    _abstractMapStateToProps,
    inputDialog as inputDialogStyle
} from '../../base/dialog';
import { translate } from '../../base/i18n';
import { JitsiConnectionErrors } from '../../base/lib-jitsi-meet';
import type { StyleType } from '../../base/styles';
import { authenticateAndUpgradeRole, cancelLogin } from '../actions';

// Register styles.
import './styles';


/**
 * The type of the React {@link Component} props of {@link LoginDialog}.
 */
type Props = {

    /**
     * {@link JitsiConference} that needs authentication - will hold a valid
     * value in XMPP login + guest access mode.
     */
    _conference: Object,

    /**
     * The server hosts specified in the global config.
     */
    _configHosts: Object,

    /**
     * Indicates if the dialog should display "connecting" status message.
     */
    _connecting: boolean,

    /**
     * The color-schemed stylesheet of the base/dialog feature.
     */
    _dialogStyles: StyleType,

    /**
     * The error which occurred during login/authentication.
     */
    _error: Object,

    /**
     * The progress in the floating range between 0 and 1 of the authenticating
     * and upgrading the role of the local participant/user.
     */
    _progress: number,

    /**
     * The color-schemed stylesheet of this feature.
     */
    _styles: StyleType,

    /**
     * Redux store dispatch method.
     */
    dispatch: Dispatch<any>,

    /**
     * Invoked to obtain translated strings.
     */
    t: Function
};

/**
 * The type of the React {@link Component} state of {@link LoginDialog}.
 */
type State = {

    /**
     * The user entered password for the conference.
     */
    selectedplan: string,

};

class SubscriptionDialog extends Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            selectedplan: ''
        };

        // Bind event handlers so they are only bound once per instance.
        this._onCancel = this._onCancel.bind(this);
        this._onPlanSubmit = this._onPlanSubmit.bind(this);
        this._onPlanChange = this._onPlanChange.bind(this);
    }
    render() {
        const {
            _connecting: connecting,
            _dialogStyles,
            _styles: styles,
            t
        } = this.props;
        return (
            
        )
    }
}
