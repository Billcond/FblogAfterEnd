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
    let message = '';
    console.log('增加中的data',data)//数据库操作成功返回的data
    if(data.affectedRows != 0){
      r = 'ok';
      message="发布文章成功"
    }
    ctx.body = {//ctx.body是返回的数据的结构体
      data:r,
      message:message//这里前面的message是前端的接口，后面的message是上卖弄定义的信息
    }
  }).catch(()=>{
    ctx.body = {
      data:'err'
    }
  })
})

//删除博客文章
router.post('/delete',async (ctx,next)=>{
  console.log("请求过来的数据",ctx.request.body.deleteMsg)
  let deleteMsg = ctx.request.body.deleteMsg;
  await userService.deleteData(deleteMsg).then((data)=>{
    console.log("删除中的data",data);
    if(data.affectedRows !=0){
      r  = 'ok';
      message = "删除成功"
    }
    ctx.body = {
      data:r,
      message:message
    }
  }).catch(()=>{
    ctx.body = {
      data:'err'
    }
  })
})

//更新内容
router.post('/updateArticle',async (ctx,next)=>{
  let arr = [];
  arr.push(ctx.request.body['type']);
  arr.push(ctx.request.body['title']);
  arr.push(ctx.request.body['content']);
  arr.push(ctx.request.body['createTime']);
  arr.push(ctx.request.body['id']);
  console.log('将要更改的内容',arr)
  await userService.updateDate(arr).then((data)=>{
    let r = '';
    let message = '';
    console.log('更新中的data',data)//数据库操作成功返回的data
    if(data.affectedRows != 0){
      r = 'ok';
      message="编辑文章成功"
    }
    ctx.body = {//ctx.body是返回的数据的结构体
      data:r,
      message:message//这里前面的message是前端的接口，后面的message是上卖弄定义的信息
    }
  }).catch(()=>{
    ctx.body = {
      data:'err'
    }
  })
})
module.exports = router
