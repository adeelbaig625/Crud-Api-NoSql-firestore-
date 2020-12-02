const admin = require('firebase-admin');
//Your private key file 
// const serviceAccount = require('your json file');
//initialize admin SDK using serciceAcountKey
admin.initializeApp({
credential: admin.credential.cert(serviceAccount)
});
const db = admin.firestore();
const FieldValue = admin.firestore.FieldValue;
const getData=()=>
{
    const response= new Promise((resolve,reject)=>
    {
        let data=[]
        const docRef= db.collection('sampleData')
    docRef.get().then((snap)=>
       {
           snap.forEach(doc => {
             data.push(doc.data())
           });
          resolve(data)
       }).catch(err=>
        {
            reject(err)
        })
    })
    return response
} 
const getDataDoc=()=>
{
    const response= new Promise((resolve,reject)=>
    {
        let data=[]
        const docRef= db.collection('sampleData')
    docRef.get().then((snap)=>
       {
           snap.forEach(doc => {
             data.push(doc.id)
           });
          resolve(data)
       }).catch(err=>
        {
            reject(err)
        })
    })
    return response
}

const checkUniqueName=(username)=>{
    let isValid=true
    const response=new Promise((resolve,reject)=>
    {
        getDataDoc()
        .then((res)=>
        {
            console.log(username)
            res.forEach(data=>
                {
                    if(data===username)
                    {
                        isValid=false
                    }
                })
            if(isValid)
            {
                resolve('unique user id')
            }
            else
            {
                reject('invalid user id')
            }    
        })
        .catch(err=>console.log(err))
    })

  return response
}
const insertData=(username,obj)=>
{
    const response=new Promise((resolve,reject)=>
      {  
        checkUniqueName(username).then(res=>
        {
            const docRef= db.collection('sampleData').doc(username);
            docRef.set(obj).then(res=>
                 {
             resolve(docRef.id)
                 })
             })
             .catch(err=>
                {
                    reject(err)
                })
           
        })
            return response
}

const updateData=(docname,body)=>
{
    const response= new Promise((resolve,reject)=>{
        db.collection("sampleData").doc(docname).update( body).then(res=>resolve(res)).catch(err=>reject(err));
    })
   return response
}
const deleteData=(docname)=>
{
    const response=new Promise((resolve,reject)=>
    {
        console.log(docname)
        db.collection("sampleData").doc(docname).delete().then(()=> { 
            resolve('delete successfull')
            console.log("deleted")
        }).catch( (error) =>{ 
            reject("Error removing data"); 
        });
    })
    return response
} 
module.exports={getData,insertData,updateData,deleteData,getDataDoc}