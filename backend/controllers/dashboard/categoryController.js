const formidable = require("formidable")
const { responseReturn } = require("../../utils/response")
const cloudinary = require('cloudinary').v2
const categoryModel = require('../../models/categoryModel')
 
class categoryController{

    add_category = async (req, res) => {
        const form = formidable()
        form.parse(req, async(err,fields,files)=>{
            if (err) {
                responseReturn(res, 404,{ error : 'something went wrong'})
            } else {
                let {name} = fields
                let {image} = files
                name = name.trim()
                const slug = name.split(' ').join('-')

                cloudinary.config({
                    cloud_name: process.env.cloud_name,
                    api_key: process.env.api_key,
                    api_secret: process.env.api_secret,
                    secure: true
                })

               try {

                const result = await cloudinary.uploader.upload(image.filepath, { folder: 'categories'})

                if (result) {
                    const category = await categoryModel.create({
                        name,
                        slug,
                        image: result.url
                    })
                    responseReturn(res, 201,{ category,message : 'Category Added Successfully'})
                    
                } else {
                    responseReturn(res, 404,{ error : 'Image Upload File'})
                }
                
               } catch (error) {
                responseReturn(res, 500,{ error : 'Internal Server Error'})
               }
 


            }
             
        })
    }

 // end method

    get_category = async (req, res) => {
       const {page,searchValue, parPage} = req.query 
 
       try {
            let skipPage = ''
            if (parPage && page) {
                skipPage = parseInt(parPage) * (parseInt(page) - 1)
            }
 
        if (searchValue && page && parPage) {
            const categories = await categoryModel.find({
                $text: { $search: searchValue }
            }).skip(skipPage).limit(parPage).sort({ createdAt: -1})
            const totalCategory = await categoryModel.find({
                $text: { $search: searchValue }
            }).countDocuments()
            responseReturn(res, 200,{categories,totalCategory})
        } 
        else if(searchValue === '' && page && parPage) {

            const categories = await categoryModel.find({ }).skip(skipPage).limit(parPage).sort({ createdAt: -1})
            const totalCategory = await categoryModel.find({ }).countDocuments()
            responseReturn(res, 200,{categories,totalCategory}) 
        } 
        
        else {

            const categories = await categoryModel.find({ }).sort({ createdAt: -1})
            const totalCategory = await categoryModel.find({ }).countDocuments()
            responseReturn(res, 200,{categories,totalCategory})
            
        }
        
       } catch (error) {
            console.log(error.message)
       }


    }

    // end method 


update_category = async (req, res) => {
    const form = formidable()
    form.parse(req, async(err,fields,files)=>{
    if (err) {
        responseReturn(res, 404,{ error : 'something went wrong'})
    } else {
        let {name} = fields
        let {image} = files
        const {id} = req.params;

        name = name.trim()
        const slug = name.split(' ').join('-')

    try {
        let result = null;
        if (image) {
            cloudinary.config({
                cloud_name: process.env.cloud_name,
                api_key: process.env.api_key,
                api_secret: process.env.api_secret,
                secure: true
            });

              result = await cloudinary.uploader.upload(image.filepath, { folder: 'categories'})
        }

        const updateData = {
            name,
            slug,
        }

        if (result) {
            updateData.image = result.url;
        }
        
        const category = await categoryModel.findByIdAndUpdate(id,updateData, { new: true});
        responseReturn(res, 200, {category, message: 'Category Updated successfully'})
                
        } catch (error) {
        responseReturn(res, 500,{ error : 'Internal Server Error'})
        } 

            }
             
        })
    }

 // end method

 deleteCategory = async (req, res) => {
    try {
        const categoryId = req.params.id;
 
        // Find the category by ID
        const category = await categoryModel.findById(categoryId);
 
        if (!category) {
            console.log(`Category with id ${categoryId} not found`);
            return res.status(404).json({ message: 'Category not found' });
        }
 
        // Delete the image from Cloudinary if it exists
        if (category.image) {
            cloudinary.config({
                cloud_name: process.env.cloud_name,
                api_key: process.env.api_key,
                api_secret: process.env.api_secret,
                secure: true,
            });
 
            // Extract the public ID of the image from the URL
            const publicId = category.image.split('/').pop().split('.')[0];
            await cloudinary.uploader.destroy(`categories/${publicId}`);
        }
 
        // Delete the category from the database
        await categoryModel.findByIdAndDelete(categoryId);
 
        res.status(200).json({ message: 'Category deleted successfully' });
 
    } catch (error) {
        console.log(`Error deleting category with id ${categoryId}:`, error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};



}
 

module.exports = new categoryController()