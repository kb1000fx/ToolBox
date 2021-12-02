// ==UserScript==
// @name         Directg批量刮key
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  韩国站批量刮key整理
// @author       kb1000fx
// @match        https://directg.net/mypage/v2/mypage_order_view_v2.html*
// @icon         https://www.google.com/s2/favicons?domain=directg.net
// @grant        GM_setClipboard
// @updateURL    https://github.com/kb1000fx/ToolBox/raw/master/DirectgRevealKeys/directg.js
// @downloadURL  https://github.com/kb1000fx/ToolBox/raw/master/DirectgRevealKeys/directg.js
// ==/UserScript==

(function() {
    'use strict';

    const panelHTML = `
        <div style="margin: 20px">
            <button type="button" class="btn btn-info btn-sm" id="tm-reveal-btn">
                刮key
            </button>
            <button type="button" class="btn btn-info btn-sm" id="tm-get-btn">
                提取key
            </button>
            <button type="button" class="btn btn-info btn-sm" id="tm-copy-btn">
                复制
            </button>
        </div>
    `;

    let str = "";

    const addListeners = ()=>{
        $("#tm-reveal-btn").click(async function(){
            const activateLst = [];
            $(".btn_activate").each(function(i,e){
                activateLst.push($(e).data());
            });
            const bodyLst = createBody("setActivate", activateLst);
            for (const body of bodyLst) {
                await fetch('https://directg.net/mypage/v2/licence_activate.php', {
                    method: 'POST',
                    body,
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                        'X-Requested-With': 'HttpRequest'
                    }
                }).then(res => res.json()).then(res => {
                    console.log(res.error_msg)
                })
            }
            window.location.reload();
            alert("刮key成功，请点提取按钮提取")
        });

        $("#tm-get-btn").click(async function(){
            const viewLst = [];
            $(".btn_licence_view").each(function(i,e){
                viewLst.push($(e).data());
            });
            const bodyLst = createBody("getLicence", viewLst);
            let resList = [];
            for (const body of bodyLst) {
                await fetch('https://directg.net/mypage/v2/licence_activate.php', {
                    method: 'POST',
                    body,
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                        'X-Requested-With': 'HttpRequest'
                    }
                }).then(res => res.text()).then(res => {
                    const name = $(res).find(".list-group-item-heading").html();
                    const key = $(res).find(".list-group-item-text").html();
                    resList.push({name,key})
                })
            }
            sortRes(resList);
        });

        $("#tm-copy-btn").click(async function(){
            copyRes()
        });
    };

    const createBody = (mode, lst)=>{
        let bodyLst = [];
        for (const e of lst) {
            let body = Object.keys(e).map((item,index) => {
                let t = e[item]
                if(item === 'ztitemid') {
                    item = 'zt_item_id'
                } else if(item === 'ztordno') {
                    item = 'zt_ord_no'
                } else if(item === 'reserveid') {
                    item = 'reserve_id'
                } else if(item === 'suppcd') {
                    item = 'supp_cd'
                } else if(item === 'settleno') {
                    item = 'settle_no'
                } else if(item === 'preorder') {
                    item = 'pre_order'
                } else if(item === 'ztmemid') {
                   item = 'zt_mem_id'
                }
                return item + '=' + t
            }).join('&');
            body += `&mode=${mode}`;
            bodyLst.push(body);
        }
        return bodyLst
    };

    const copyRes = ()=>{
        console.log(str);
        GM_setClipboard(str);
        alert("结果已导出至剪切板, 或在控制台中查看")
    };

    const sortRes = (revealedList)=>{
        let sortedJson ={};
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

    window.onload = function(){
        $("#ktop").after(panelHTML);
        addListeners();      
    };   
})();
