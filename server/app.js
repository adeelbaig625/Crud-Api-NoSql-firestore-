const express=require('express');
const bodyParser=require('body-parser')
const app=express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.json())
const {getData,insertData,updateData,deleteData,getDataDoc}=require('./db')
app.get('/getId',(req,response)=>
{   let ids=[]
    getDataDoc().then(res=>
        {res.forEach(data=>
            {
                ids.push(data)
            })
            response.json({success:1,status:ids})}
        ).catch(err=>res.json({success:1,status:err}))
})
app.delete('/delete/:id',(req,response)=>
{
    const id=req.params.id
    deleteData(id).then(res=>response.json({success:1,status:res})).catch(err=>res.json({success:0,status:err}))
})
app.get('/',(req,response)=>
{
    getData().then(res=>
        {
            let userData=[]
            res.forEach(data=>
                {
                    userData.push(data)
                })
                response.json({
                    success:"1",
                    status:userData
                })
        }).catch(err=>response.json({success:"1",
        status:err}))
})
app.post('/insert',(req,response)=>
{ 
    const userid=req.body.username
    const data={
        author: req.body.author,
        quote:req.body.quote
    }
   
    insertData(userid,data).then(res=>
        response.json({
            success:"1",
            status:res
        })).catch(err=>
            {
                response.json({
                    success:"0",
                    status: err
            })
})
})
app.patch('/update/:id',(req,res)=>
{
    const docid=req.params.id;
    console.log(docid)
    const data=req.body
    updateData(docid,data).then(response=>res.json()).catch(err=>console.log(err))
})
app.listen(3000)