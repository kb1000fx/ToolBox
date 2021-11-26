// ==UserScript==
// @name         Fanatical批量刮key
// @namespace    kb1000fx
// @version      0.1
// @description  Fanatical批量刮key
// @author       kb1000fx
// @match        https://www.fanatical.com/*
// @icon         https://cdn.fanatical.com/production/icons/favicon-32x32.png
// @grant        GM_addStyle
// @grant        GM_setClipboard
// @require      https://cdn.jsdelivr.net/npm/jquery@3.4.1/dist/jquery.min.js
// @updateURL    https://github.com/kb1000fx/ToolBox/raw/master/FanaticalRevealKeys/FanaticalRevealKeys.js
// @downloadURL  https://github.com/kb1000fx/ToolBox/raw/master/FanaticalRevealKeys/FanaticalRevealKeys.js
// ==/UserScript==

(function(){
    const cbxHTML = `
        <div class="checkbox">
            <input type="checkbox" name="ordercbx"/>
        </div>
    `;

    const css = `
        .table-item{
            display: flex;
            flex-direction: row;
        }
        .checkbox{
            display: flex;
            justify-content:center; 
            width: 5%;
            align-items: center;
        }
        .table-item a{
            width: 95%
        }
        .tm-panel{
            margin-bottom: 24px;
        }
        .tm-btn{
            margin-right: 20px;
        }
    `;

    const panelHTML = `
        <div class="tm-panel">
            <button id="redeem-btn" class="btn btn-primary tm-btn">刮Key</button>
            <button id="get-btn" class="btn btn-primary tm-btn">提取</button>
            <button id="copy-btn" class="btn btn-primary tm-btn">复制</button>
        </div>
    `;

    let orderIDList = [];
    let unrevealedList = [];
    let revealedList = [];
    let sortedJson ={};
    let str = "";

    const getRes = ()=>{
        orderIDList = [];
        unrevealedList = [];
        revealedList = [];
        $("input[name='ordercbx']:checked").each(function (i,e){
            const orderStr = $(e).parent("div").next().attr("href");
            orderIDList.push( orderStr.split("/")[3] ); 
        });        
        console.log(`已选择 ${orderIDList.length}个订单`);

        for (let index = 0; index < orderIDList.length; index++) {
            const ID = orderIDList[index];
            $.ajax({
                async: false,
                url: `https://www.fanatical.com/api/user/orders/${ID}`,
                type: "GET",
                headers: {
                    anonid: JSON.parse(window.localStorage.bsanonymous).id,
                    authorization: JSON.parse(window.localStorage.bsauth).token,
                    'content-type': 'application/json; charset=utf-8'
                },
                success: function(res) {
                    if (res.status == "COMPLETE") {
                        for (const item of res.items) {
                            if (item.status == "fulfilled") {
                                unrevealedList.push(item)
                            } else if(item.status == "revealed") {
                                revealedList.push({
                                    name: item.name,
                                    key: item.key,
                                })
                            } else {
                                console.log(item)
                            }
                        }
                    } else {
                        console.log(`Order ${res._id} is ${res.status}`)
                    }
                },
            });
        }
    };

    const revealKey = ()=>{
        for (const item of unrevealedList) {
            let e = {};
            e["name"] = item.name;          
            $.ajax({
                async: false,
                url: `https://www.fanatical.com/api/user/orders/redeem`,
                type: "POST",
                headers: {
                    anonid: JSON.parse(window.localStorage.bsanonymous).id,
                    authorization: JSON.parse(window.localStorage.bsauth).token,
                    'content-type': 'application/json; charset=utf-8'
                },
                data: JSON.stringify(item),
                success: function(res) {
                    e["key"] = res.key;
                    revealedList.push(e);
                }
            })
        }
    };

    const sortRes = ()=>{
        sortedJson ={};
        str = "";
        for (const e of revealedList) {
            if(!(e.name in sortedJson)) {
                sortedJson[e.name] = [];             
            };
            sortedJson[e.name].push(e.key);
        }
        console.log(sortedJson); 
        for (const name in sortedJson) {
            const lst = sortedJson[name];
            str += `\n${name}:\n`;    
            for (const key of lst) {
                str += `${key}\n`
            }
        }
        copyRes();
    };

    const copyRes = ()=>{
        console.log(str);
        GM_setClipboard(str);
        alert("结果已导出至剪切板")
    };

    const initUI = ()=>{
        $(".table-item").prepend(cbxHTML);
        $(".order-search").after(panelHTML);
        GM_addStyle(css);
    };

    const addListeners = ()=>{
        $("#redeem-btn").click(()=>{
            getRes();
            revealKey();
            sortRes();
        });
        $("#get-btn").click(()=>{
            getRes();
            sortRes();
        });
        $("#copy-btn").click(()=>{
            copyRes();
        });
    };

    window.onload = function(){
        initUI();
        addListeners();      
    };  
})();