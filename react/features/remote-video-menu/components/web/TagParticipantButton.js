/* @flow */

import React from 'react';

import { translate } from '../../../base/i18n';
import { IconTag } from '../../../base/icons';
import { connect } from '../../../base/redux';
import { getParticipantById } from '../../../base/participants';
import AbstractTagParticipantButton, {
    type Props
} from '../AbstractTagParticipantButton';

import RemoteVideoMenuButton from './RemoteVideoMenuButton';

declare var interfaceConfig: Object;

/**
 * Implements a React {@link Component} which displays a button for tagging 
 * a participant from the conference.
 *
 * NOTE: At the time of writing this is a button that doesn't use the
 * {@code AbstractButton} base component, but is inherited from the same
 * super class ({@code AbstractKickButton} that extends {@code AbstractButton})
 * for the sake of code sharing between web and mobile. Once web uses the
 * {@code AbstractButton} base component, this can be fully removed.
 */
class TagParticipantButton extends AbstractTagParticipantButton {
    /**
     * Instantiates a new {@code Component}.
     *
     * @inheritdoc
     */
    constructor(props: Props) {
        super(props);

        this._handleClick = this._handleClick.bind(this);
    }

    /**
     * Implements React's {@link Component#render()}.
     *
     * @inheritdoc
     * @returns {ReactElement}
     */
    render() {
        const { participantID, t, visible, _participant } = this.props;
        console.log('In Tag menu - render');
        console.log(this.props);
        if (!visible) {
            return null;
        }

        return (
            <RemoteVideoMenuButton
                buttonText={t('videothumbnail.tag', { participant: _participant.name }) } 
                displayClass = 'taglink'
                icon = { IconTag }
                id = { participantID }
                // eslint-disable-next-line react/jsx-handler-names
                onClick = { this._handleClick } />
        );
    }

    _handleClick: () => void
}

/**
 * Maps part of the Redux store to the props of this component.
 *
 * @param {Object} state - The Redux state.
 * @param {Props} ownProps - The own props of the component.
 * @returns {Props}
 */
export function _mapStateToProps(state: Object, ownProps: Props): $Shape<Props> {
    return {
        _participant: getParticipantById(state, ownProps.participantID)
    };
}


export default translate(connect(_mapStateToProps)(TagParticipantButton));

