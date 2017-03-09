import React = require('react');
import ReactDOM = require('react-dom');
import utilFile = require('./../../core/Util');

export namespace GooFlowApp {

    export class GooFlow<P extends GooFlowProps, S extends GooFlowStates> extends React.Component<P, S>{
        private gooFlowObj: any;

        public render(): React.ReactElement<any> {
            return <div className="Hu-gooflow pull-left">
                <div id="GooFlowDom">
                    <div>正在载入GooFlowDom的组件......</div>
                </div>
            </div>
        }

        protected componentDidMount(): void {
            //this.props.fetchData(); 异步获取数据的时候调用，目前使用的是静态数据
            //if (this.props.NeedReload) {
            //    this.fGooFlowInit();
           // }
            this.fGooFlowInit();
        };

        private reloadData(): void {
            if (this.gooFlowObj && this.props.NeedReload)
            {
                this.gooFlowObj.clearData();
                this.gooFlowObj.loadData(this.props.FlowData);
                this.props.NeedReload = false;
            }
        };

        protected componentDidUpdate(prevProps: P, prevState: S, prevContext: any): void{
            if (this.props.NeedReload) {
                this.fGooFlowInit();
            }
        };

        private fGooFlowInit() {
            var flowdata = this.props.FlowData;
            var __this = this;
            var _$dom = $(ReactDOM.findDOMNode(this)).find("#GooFlowDom");
            if (_$dom.length > 0) {
                _$dom.html("");
                utilFile.Core.Util.AsyncJs([
                    "../../lib/gooFlow/js/GooFlow.css",
                    "../../lib/gooFlow/js/GooFlow.js", "../../lib/gooFlow/js/GooFunc.js"],
                    () => {

                        try {
                            var remark = {
                                cursor: "选择指针",
                                direct: "结点连线",
                                start: "入口结点",
                                "end": "结束结点",
                                "task": "任务结点",
                                node: "自动结点",
                                chat: "决策结点",
                                state: "状态结点",
                                plug: "附加插件",
                                fork: "分支结点",
                                "join": "联合结点",
                                recombination: "复合结点",
                                group: "组织划分框编辑开关"
                            };
                            var op = {
                                height: this.fSetHeight(), width: this.props.WorkWidth,
                                toolBtns: ["start", "end", "task", "node", "state", "fork"],
                                haveHead: true,
                                headBtns: ["new", "open", "save", "undo", "redo", "reload"], //如果haveHead=true，则定义HEAD区的按钮
                                haveTool: true,
                                // haveGroup: true,
                                useOperStack: true
                            };
                            var GooFlow = $.createGooFlow($("#GooFlowDom"), op);
                            this.gooFlowObj = GooFlow;
                            GooFlow.setNodeRemarks(remark);
                            GooFlow.clearData();
                            GooFlow.loadData(flowdata);
                            GooFlow.onItemDel = (id, type) => {
                                this.props.delItem(id, type);
                                return true;
                            };
                            GooFlow.onItemAdd = (id, type, json) => {
                                this.props.addItem(id, type, json);
                                return true;
                            };
                        }

                        catch (ex) {
                            console.error(ex);
                        }

                    });
            }
        }

        private fSetHeight() {
            var _n = $(window).height() - $(".ACT-HEADER-BODY").height() - $(".Hu-breadcrumb").height() - 50;
            return _n;
        }

    }




    class GooFlowStates {
    }

    class GooFlowProps {
        public WorkWidth?: number;
        public FlowData: any;
       public delItem(id, type) { }
       public addItem(id, type, json) { }
       public fetchData(): any { }
       public Index?: number;
       public NeedReload?: boolean = false;
       public dispatch:any;
    }
}

