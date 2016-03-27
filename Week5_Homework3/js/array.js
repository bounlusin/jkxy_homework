/**
 * Created by bounlusin on 2015/12/17.
 */

/*找到数组["a","x","b","d","m","a","k","m","p","j","a"]
中出现最多的字母并给出个数和每一个所在的顺序*/

var arr = ["a","x","b","d","m","a","b","m","p","j","a"];
var obj = {};  // obj 的 num记录字母出现次数 index数组记录字母出现位置
var i;
var len = arr.length;
var maxNum = 0;

/*统计每个字母出现的次数及位置，maxNum记录出现字母最多的次数*/
for (i=0;i<len;i++){
    if (obj[arr[i]]){
        obj[arr[i]].num++;
        obj[arr[i]].index.push(i);
        if (obj[arr[i]].num > maxNum){
            maxNum = obj[arr[i]].num;
        }
    } else {
        obj[arr[i]] = {num:1,index:[i]}
    }
}

/*可能出现多个次数最多的字母，循环输出 所有 出现次数最多的字母及位置*/
document.write("数组为：" + arr + "<br/>");
for (i in obj){
    if (obj[i].num == maxNum){
        document.write("字母出现最多的次数：" + obj[i].num + "<br/>");
        document.write("出现最多的字母为：" + i + "<br/>");
        document.write("在数组中的顺序为：" + obj[i].index + "<br/>");
    }
}