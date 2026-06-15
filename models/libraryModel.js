const axios=require('axios');
const BASE_URL= 'https://library-management-api-i6if.onrender.com';
async function getAllBooks(){
        try{
            const response= await axios.get(`${BASE_URL}/api/books`);
            return response.data;
        } catch (error){
            console.error('Error fetching all books:', error);
            throw error;
        }
}
async function getBookById(id){
    try{
        const response= await axios.get(`${BASE_URL}/api/books/${id}`);
        return response.data;
    } catch (error){
        console.error('Error fetching book by ID:', error);
        throw error;
    }
}
async function getAllAuthors(){
    try{
        const response= await axios.get(`${BASE_URL}/api/authors`);
        return response.data;
    } catch (error){
        console.error('Error fetching all authors:', error);
        throw error;
    }
}
module.exports={getAllBooks, getBookById, getAllAuthors };