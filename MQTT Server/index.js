const promish1 = (num)=>{
     return new Promise((res,rej)=>{
            if(num==2){
                res('Promish completed');
            }else{
                rej('Promish rejeted due to not matching number');
            }
     })
}

const promish2 = (num)=>{
    return new Promise((res,rej)=>{
           if(num==2){
               res('Promish completed');
           }else{
               rej('Promish rejeted due to not matching number');
           }
    })
}

Promise.allSettled([promish1(1),promish2(2)])
.then((results)=>{
    console.log(results);
})
.catch((error)=>{
    console.log(error);
})