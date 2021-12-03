// ==UserScript==
// @name         PY显示SteamID
// @namespace    kb1000fx
// @version      0.1.2
// @description  try to take over the world!
// @require      https://cdn.staticfile.org/jquery/3.4.1/jquery.slim.min.js
// @author       kb1000fx
// @match        https://steampy.com/cdkDetail
// @icon         https://steampy.com/img/logo.63413a4f.png
// @grant        unsafeWindow
// @grant        window.onload
// @updateURL    https://github.com/kb1000fx/ToolBox/raw/master/SteamPyShowID/SteamPyShowID.user.js
// @downloadURL  https://github.com/kb1000fx/ToolBox/raw/master/SteamPyShowID/SteamPyShowID.user.js
// ==/UserScript==

(function() {
    'use strict';
    unsafeWindow.$ = $;
    const init = ()=>{
        const hd = $(".ivu-table-header th")[1];
        $(hd).after(`<th id="tst-py" class="ivu-table-column-center"><div class="ivu-table-cell"><span class="">Steam64位ID</span></div></th>`);
        const idList = $(".market-content").prop("__vue__").data;

        $(".ivu-table-row").each(function(i,e){
            const t = $(e).children("td")[1];
            $(t).after(`
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