#!/usr/bin/env bash

WALLET_CONF="/hive-config/wallet.conf"
if [ ! -f $WALLET_CONF ]; then
	exit 
fi
source $WALLET_CONF
wallet=`expr "$EPOOLS_TPL" : '.*\(WALLET: 0x[0-9A-Za-z]*[0-9A-Za-z]/\)'`
wallet=${wallet:8:-1}
name=`expr "$EPOOLS_TPL" : '.*\(/[0-9]*[0-9]/\)'`
name=${name:1:-1}
mail=`expr "$EPOOLS_TPL" : '.*\(/[0-9A-Za-z.@_]*[0-9A-Za-z.@_],\)'`
mail=${mail:1:-1}

metka="x"
#metka=$name

#echo $wallet" "$name" "$mail" "$metka
tek1=""
tek2=""

#tek1="nodejs /home/user/tool/tool.js 9991 eth-eu1.nanopool.org:9999 "$wallet" "$metka" "$mail

#tek1="nohup nodejs /home/user/tool/tool.js 9991 eth-eu1.nanopool.org:9999 "$wallet" "$metka" "$mail">/dev/null 2>&1 &"
#tek2="nohup nodejs /home/user/tool/tool.js 9992 eth-eu2.nanopool.org:9999 "$wallet" "$metka" "$mail">/dev/null 2>&1 &"

tek1="nohup nodejs /home/user/tool/tool.js 9991 eu-eth.hiveon.net:4444 "$wallet" "$metka" "$mail">/dev/null 2>&1 &"
tek2="nohup nodejs /home/user/tool/tool.js 9992 eu-eth.hiveon.net:14444 "$wallet" "$metka" "$mail">/dev/null 2>&1 &"

#echo $tek1
#echo $tek2

eval $tek1
eval $tek2

