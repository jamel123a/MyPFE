const Category =require('../../models/category');
const slugify =require('slugify');

exports.addCatogory=(req,res)=>{

    const  categoryObj ={
        name :req.body.name,
        //nfs ems mawoud wla le 
        slug : slugify(req.body.name)
    }
    if (req.body.parentId){
        categoryObj.parentId=req.body.parentId;
    }
    const cat =new Category(categoryObj);
       cat.save((error,category)=>{
       
   
        if (category){
            return res.status(201).json({category});
        }
        if (error) {
            return res.status(400).json({error});
        }
       });
    }
    exports.getCategories=(req,res)=>{
      Category.find({})
      .exec((error,categories)=>{
           if(error)return res.status(400).json({error});
           if (categories){
               res.status(200).json({categories})
           }
      })
    }