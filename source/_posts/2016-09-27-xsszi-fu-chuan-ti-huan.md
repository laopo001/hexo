---
title: xss字符串替换
slug: xsszi-fu-chuan-ti-huan
date_published: 2016-09-27T00:00:00.000Z
date_updated: 2016-09-27T10:31:01.000Z
---

function xssCheck(str,reg){

return str ? str.replace(reg ||/[&<">]/g,function (a, b) {

return {

'<':'<',

'&':'&',

'"':'"',

'>':'>'

}[a]

}): '';

}
