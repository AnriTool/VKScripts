// ==UserScript==
// @name         Stories
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://vk.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=vk.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    function doc_keyUp(e) {
        if ( e.ctrlKey && e.code === 'KeyC') {
            if (document.URL.indexOf("w=story") >= 0){
            //if(document.URL.substr(0,27) == 'https://vk.com/feed?w=story'){
            window.location.href = document.getElementsByClassName("stories_video")[0].src
            }
            if (document.URL.indexOf("video-") >= 0){
            //if(document.URL.substr(0,27) == 'https://vk.com/feed?w=story'){
            window.open(document.URL.substr(document.URL.indexOf("video-")).split('%')[0]+"#dwnld", '_blank').focus();
            }
        }
    }


    function findAll(customQuality){
        var endurls = [];
        var res=''
        var resstr
        var defaultQuals = [144, 240, 360, 480, 720, 1080]
        for (var el of defaultQuals){
            resstr = "url"+el
            var bodytext = document.evaluate("//html/body/script[7]/text()", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null)
            .singleNodeValue
            .textContent

            res = bodytext.substr(bodytext.indexOf(resstr),bodytext.substr(bodytext.indexOf(resstr)).indexOf("\",\""))
            res = res.substr(resstr.length+3)
            if(res != '') {
                endurls.push(el + " : <a href=\"" + res.replace(/\\/g,"") + "\"> download </a> <br>")
                console.log(el + ": " + res.replace(/\\/g,""))
            }
        }
        return endurls;
    }

    function dwnldvideo(){
        if (window.location.hash === "#dwnld"){
            console.log("dick");
            if(findAll()){
                drawlinks()
            }
        }

    }

    function drawlinks(){
        var div = document.createElement("div");
        div.style.position = "absolute";
        div.style.top = "50%";
        div.style.left = "50%";
        div.style.width = "auto";
        div.style.height = "auto";
        div.style["font-size"] = "30px";
        div.style["z-index"] = 99999;
        div.style.background = "white";
        div.style.color = "black";
        div.innerHTML = findAll();
        document.getElementById("mv_layer_wrap").append(div)

    }

    document.addEventListener('keyup', doc_keyUp, false);
    dwnldvideo();
})();
