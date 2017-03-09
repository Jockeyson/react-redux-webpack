import React = require('react');
import DesignGooFlow from '../containers/DesignGooFlow';
import FlowBackForward from '../containers/FlowBackForward'

const App = () => {
    return <div className="clearfix">
        <DesignGooFlow />
        <FlowBackForward/>
    </div>;
}

export default App