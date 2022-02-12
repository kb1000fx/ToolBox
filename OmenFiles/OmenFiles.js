;(function (root, factory) {
	root.OmenFiles = factory();
}(this, function () {
    var OmenFiles = {};

    OmenFiles.IframeCSS = `
        /*提示内容动画*/
        .notice-content{
            display: flex;
            position: absolute;
            top: 50%;
            right: -100px;
            animation: noticeAni 3s linear 1;
            background-color: #1fa01f;
            padding: 5px 11px 5px 16px;
            border-radius: 4px;
            box-shadow: 1px 1px 6px 0px #0da90d;
        }
        @keyframes noticeAni{
            0%{
                    top: 50%;
                    right: -100px;
                }
            15%{
                    top: 50%;
                    right: 10px;
                }
            45%{
                    top: 35%;
                    right: 10px;
                }
            75%{
                    top: 20%;
                    right: 10px;
                }
            100%{
                    top: 20%;
                    right: -100px;
                    }
        }
        #kl-tool-mask{
            width: 100%;
            height: 100%;
            position: fixed;
            left: 0;
            top: 0;
            z-index: 998;
            background: #000000d1!important;
            opacity: .85!important;
            display: none;
        }
        #kl-tool-iframe{
            position: fixed;
            top: 5rem;
            left: 5rem;
            right: 5rem;
            bottom: 5rem;
            /*height: 95vh;*/
            background-color: #66bbff;
            z-index: 999;
            overflow: hidden;
            border-radius: .5rem;
        }
        #kl-tool-iframe .kl-tool-content{
            margin:1rem;
            height: 90%;
            display: flex;
            flex-direction: column;
        }
        .kl-tool-content > .omen-header{
            height:20px;
            display:flex;
        }
        #kl-tool-mainArea {
            display: flex;
            flex-direction: column;
            height: 100%;

        }
        .kl-tool-content .omen-loading{
            width: 53%;
            text-align: right;
            visibility: hidden;
        }
        .kl-tool-content .omen-loading>.icon{
            height:20px;
            width:20px;
            display:none;
            transition: 0.5s;
            animation: rotate 1s linear infinite;  /*开始动画后无限循环，用来控制rotate*/
        }
        @keyframes rotate{
            0%{
                transform: rotate(0);
            }
            50%{
                transform:rotate(180deg);
            }
            100%{
                transform: rotate(360deg);
            }
        }
        #kl-tool-iframe-close{
            position: absolute;
            right: 20px;
            cursor: pointer;
        }
    `;

    OmenFiles.UICSS=`
        input#omen-localhost-link:disabled {
            background-color: #dddddd;
        }
        #omen-data{
            display: flex;
            flex-direction: column;
            border: solid 1px #f00;
            width: 49.5%;
            padding: .5rem; 
        }
        #omen-data-wrap{   
            display: flex;                     
            height: 100%;
            overflow: hidden;
            position: relative;
            padding: .5rem;
        }
        #all-panel{
            display: flex;
            flex-direction: column;
            border: solid 1px #f00;
            width: 49.5%;
            padding: .5rem; 
            margin-left: 1%;
        }
        #all-panel-show{
            overflow: scroll;
        }
        #omen-item-area{
            overflow: scroll;
        }
        /*simple*/
        #omen-view-avaliable, #omen-view-current{
            position: relative;
        }
        .omen-item-simple img{
            position: absolute;
            display: none;
            margin-top: -100px;
        }
        .omen-item-simple:hover img{
            display:block;
        }
        /*beauty*/
        #omen-avaliable-list, #omen-current-list{
            display:flex;
            flex-wrap: wrap;
        }
        .omen-challenge-item{
            display: flex;
            flex-direction: column;
            width: 100px;
            margin: .5rem;
        }
        .omen-challenge-item img{
            height: 100px;
            width: 100px;
        }
        .omen-challenge-item:hover div{
            display:block;
        }
        .omen-challenge-item div{
            display:none;
            position: absolute;
            width: 100px;
            background-color: #000000b5;
            color: white;
            height: 100px;
        }
        .omen-challenge-item div>span{
            padding: 7px;
            display: block;
        }
        /*滚动条样式*/
        #kl-tool-iframe ::-webkit-scrollbar {/*滚动条整体样式*/
            width:9px;/*高宽分别对应横竖滚动条的尺寸*/
            height:4px;
        }
        #kl-tool-iframe ::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
            border-radius:5px;
            -webkit-box-shadow:inset 0 0 5px rgba(0,0,0,0.2);
            background:#e0e5eb;
        }
        #kl-tool-iframe ::-webkit-scrollbar-track {/*滚动条里面轨道*/
            // -webkit-box-shadow:inset 0 0 5px rgba(0,0,0,0.2);
            border-radius:0;
            //background: rgba(0,0,0,0.1);
        }
    `;

	return OmenFiles;
}));