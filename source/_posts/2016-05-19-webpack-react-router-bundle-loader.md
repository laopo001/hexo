---
title: webpack、react-router、react-router-loader
slug: webpack-react-router-bundle-loader
date: 2016-05-19T09:23:02.000Z
date_updated: 2017-01-17T06:33:06.000Z
---

用bundle-loader,死活都不行，代码如下。按理来说，应该可以的，可能react-router更新了的关系

    const loadContainerAsync = bundle => (location, cb) => {  
        bundle(component => {
            cb(null, component);
        });
    };
    
    render((  
        <Router history={hashHistory}>
            <Route path="/" component={App}>
                <IndexRoute component={Home} />
                <Route path="home" component={Home} />
                <Route path="addcase"  getComponent={loadContainerAsync(require('bundle?lazy!./Components/addcase.js'))}/>
                <Route path="casequery" component={casequery} />
                <Route path="usermanage" component={usermanage} />
                <Route path="datastat" component={datastat} />
                <Route path="Shegengku" component={Shegengku} />
                <Route path="VosQuery" component={VosQuery} />
    
    
            </Route>
        </Router>
    ), document.getElementById('body'));
    

最后使用react-router-loader才解决。

版本` "react-router": "^2.4.0",`

> Installation

npm install react-router-loader --save-dev

    <Route component={require('react-router!./Components/addcase.js')} />
    <Route component={require('react-router?name=chunkName!./Components/addcase.js')} />
    

[更加详细](https://www.npmjs.com/package/react-router-loader)
