// @flow
import { FieldTextStateless as TextField } from '@atlaskit/field-text';
import DropdownMenu, {
    DropdownItem,
    DropdownItemGroup
} from '@atlaskit/dropdown-menu';
import React from 'react';

import { Dialog } from '../../../base/dialog';
import { translate } from '../../../base/i18n';
import { connect } from '../../../base/redux';
import AbstractTagRemoteParticipantDialog
    from '../AbstractTagRemoteParticipantDialog';

/**
* The type of the React {@code Component} props of {@link TagRemoteParticipantDialog}.
*/
type State = {

    /**
     * The name to show in the display name text field.
     */
    tagName: string
};
/**
 * Dialog to confirm a remote participant kick action.
 */
class TagRemoteParticipantDialog extends AbstractTagRemoteParticipantDialog  {
    /**
     * Implements React's {@link Component#render()}.
     *
     * @inheritdoc
     * @returns {ReactElement}
     */
    render() {
        console.log(this.props);
        let currentTag = this.state.tagName;
        let tags = ['Boss', 'Peer', 'Directs', 'Custom']
        const tagItems
            = tags.map(tag => (
                <DropdownItem
                    key={tag}

                    // eslint-disable-next-line react/jsx-no-bind
                    onClick={
                        () => this._onTagChange({ currentTag: tag })}>
                    {this.props.t(`tags:${tag}`)}
                </DropdownItem>));
        return (
            <Dialog
                okKey= 'dialog.tagParticipantButton'
                onSubmit = { this._onSubmit }
                titleKey= 'dialog.tagParticipantTitle'
                width = 'small'>
                {/* <TextField
                    autoFocus={true}
                    compact={true}
                    label={this.props.t('dialog.tagTitle')}
                    name='tagName'
                    onChange={this._onTagChange}
                    shouldFitContainer={true}
                    type='text'
                    value={ this.state.tagName } /> */}
                <div className='mock-atlaskit-label'>
                    {this.props.t('dialog.tagTitle')}
                </div>
                <DropdownMenu
                    isOpen={this.state.isTagSelectOpen}
                    onOpenChange={this._onTagDropdownOpenChange}
                    shouldFitContainer={true}
                    trigger= { currentTag
                        ? this.props.t(`tags:${currentTag}`)
                        : '' }
                    triggerButtonProps={{
                        appearance: 'primary',
                        shouldFitContainer: true
                    }}
                    triggerType='button'>
                    <DropdownItemGroup>
                        {tagItems}
                    </DropdownItemGroup>
                </DropdownMenu>
                
            </Dialog>
        );
    }

    _onSubmit: () => boolean;
}

export default translate(connect()(TagRemoteParticipantDialog));
