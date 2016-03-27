/**
 * Created by bounlusin on 2015/12/17.
 */

function cal(){
    var num1 = document.getElementById("num1").value;
    var num2 = document.getElementById("num2").value;
    var operator = document.getElementById("operator").value;
    var result =document.getElementById("result");
    result.innerHTML = "<strong>"+Calculator(num1, num2, operator)+"</strong>";
}

function Calculator(x, y, operator){

    x = x.trim();
    y = y.trim();

    if (isNaN(x) || isNaN(y)){
        return "请正确填写数字";
    }
    if (x == "" || y == ""){
        return "请填写数字";
    }

    x = parseFloat(x);
    y = parseFloat(y);
    var result;

    if (operator == "+"){
        result = x + y;
        return x + " + " + y + " = " + result;
    } else if (operator == "-"){
        result = x - y;
        return x + " - " + y + " = " + result;
    } else if (operator == "*"){
        result = x * y;
        return x + " &times; " + y + " = " + result;
    } else if (operator == "/"){
        if (y == 0){
            return "除数不能为0";
        } else {
            result = x / y;
            return x + " &divide; " + y + " = " + result;
        }
    }

    return "请正确填写数字并选择运算符";
}