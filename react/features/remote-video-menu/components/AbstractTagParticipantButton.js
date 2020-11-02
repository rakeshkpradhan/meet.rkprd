// @flow

import { openDialog } from '../../base/dialog';
import { IconKick } from '../../base/icons';
import { AbstractButton, type AbstractButtonProps } from '../../base/toolbox/components';

import { TagRemoteParticipantDialog } from '.';

export type Props = AbstractButtonProps & {

    /**
     * The redux {@code dispatch} function.
     */
    dispatch: Function,

    /**
     * The ID of the participant that this button is supposed to tag.
     */
    participantID: string,

    /**
     * The participant object retreived from Redux.
     */
    _participant: Object,

    /**
     * The function to be used to translate i18n labels.
     */
    t: Function
};

/**
 * An abstract remote video menu button which tags the remote participant.
 */
export default class AbstractTagParticipantButton extends AbstractButton<Props, *> {
    accessibilityLabel = 'toolbar.accessibilityLabel.tag';
    icon = IconKick;
    label = 'videothumbnail.tag';

    /**
     * Handles clicking / pressing the button, and tags the participant.
     *
     * @private
     * @returns {void}
     */
    _handleClick() {
        const { dispatch, participantID, _participant } = this.props;

        dispatch(openDialog(TagRemoteParticipantDialog, { _participant }));
    }
}
