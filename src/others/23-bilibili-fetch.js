const fetch = require('node-fetch')

fetch('https://api.bilibili.com/x/member/medal/my/info', {
  headers : {
    cookie :"_uuid=95CD7B08-8A12-CDEA-D936-6D9DDD7E12F629656infoc; buvid3=3EF2BCB7-7BCE-4927-9C7B-8B3EC9F91ADD138370infoc; CURRENT_FNVAL=16; rpdid=|(um||YuJmJR0J'ulmY)uR~ml; sid=a6vhaoov; blackside_state=1; DedeUserID=348028385; DedeUserID__ckMd5=b1120fb6462c8498; SESSDATA=43d5afd1%2C1614338718%2Cadea6*81; bili_jct=bef5b4272c59d7368d4ca93afd280ac5; PVID=1; bfe_id=463d72211d8612b93e1aed57df2ab3d4"
  }
})

  .then(resp => {
    return resp.json()
  })
  .then(data => {
    console.log(data)
  })