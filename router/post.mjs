import express from "express"
import { nanoid } from 'nanoid'
import { client } from './../mongodb.mjs'

const db = client.db("usertodo");
const col = db.collection("todoes")
const Router = express.Router()
// not recommended at all - server should be stateless


Router.post("/post", async(req ,res , next)=>{
    // console.log('this is signup!', new Date());

    if (
         !req.body.text
    ) {
        res.status(403);
        res.send(`required parameters missing, 
        example request body:
        {
            title: "abc post title",
            text: "some post text"
        } `);
        return;
    }

    const inserData = await col.insertOne({
        id: nanoid(),
        text: req.body.text
    })
    console.log(inserData)
    // posts.unshift({
    //     id: nanoid(),
    //     text: req.body.text,
    // })

    res.send('post created');

})

Router.get('/posts', async(req, res, next) => {

    const cursor =  col.find({})
    const results = await cursor.toArray()


    res.send(results);
})

Router.delete("/post/:postId", async(req,res,next)=>{

   const postId =  req.params.postId;

   const post = await col.findOne({id: postId})
   if(post){
    col.deleteOne({id : postId})

    res.send(postId)
   }else{
    res.send("disnet axist")
   }
})

export default Router