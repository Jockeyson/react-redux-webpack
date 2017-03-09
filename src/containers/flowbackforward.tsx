import { connect } from 'react-redux'
import { back, forward } from '../actions/index'
import button  from '../components/button'


const mapStateToProps = (state) => ({
})

const mapDispatchToProps = ({
    onForwardClick: forward,
    onBackClick: back
})

const FlowBackForward = connect(
    mapStateToProps,
    mapDispatchToProps
)(button)

export default FlowBackForward
