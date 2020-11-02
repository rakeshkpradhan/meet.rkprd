/* @flow */

import React, { Component } from 'react';
import { translate } from '../../base/i18n';
import { connect } from '../../base/redux';
import TimeElapsed from './TimeElapsed';
import CallActionDisplay from './CallActionDisplay';

/**
 * The type of the React {@code Component} props of {@link SpeakerStatsItem}.
 */
type Props = {

    /**
     * The name of the participant.
     */
    displayName: string,

    /**
     * The total milliseconds the participant has been dominant speaker.
     */
    dominantSpeakerTime: number,

    /**
     * True if the participant is no longer in the meeting.
     */
    hasLeft: boolean,

    /**
     * True if the participant is currently the dominant speaker.
     */
    isDominantSpeaker: boolean,

    /**
     * The userId of the participant.
     */
    userId: string,
};

/**
 * React component for display an individual user's speaker stats.
 *
 * @extends Component
 */
class SpeakerStatsItem extends Component<Props> {

    /**
     * Implements React's {@link Component#render()}.
     *
     * @inheritdoc
     * @returns {ReactElement}
     */
    render() {
        const hasLeftClass = this.props.hasLeft ? 'status-user-left' : '';
        const rowDisplayClass = `speaker-stats-item ${hasLeftClass}`;
        let control = [];
        let dotClass = this.props.isDominantSpeaker
            ? 'status-active' : 'status-inactive';
        if(this.props.isDummy){
            dotClass = 'status-notjoined';
            control.push(this._createCallDisplay(this.props.displayName, this.props.onClick, this.props.isClicked, this.props.userId));
        } /* else{
            control.push(this._createDisplay(this.props.displayName ,this.props.dominantSpeakerTime));

        } */
        const speakerStatusClass = `speaker-stats-item__status-dot ${dotClass}`;
        
        return (
            <div className = { rowDisplayClass }>
                <div className = 'speaker-stats-item__status'>
                    <span className = { speakerStatusClass } />
                </div>
                <div className = 'speaker-stats-item__name'>
                    { this.props.displayName }
                </div>
                <div className = 'speaker-stats-item__time'>
                    {control} 
                </div>
            </div>
        );
    }

    _createDisplay: () => void;

    /**
     * Returns a ReactElement to display the passed in count and a count noun.
     *
     * @private
     * 
     * count noun plurality.
     * @param {string} speakerTime 
     * @param {string} displayName
     * @returns {ReactElement}
     */
    _createDisplay(displayName, speakerTime) {
        let key = `${displayName}-stat-item`;
        return (
            <TimeElapsed key = {key} 
                    time = { speakerTime } />
        );
    }

    _createCallDisplay: () => void;

    /**
     * Returns a ReactElement to display the passed in count and a count noun.
     *
     * @private
     * 
     * count noun plurality.
     * @param {string} displayName
     * @returns {ReactElement}
     */
    _createCallDisplay(displayName, onClick, isClick, userId) {
        let key = `${displayName}-stat-item`;
        let className = isClick ? 'speaker-stats-item-call-link' : 'speaker-stats-item-call-normal';
        return (
            <CallActionDisplay key={key}
                    className = {className}
                    onClick={() => onClick(userId)}/>
        );
    }

    _onClick(){
        
        console.log('Calling Participant ....');
    }
}

export default translate(SpeakerStatsItem);
