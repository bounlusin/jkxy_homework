/**
 * Created by bounlusin on 2015/12/23.
 */

window.onload = function(){
    var colorSaved = localStorage.getItem("color");             //记录保存的颜色
    var style = document.getElementById("style");               //link引入的样式连接
    var divColors = document.getElementById("colors");          //color绑定点击事件
    var colorPicked;                                            //记录选中的颜色

    /*如果未选中,给默认主题样式*/
    if (colorSaved == undefined) {
        colorSaved = "css/style.01.css";
    }

    /*加载样式*/
    style.href = colorSaved;

    /*改变样式*/
    divColors.onclick = function(e){
        if (e.srcElement) {
            colorPicked = e.srcElement.getAttribute("data-color");  //IE
        } else if (e.target) {
            colorPicked = e.target.dataset.color;                   //Chrome FireFox
        }

        if (colorPicked == null){                                   //如果选中样式为空，默认样式
            colorPicked = "css/style.01.css";
        }

        style.href = colorPicked;                                   //改变引入的样式

        colorSaved = colorPicked;
        localStorage.setItem("color", colorSaved);                  //localStorage中记录样式
    }

};