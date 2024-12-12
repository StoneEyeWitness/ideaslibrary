const express = require('express');
const router = express.Router();
const Idea = require('../models/Idea');

let ideas = [
    {
        id: 1,
        text: "Honesty is the best policy",
        tag: 'Politics',
        username: 'Abraham Lincoln',
        date: '1861-05-01'
    },
    {
        id: 2,
        content: "Hipocrisy is the safest policy",
        tag: 'Politics',
        username: 'Charles Princetown',
        date: '1970-06-21'
    },
    {
        id: 3,
        content: "When you glaze into an abyss, the abyss also glazes at you",
        tag: 'Thought Provoking',
        username: 'Richard Riverside',
        date: '2005-10-15'
    }
]; 

// Get all ideas
router.get('/', async (request,response) => {
    try{
        const ideas = await Idea.find();
        response.json({ 
            success: true,                         
            data: ideas
         });   
    }catch(error){
        response.status(500).json({ 
            success: true,                         
            error: 'Something went wrong'
         }); 
    }             
});                                                

// Get single idea
router.get('/:id', async (request,response) => {
    try{
        const idea = await Idea.findById(request.params.id);

        if(!idea){
            response.status(404).json({ 
            success: false,                          
                error: 'Resource not found'
            });
        }

        response.json({ 
            success: true,                         
            data: idea
         });   
    }catch(error){
        response.status(500).json({ 
            success: false,                         
            error: 'Something went wrong',
            content: error
         }); 
    }       
});             

// Add an idea
router.post('/', async (request,response) =>{
    const idea = new Idea({
        text: request.body.text,
        tag: request.body.tag,
        username: request.body.username,
    });
    try{
        const savedIdea = await idea.save();
        response.json({ 
            success: true,                         
            data: savedIdea 
         });   
    }catch(error){
        response.status(500).json({ 
            success: true,                         
            error: 'Something went wrong'
         }); 
    }  
});

// Update an idea
router.put('/:id', async (request,response) => {
    try{
        const idea = await Idea.findById(request.params.id);

         // Match the username
         if(idea.username === request.body.username){
            await Idea.findByIdAndUpdate(request.params.id,{
                $set:{
                    text: request.body.text,
                    tag: request.body.tag
                }
            });
            response.json({ 
                success: true,                         
                data: idea
             });   
        }else{
            response.status(403).json({ 
                success: false,                         
                error: 'You are not authorized to update this idea'
             }); 
        }  
    }catch(error){
        response.status(500).json({ 
            success: false,                         
            error: 'Something went wrong',
            content: error
         }); 
    }                 
}); 

// Delete an idea
router.delete('/:id', async (request,response) => {
    try{
        const idea = await Idea.findById(request.params.id);

        // Match the username
        if(idea.username === request.body.username){
            await Idea.findByIdAndDelete(request.params.id);
            response.json({ 
                success: true,                         
                data: idea
             });   
        }else{
            response.status(403).json({ 
                success: false,                         
                error: 'You are not authorized to delete this idea'
             }); 
        }
    }catch(error){
        response.status(500).json({ 
            success: false,                         
            error: 'Something went wrong',
            content: error
         }); 
    }           
}); 

module.exports = router;