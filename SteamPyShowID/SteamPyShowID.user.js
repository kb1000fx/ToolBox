// ==UserScript==
// @name         PY显示SteamID
// @namespace    kb1000fx
// @version      0.1
// @description  try to take over the world!
// @require      https://cdn.staticfile.org/jquery/3.3.1/jquery.min.js
// @author       kb1000fx
// @match        https://steampy.com/cdkDetail
// @icon         https://steampy.com/img/logo.63413a4f.png
// @grant        none
// @updateURL    https://github.com/kb1000fx/ToolBox/raw/master/SteamPyShowID/SteamPyShowID.user.js
// @downloadURL  https://github.com/kb1000fx/ToolBox/raw/master/SteamPyShowID/SteamPyShowID.user.js
// ==/UserScript==

(function() {
    'use strict';
    const jq=jQuery.noConflict();

    const init = ()=>{
        const hd = jq(".ivu-table-header th")[1];
        jq(hd).after(`<th id="tst-py" class="ivu-table-column-center"><div class="ivu-table-cell"><span class="">Steam64位ID</span></div></th>`);
        const idList = jq(".market-content").prop("__vue__").data;

        jq(".ivu-table-row").each(function(i,e){
            const t = jq(e).children("td")[1];
            jq(t).after(`
                <td class="ivu-table-column-center">
                    <div class="ivu-table-cell">
                        <a target="_blank" href="https://steamcommunity.com/profiles/${idList[i].steamId}" style="color:rgb(81, 90, 110)">${idList[i].steamId}</a> 
                    </div>
                </td>
            `);
        });
    };

    window.onload = function(){
        init();
    };
})();