import { deepCopy, fetchCurrentFlowData, getTimeSpan } from '../common/common'
import { combineReducers } from 'redux'

const flowData = {
    lines: {
        demo1_line_10: {
            from: "demo1_node_1",
            marked: false,
            name: "",
            to: "demo1_node_3",
            type: "sl",
        },
        demo1_line_11: {
            from: "demo1_node_3",
            marked: false,
            name: "",
            to: "demo1_node_5",
            type: "sl",
        },
        demo1_line_12: {
            from: "demo1_node_5",
            marked: false,
            name: "",
            to: "demo1_node_6",
            type: "sl",
        },
        demo1_line_13: {
            from: "demo1_node_6",
            marked: false,
            name: "",
            to: "demo1_node_7",
            type: "sl",
        },
        demo1_line_14: {
            from: "demo1_node_7",
            marked: false,
            name: "",
            to: "demo1_node_4",
            type: "sl",
        },
        demo1_line_15: {
            M: 409,
            from: "demo1_node_4",
            marked: false,
            name: "",
            to: "demo1_node_8",
            type: "lr",
        },
        demo1_line_16: {
            M: 537.5,
            from: "demo1_node_8",
            marked: false,
            name: "",
            to: "demo1_node_9",
            type: "lr",
        },
        demo1_line_21: {
            from: "demo1_node_9",
            marked: false,
            name: "",
            to: "demo1_node_2",
            type: "sl",
        },
    },
    nodes: {
        demo1_node_1: {
            height: 100,//24,
            left: 10,//80,
            name: "开始",
            top: 10,//62,
            type: "start",
            width: 100,//24,
        },
        demo1_node_2: {
            height: 24,
            left: 699,
            name: "结束",
            top: 57,
            type: "end",
            width: 24,
        },
        demo1_node_3: {
            height: 24,
            left: 153,
            name: "需求调研",
            top: 66,
            type: "fork",
            width: 100,//86,
        },
        demo1_node_4: {
            height: 24,
            left: 298,
            name: "开发编程",
            top: 254,
            type: "complex",
            width: 86,
        },
        demo1_node_5: {
            height: 24,
            left: 158,
            name: "需求分析",
            top: 132,
            type: "state",
            width: 86,
        },
        demo1_node_6: {
            height: 24,
            left: 300,
            name: "总体设计",
            top: 133,
            type: "node",
            width: 86,
        },
        demo1_node_7: {
            height: 24,
            left: 297,
            name: "详细设计",
            top: 195,
            type: "node",
            width: 86,
        },
        demo1_node_8: {
            height: 24,
            left: 434,
            name: "测试",
            top: 134,
            type: "task",
            width: 86,
        },
        demo1_node_9: {
            height: 24,
            left: 555,
            name: "验收",
            top: 59,
            type: "plug",
            width: 86,
        },
    }
}

let index = 0
const initialState = { data: [{ index: index, flowData: flowData }], currentIndex: index, currentNewNodeCount:0};
//const initialState = { data: [], currentIndex: index, currentNewNodeCount: 0 };
const flowdesign = (state = initialState, action) => {
    let flowData: any = {};
    let currentNewNodeCount = state.currentNewNodeCount;
    let currentIndex = state.currentIndex;
    deepCopy(flowData, fetchCurrentFlowData(state.data, state.currentIndex));
    switch (action.type) {
        case 'ADD_ITEM':
            if (action.nodeType == 'node') {
                currentNewNodeCount++;
                action.json.name = "node_" + currentNewNodeCount;
                flowData.nodes["node_" + getTimeSpan()] = action.json;
            }
            else if (action.nodeType == 'line') {
                flowData.lines["line" + getTimeSpan()] = action.json;
            }
            else {
                return state;
            }
            break;
        case 'DEL_ITEM':
            let newArr = [];
            newArr = state.data.filter((a) => {
                return a.index <= currentIndex
            });
            if (flowData.nodes[action.id]) {
                for (var l in flowData.lines) {
                    if (flowData.lines[l].from == action.id || flowData.lines[l].to == action.id) {
                        delete flowData.lines[l];
                        currentIndex++;
                        newArr.push({ index: currentIndex, flowData: deepCopy({}, flowData) });
                    }
                }
                delete flowData.nodes[action.id];
                newArr.push({ index: currentIndex + 1, flowData: flowData });
                return { data: newArr, currentIndex: currentIndex + 1, currentNewNodeCount: currentNewNodeCount };

            }
            else if (flowData.lines[action.id]) {
                delete flowData.lines[action.id];
            }
            else {
                return state;
            }
            break;
        case 'BACK':
            if (state.currentIndex == 0)
                return state;
            return { data: state.data, currentIndex: currentIndex - 1, needReload: true, currentNewNodeCount: state.currentNewNodeCount };
        case 'FORWARD':
            if (state.currentIndex + 1 == state.data.length)
                return state;
            return { data: state.data, currentIndex: currentIndex + 1, needReload: true, currentNewNodeCount: state.currentNewNodeCount };
        case 'FETCH_SUCCESS':
            let newData = state.data.slice();
            newData.push({ index: 0, flowData: action.data });
            return { ...state, data: newData, needReload: true };
        default:
            return state
    }
    let newArr = state.data.filter((a) => {
        return a.index <= currentIndex
    });
    newArr.push({ index: currentIndex + 1, flowData: flowData });
    return { data: newArr, currentIndex: currentIndex + 1, currentNewNodeCount: currentNewNodeCount };
}


export default flowdesign