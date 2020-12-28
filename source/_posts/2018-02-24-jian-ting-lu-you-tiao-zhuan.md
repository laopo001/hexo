---
title: 监听路由跳转
slug: jian-ting-lu-you-tiao-zhuan
date_published: 2018-02-24T10:01:23.000Z
date_updated: 2018-03-01T07:10:04.000Z
---

最近要写一个前端统计的项目，需要监听页面跳转

         private captureRouteChange() {
            if (this.option.useHash) {
                window.addEventListener('hashchange', (e) => {
                    this.changeURL({
                        currURL: e.newURL,
                        oldURL: e.oldURL
                    });
                }, false);
            } else {
                ((history) => {
                    // 覆盖 history.pushState 方法
                    const pushState = history.pushState;
                    history.pushState = (...args) => {
                        let oldURL = window.location.href;
                        const res = pushState.apply(history, args);
                        this.changeURL({
                            currURL: window.location.href,
                            oldURL
                        });
                        return res;
                    };
                    const back = history.back;
    
                    let oldURL = window.location.href;
                    history.back = (...args) => {
                        oldURL = window.location.href;
                        const res = back.apply(history, args);
                    };
                    window.addEventListener('popstate', (event) => {
                        this.changeURL({
                            currURL: window.location.href,
                            oldURL
                        });
                        oldURL = window.location.href;
                    });
                })(window.history);
    
            }
        }
    
