import React from 'react';
import PropTypes from 'prop-types';
import {
    Player,
    ControlBar,
    ReplayControl,
    ForwardControl,
    CurrentTimeDisplay,
    TimeDivider,
    PlaybackRateMenuButton,
    VolumeMenuButton
  } from 'video-react';
import "../node_modules/video-react/dist/video-react.css"; // import css

class VideoPlayerField extends React.Component {
    constructor(props) {
        super (props);
        console.info('video injast:', props);
    }

render () {
    return (
        <div>video Player</div>
        // <Player
        //         poster = {this.props.record.thumbnail}
        //         // startTime = {this.state.startTime}
        //         style={{
        //             height: '200px'
        //         }}
        //         >
                    
        //     <source 
        //         src={this.props.record.summary.videoAddress}
        //         />

        //     <ControlBar>
        //         <ReplayControl seconds={10} order={1.1} />
        //         <ForwardControl seconds={10} order={1.2} />
        //         <CurrentTimeDisplay order={4.1} />
        //         <TimeDivider order={4.2} />
        //         <PlaybackRateMenuButton rates={[5, 2, 1, 0.5, 0.1]} order={7.1} />
        //         <VolumeMenuButton />
        //     </ControlBar>
        // </Player>
    )
}

}
// const TextField = ({ source, record = {} }) => <span>{record[source]}</span>;

VideoPlayerField.propTypes = {
    label: PropTypes.string,
    record: PropTypes.object,
    source: PropTypes.string.isRequired,
};

export default VideoPlayerField;