// @flow

import { Component } from 'react';

import { tagParticipant } from '../actions';

/**
 * The type of the React {@code Component} props of
 * {@link AbstractTagRemoteParticipantDialog}.
 */
export type Props = {

    /**
     * The Redux dispatch function.
     */
    dispatch: Function,

    /**
     * The ID of the remote participant to be tagged.
     */
    participantID: string,

    /**
     * Function to translate i18n labels.
     */
    t: Function
};

/**
 * Abstract dialog to confirm a remote participant tag action.
 *
 * @extends Component
 */
export default class AbstractTagRemoteParticipantDialog<P:Props = Props>
    extends Component<P> {
    /**
     * Initializes a new {@code AbstractTagRemoteParticipantDialog} instance.
     *
     * @param {Object} props - The read-only properties with which the new
     * instance is to be initialized.
     */
    constructor(props: P) {
        super(props);
        console.log('Tag remote dialog constructor');
        console.log(props);
        this.state = {
            tagName: '',
            isTagSelectOpen: false
        };
        // Bind event handlers so they are only bound once per instance.
        this._onSubmit = this._onSubmit.bind(this);
        this._onTagChange = this._onTagChange.bind(this);
        this._onTagDropdownOpenChange = this._onTagDropdownOpenChange.bind(this);
    }

    _onSubmit: () => boolean;

    /**
     * Handles the submit button action.
     *
     * @private
     * @returns {boolean} - True (to note that the modal should be closed).
     */
    _onSubmit() {
        const { dispatch, _participant } = this.props;
        console.log("onSubmit");
        console.log(this.state.tagName);
        console.log(_participant.id);
        console.log(this.props);
        console.log("onSubmit end");
        // pass tag to be added
        dispatch(tagParticipant(_participant.id, this.state.tagName));
        return true;
    }

    _onTagChange: (Object) => void;

    /**
     * Updates the entered display name.
     *
     * @param {String} tag - The DOM event triggered from the entered display
     * name value having changed.
     * @private
     * @returns {void}
     */
    _onTagChange(tag) {
        console.log(tag.currentTag);
        this.setState({
            tagName: tag.currentTag
        });
    }

    _onTagDropdownOpenChange: (Object) => void;

    /**
     * Callback invoked to toggle display of the language select dropdown.
     *
     * @param {Object} event - The event for opening or closing the dropdown.
     * @private
     * @returns {void}
     */
    _onTagDropdownOpenChange({ isOpen }) {
        this.setState({ isTagSelectOpen: isOpen });
    }
}
