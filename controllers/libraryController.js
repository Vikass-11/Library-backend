const libraryModel= require('../models/libraryModel.js');
async function getAllBooks(req,res,next){
    try{
        const books= await libraryModel.getAllBooks();
        res.json(books);
    } catch (error){
        next(error);
    }
}
async function getBookById(req,res,next){
    const id=req.params.id;
    try{
        const book= await libraryModel.getBookById(id);
        res.json(book);
    } catch (error){
        next(error);
    }
}
async function getAllAuthors(req,res,next){
    try{
        const authors= await libraryModel.getAllAuthors();
        res.json(authors);
    } catch (error){
        next(error);
    }
}
module.exports={getAllBooks, getBookById, getAllAuthors};