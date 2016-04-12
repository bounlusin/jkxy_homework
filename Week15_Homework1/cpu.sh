#!/bin/bash
echo "脚本开始运行，启动服务......"

#启动服务器脚本app.js
pm2 start app.js

#给定一个启动时间，防止脚本未启动，后面的程序报错
sleep 2s

#测试下脚本
echo "您的服务器内核为："`uname -a | awk '{print $3}'`

#设定cpu最大占用率98%
maxCpuRate=98

while [ true ]
do
        #得到pid
        pid=`ps -e | grep '[0-9].node./' | awk '{print $1}'`
        #判断node进程是否存在
        if [ ! $pid ]
        then
                echo "nodejs进程未找到，程序退出！"
                break
        fi

        #通过ps指令根据进程pid获取当前进程cpu占用率
        cpu=`ps -p $pid -o pcpu | grep -v CPU | cut -d . -f 1 | awk '{print $1}'`

        #判断是否重启node服务
        echo 'cpu占用率='$cpu

        if [ $cpu -gt  $maxCpuRate ]
        then
                echo "cpu占用率已大于98%，nodejs服务需要重启"
                pm2 restart all
        else
                echo "nodejs服务正常，5s后重新检测，进程号为"$pid
                pm2 list
        fi

        #睡眠5秒后进行
        sleep 5s
done
