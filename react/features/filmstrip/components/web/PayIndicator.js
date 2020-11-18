/* @flow */

import React, { Component } from 'react';

import { IconCameraDisabled } from '../../../base/icons';
import { CopyButton } from '../../../base/buttons/CopyButton';

/**
 * The type of the React {@code Component} props of {@link VideoMutedIndicator}.
 */
type Props = {

    /**
     * From which side of the indicator the tooltip should appear from.
     */
    tooltipPosition: string
};

/**
 * React {@code Component} for showing a video muted icon with a tooltip.
 *
 * @extends Component
 */
class PayIndicator extends Component<Props> {
    
    render() {
        return (
            <div className="indicator-icon-container focusindicator toolbar-icon paynow">
                <div className="jitsi-icon">
                <button
                className = 'primary'
                type = 'button'
                value = 'payrequest'
                >Pay Now</button>
                </div>
               
            </div>
        );
    }
}

export default PayIndicator;
