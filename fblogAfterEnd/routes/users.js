const router = require('koa-router')()

const userService = require('../controllers/mysqlConfig')

router.prefix('/articles')

//获取所有用户get请求
router.get('/',async (ctx,next)=>{
  ctx.body = await userService.findUserData();
})


//增加博客文章
router.post('/addArticle',async (ctx,next)=>{
  let arr = [];
  arr.push(ctx.request.body['type']);
  arr.push(ctx.request.body['title']);
  arr.push(ctx.request.body['content']);
  arr.push(ctx.request.body['createTime'])
  console.log(arr)
  await userService.addUserData(arr).then((data)=>{
    let r = '';
    console.log(data)
    if(data.affectedRows != 0){
      r = 'ok';
      message="增加成功"
    }
    ctx.body = {//ctx.body是返回的数据的结构体
      data:r,
      message:"发布文章成功"
    }
  }).catch(()=>{
    ctx.body = {
      data:'err'
    }
  })
})
module.exports = router
