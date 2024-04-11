import BlogModel from "../models/blogModel";
import {Context} from 'hono'
 
export async function getAllBlogs(c: Context){

   }
   export async function getById(c: Context){
	const id = c.req.param('id')
	console.log(id);
	return c.text('get blog route')
}
 