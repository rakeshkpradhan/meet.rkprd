/* @flow */

import React, { Component } from 'react';

import { translate } from '../../base/i18n';
import { IconDeviceEarpiece } from '../../base/icons';
import { Icon } from '../../base/icons';

/**
 * The type of the React {@code Component} props of {@link CallActionDisplay}.
 */
type Props = {

    /**
     * The function to translate human-readable text.
     */
    t: Function,

    /**
     * The milliseconds to be converted into a human-readable format.
     */
    icon: number
};

/**
 * React component for displaying total time elapsed. Converts a total count of
 * milliseconds into a more humanized form: "# hours, # minutes, # seconds".
 * With a time of 0, "0s" will be displayed.
 *
 * @extends Component
 */
class CallActionDisplay extends Component<Props> {
   
    /**
     * Implements React's {@link Component#render()}.
     *
     * @inheritdoc
     * @returns {ReactElement}
     */
    render() {
        
        const {
            onClick,
            className,
        } = this.props;
        // <span className = 'call-link'>
        //<Icon src = { IconDeviceEarpiece } />
        // </span>  
        //
        return (
                <a
                    className = {className}
                    onClick = { onClick }>
                    <Icon src = { IconDeviceEarpiece } />
                </a>
        );
    }

}

export default translate(CallActionDisplay);
