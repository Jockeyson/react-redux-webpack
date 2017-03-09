import { connect } from 'react-redux'
import { addItem, delItem, fetchData } from '../actions/index'
import GooFlowApp = require('../components/gooflow')
import { fetchCurrentFlowData } from '../common/common'


const mapStateToProps = (state) => ({
    Width: 600,
    FlowData: fetchCurrentFlowData(state.data, state.currentIndex),
    NeedReload:state.needReload
})

const mapDispatchToProps = ({
    addItem: addItem,
    delItem: delItem,
    fetchData: fetchData
})

const DesignGooFlow = connect(
    mapStateToProps,
    mapDispatchToProps
)(GooFlowApp.GooFlowApp.GooFlow)

export default DesignGooFlow
