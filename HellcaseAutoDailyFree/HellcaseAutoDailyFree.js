// ==UserScript==
// @name         Hellcase Auto Daily Free
// @namespace    https://github.com/kb1000fx/ToolBox/
// @version      0.1
// @description  Automatically get Hellcase daily free bonus
// @icon         https://cdn.hellcase.com/hellcase/img/web/hw.png
// @author       kb1000fx
// @updateURL    https://github.com/kb1000fx/ToolBox/raw/master/HellcaseAutoDailyFree/HellcaseAutoDailyFree.js
// @downloadURL  https://github.com/kb1000fx/ToolBox/raw/master/HellcaseAutoDailyFree/HellcaseAutoDailyFree.js
// @match        https://hellcase.com/en/dailyfree
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    if($('#btn_open_daily_free span').length){
        $('#btn_open_daily_free').click();
        setTimeout(() => {
            location.reload();
        }, 3000);
    }else{
        let str = $('.hellcase-btn-success.big.disabled.notavailable span').text().split(" ");
        let length = str.length;
        let hr = Number(str[length-4])||0;
        let min = Number(str[length-2]);
        let time = (hr * 60 + min + 5) * 60 * 1000;
        console.log('Page will reload in ' + hr + " hours " + (min + 5) + " minutes.");
        setTimeout(() => {
            location.reload()
        }, time);
    }
})();