/**
 * Created by bounlusin on 2015/12/19.
 */
window.onload = function(){
    var calButtons = document.getElementById("calButtons");     //计算器按钮区域
    var calEquation = document.getElementById("calEquation");   //计算器的缓存显示区域
    var calResult = document.getElementById("calResult");       //计算器的显示屏
    var calCache;                                               //计算器的缓存
    var calOperator;                                            //计算器缓存的运算符
    var calNum1, calNum2;                                       //记录操作数
    var newNum = true;                                          //是否是一个新的操作数
    var numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];    //存储数字的数组

    /* 计算器按钮区域绑定click事件 */
    if (calButtons.addEventListener) {
        calButtons.addEventListener("click", calculator, true);  // Chrome FireFox
    } else if (calButtons.attachEvent) {
        calButtons.attachEvent("onclick", calculator);      // IE
    }

    /*合成算式*/
    function calculator(e) {
        var btnClicked;
        if (e.srcElement) {  //获得所点击的按钮
            btnClicked = e.srcElement.getAttribute("data-value");    // IE 不支持dataset，使用getAttribute
        } else if (e.target) {
            btnClicked = e.target.dataset.value;                     // Chrome FireFox
        }

        if (btnClicked === "save") {                                 //存储
            calCache = calResult.innerHTML;
            calEquation.innerHTML = calCache;
            newNum = true;
        } else if (btnClicked === "read") {                          //读取
            calResult.innerHTML = calCache;
            calEquation.innerHTML = calCache;
            if (calNum1 != undefined && calOperator != undefined) {
                calNum2 = calCache;
            } else {
                calNum1 = calCache;
            }
            newNum = true;
        } else if (btnClicked === "savePlus") {                      //累存
            calCache = calCache === undefined ? parseFloat(calResult.innerHTML) : plus(calCache, parseFloat(calResult.innerHTML));
            calNum1 = calCache;
            calCache.toFixed(8);
            calEquation.innerHTML = parseFloat(calCache);
            newNum = true;
        } else if (btnClicked === "saveTimes") {                     //积存
            calCache = calCache === undefined ? parseFloat(calResult.innerHTML) : times(calCache, parseFloat(calResult.innerHTML));
            calNum1 = calCache;
            calCache.toFixed(8);
            if (isNaN(calCache)) {
                calEquation.innerHTML = 0;
            } else {
                calEquation.innerHTML = parseFloat(calCache);
            }
            newNum = true;
        } else if (btnClicked === "saveClear") {                     //清存
            calCache = undefined;
            calNum1 = undefined;
            calNum2 = undefined;
            calOperator = undefined;
            newNum = true;
            calEquation.innerHTML = "&nbsp;";
        } else if (btnClicked === "clearScreen") {                   //清屏
            calResult.innerHTML = 0;
            calNum1 = undefined;
            calNum2 = undefined;
            calOperator = undefined;
            newNum = true;
        } else if (btnClicked === "delete") {                        //退格
            calResult.innerHTML = calResult.innerHTML.substr(0, calResult.innerHTML.length - 1);
        } else if (btnClicked === "factorial") {                     //阶乘
            calNum1 = factorial(parseFloat(calResult.innerHTML));
            calResult.innerHTML = parseFloat(calNum1);
            newNum = true;
        } else if (btnClicked === "sqrt") {                          //开方
            calNum1 = Math.sqrt(parseFloat(calResult.innerHTML)).toFixed(8);
            calResult.innerHTML = parseFloat(calNum1);
            newNum = true;
        } else if (btnClicked === "opposite") {                      //相反数
            calNum1 = opposite(calResult.innerHTML);
            calResult.innerHTML = parseFloat(calNum1);
            newNum = true;
        } else if (btnClicked === "reciprocal") {                    //倒数
            calNum1 = reciprocal(parseFloat(calResult.innerHTML)).toFixed(8);
            calResult.innerHTML = parseFloat(calNum1);
            newNum = true;
        } else if (btnClicked === "pi") {                            //π
            if (calNum1 != undefined && calOperator != undefined) {
                calNum2 = Math.PI.toFixed(8);
                calResult.innerHTML = parseFloat(calNum2);
            } else {
                calNum1 = Math.PI.toFixed(8);
                calResult.innerHTML = parseFloat(calNum1);
            }
            newNum = true;
        } else if (btnClicked === "e") {                             //e
            if (calNum1 != undefined && calOperator != undefined) {
                calNum2 = Math.E.toFixed(8);
                calResult.innerHTML = parseFloat(calNum2);
            } else {
                calNum1 = Math.E.toFixed(8);
                calResult.innerHTML = parseFloat(calNum1);
            }
            newNum = true;
        } else if (btnClicked === "sin") {                           //sin
            calNum1 = sin(parseFloat(calResult.innerHTML)).toFixed(8);
            calResult.innerHTML = parseFloat(calNum1);
            newNum = true;
        } else if (btnClicked === "cos") {                           //cos
            calNum1 = cos(parseFloat(calResult.innerHTML)).toFixed(8);
            calResult.innerHTML = parseFloat(calNum1);
            newNum = true;
        } else if (btnClicked === "tan") {                           //tan
            calNum1 = tan(parseFloat(calResult.innerHTML)).toFixed(8);
            calResult.innerHTML = parseFloat(calNum1);
            newNum = true;
        } else if (btnClicked === "ln") {                            //ln
            calNum1 = ln(parseFloat(calResult.innerHTML)).toFixed(8);
            calResult.innerHTML = parseFloat(calNum1);
            newNum = true;
        } else if (btnClicked === "log") {                           //log
            calNum1 = log(parseFloat(calResult.innerHTML)).toFixed(8);
            calResult.innerHTML = parseFloat(calNum1);
            newNum = true;
        } else if (btnClicked === "plus" || btnClicked === "minus"
            || btnClicked === "times" || btnClicked === "divide"
            || btnClicked === "power") {                             //加、减、乘、除、次方
            calOperator = btnClicked;
            calNum1 = parseFloat(calResult.innerHTML);
            newNum = true;
        } else if (btnClicked === ".") {                            //小数点
            if (calResult.innerHTML.indexOf(".") < 0) {
                calResult.innerHTML += ".";
                newNum = false;
            }
        } else if (btnClicked in numbers) {                          //数字
            if (newNum) {                                            //没有操作数，覆盖原来屏幕的内容
                newNum = false;
                calResult.innerHTML = btnClicked;
            } else {                                                //有操作数，在其后累加
                calResult.innerHTML += btnClicked;
            }

            if (calNum1 != undefined && calOperator != undefined) { //操作数1已存在
                calNum2 = parseFloat(calResult.innerHTML);
            } else {                                                //操作数1不存在
                calNum1 = parseFloat(calResult.innerHTML);
            }
        } else if (btnClicked === "equal") {                         //计算
            if (calNum1 != undefined && calOperator != undefined && calNum2 != undefined) {
                if (calOperator === "plus") {                        //加
                    calNum1 = plus(calNum1, calNum2);
                } else if (calOperator === "minus") {                //减
                    calNum1 = minus(calNum1, calNum2);
                } else if (calOperator === "times") {                //乘
                    calNum1 = times(calNum1, calNum2);
                } else if (calOperator === "divide") {               //除
                    calNum1 = divide(calNum1, calNum2);
                } else if (calOperator === "power") {                //次方
                    calNum1 = power(calNum1, calNum2);
                }
                newNum = true;
                calResult.innerHTML = parseFloat(calNum1.toFixed(8));
            }
        }

        if (calResult.innerHTML === "NaN") {
            calResult.innerHTML = "出错了~";
            newNum = true;
            calNum1 = undefined;
            calOperator = undefined;
        }

        if (calResult.innerHTML === "Infinity" || calResult.innerHTML === "-Infinity") {
            newNum = true;
        }
    }

    /*一些运算的函数*/

    /*加*/
    function plus(num1, num2) {
        return num1 + num2;
    }

    /*减*/
    function minus(num1, num2) {
        return num1 - num2;
    }

    /*乘*/
    function times(num1, num2) {
        return num1 * num2;
    }

    /*除*/
    function divide(num1, num2) {
        return num1 / num2;
    }

    /*次方*/
    function power(num1, num2) {
        return Math.pow(num1, num2);
    }

    /* sin */
    function sin(num){
        return Math.sin(num);
    }

    /* cos */
    function cos(num){
        return Math.cos(num);
    }

    /* tan */
    function tan(num){
        return Math.tan(num);
    }

    /*求log对数*/
    function log(num) {
        return Math.log(num) / Math.LN10;
    }

    /*求ln对数*/
    function ln(num) {
        return Math.log(num);
    }

    /*阶乘*/
    function factorial(num) {
        if (num > 30000){
            return Math.NEGATIVE_INFINITY;
        }
        if (num == 1 || num == 0) {
            return 1;
        } else {
            return num * factorial(num - 1);
        }
    }

    /*相反数*/
    function opposite(num){
        return num[0] === "-" ? num.substring(1) : "-" + num;
    }

    /*倒数*/
    function reciprocal(num) {
        return 1 / num;
    }
};