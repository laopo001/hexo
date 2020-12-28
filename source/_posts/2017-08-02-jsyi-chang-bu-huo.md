---
title: js异常捕获
slug: jsyi-chang-bu-huo
date_published: 2017-08-02T11:20:29.000Z
date_updated: 2017-08-02T11:20:29.000Z
---

##### try/catch

    try{
        try{
    		throw('error')
        }catch(e){
           console.error(e)//输出
        }
    }catch(e){
      console.error(e,2)//不输出
    }
    

    try{
        try{
    		throw('error')
        }catch(e){
           console.error(e)//输出
           throw(e)
        }
    }catch(e){
      console.error(e,2)//输出
    }
    

##### Promise或async函数中

    new Promise((resolve,reject)=>{
       new Promise((resolve,reject)=>{
          reject('error')//可以换throw(e)
      }).then().catch((e)=>{console.error(e); reject(e)//不能换throw(e)})
    }).then().catch((e)=>{console.error(e,2)})
    

    new Promise((resolve,reject)=>{
          resolve(1)
    }).then((data)=>{return data})
      .then(()=>{throw(1)})
      .catch((x)=>{console.log(x)})
    

    new Promise((resolve,reject)=>{
          resolve(1)
    }).then((data)=>{return data})
      .then(()=>{ 
          return new Promise((resolve,reject)=>{
                throw('error')
          }) 
       })
      .catch((x)=>{console.log(x)})
    
