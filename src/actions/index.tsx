import urlFile = require('./../../core/Url');

//前进
export const forward = () => ({
    type: 'FORWARD'
});

//后退
export const back = () => ({
    type: 'BACK'
});

//增加节点
export const addItem = (id, nodeType, json) => ({
    type: 'ADD_ITEM',
    id: id,
    nodeType: nodeType,
    json: json
})

//删除节点
export const delItem = (id) => ({
    type: "DEL_ITEM",
    id: id
})


export const fetchData = () => dispatch => {
    let a = 1;
    urlFile.Core.AkPost("/WorkFlow/GooFlow/GetWorkflowJson", { shortName: "Weekly-WF-DEFINE" }, (res) => {
        dispatch({
            type: 'FETCH_SUCCESS',
            data: res
        })
    })
    a = 2;
};

