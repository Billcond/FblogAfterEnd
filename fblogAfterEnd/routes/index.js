const router = require('koa-router')()

router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })
})

router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 string'
})

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
})

router.post('/test',async(ctx,next)=>{
  let arr = [];
  console.log('aaaaaaaaaaaaaaaaaaaaaa',ctx.request.body)
  ctx.status = 200;//确实这样设置一下就好了
  ctx.body = {message:"发布成功"};//body中设置的是返回的数据
})

module.exports = router
