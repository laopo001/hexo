---
title: 模板编译
slug: mo-ban-bian-yi
date_published: 2018-07-25T12:21:08.000Z
date_updated: 2018-07-25T12:21:30.000Z
---

    let template = `
    <ul>
      <% for(let i=0; i < data.length; i++) { %>
        <li><%= data[i] %></li>
      <% } %>
    </ul>
    `;
    

上面代码在模板字符串之中，放置了一个常规模板。该模板使用<%...%>放置 JavaScript 代码，使用<%= ... %>输出 JavaScript 表达式。

    function compile(template){
      const evalExpr = /<%=(.+?)%>/g;
      const expr = /<%([\s\S]+?)%>/g;
    
      template = template
        .replace(evalExpr, '`); \n  echo( $1 ); \n  echo(`')
        .replace(expr, '`); \n $1 \n  echo(`');
    
      template = 'echo(`' + template + '`);';
    
      let script =
      `(function parse(data){
        let output = "";
    
        function echo(html){
          output += html;
        }
    
        ${ template }
    
        return output;
      })`;
    
      return script;
    }
    
    let parse = eval(compile(template));
    div.innerHTML = parse([ "broom", "mop", "cleaner" ]);
    
    //   <ul>
    //     <li>broom</li>
    //     <li>mop</li>
    //     <li>cleaner</li>
    //   </ul>
    
