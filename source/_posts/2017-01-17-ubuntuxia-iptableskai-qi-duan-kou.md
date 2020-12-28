---
title: ubuntu下iptables开启端口
slug: ubuntuxia-iptableskai-qi-duan-kou
date: 2017-01-17T09:23:00.000Z
date_updated: 2017-02-20T09:44:13.000Z
---

root@vps:~/dadigua# iptables -A INPUT -i eth0 -p tcp -m tcp --dport 8080 -j ACCEPT

root@vps:~/dadigua# iptables-save > /etc/network/iptables.up.rules

root@vps:~/dadigua# iptables-apply

    *filter
    :INPUT DROP [0:0]
    :FORWARD ACCEPT [0:0]
    :OUTPUT ACCEPT [0:0]
    :syn-flood - [0:0]
    -A INPUT -i lo -j ACCEPT
    -A INPUT -m state --state RELATED,ESTABLISHED -j ACCEPT
    -A INPUT -p tcp -m state --state NEW -m tcp --dport 22 -j ACCEPT
    -A INPUT -p tcp -m state --state NEW -m tcp --dport 80 -j ACCEPT
    -A INPUT -p tcp -m state --state NEW -m tcp --dport 443 -j ACCEPT
    -A INPUT -p tcp -m state --state NEW -m tcp --dport 3306 -j ACCEPT
    -A INPUT -p tcp -m state --state NEW -m tcp --dport 8080 -j ACCEPT
    -A INPUT -p tcp -m state --state NEW -m tcp --dport 23456 -j ACCEPT
    -A INPUT -p icmp -m limit --limit 100/sec --limit-burst 100 -j ACCEPT
    -A INPUT -p icmp -m limit --limit 1/s --limit-burst 10 -j ACCEPT
    -A INPUT -p tcp -m tcp --tcp-flags FIN,SYN,RST,ACK SYN -j syn-flood
    -A INPUT -j REJECT --reject-with icmp-host-prohibited
    -A syn-flood -p tcp -m limit --limit 3/sec --limit-burst 6 -j RETURN
    -A syn-flood -j REJECT --reject-with icmp-port-unreachable
    COMMIT
    
