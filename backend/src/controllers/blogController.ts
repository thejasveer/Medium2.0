import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import {Context} from 'hono'
import StatusCode from '../utils/statusCode';
import { blogSchema } from '../zod/blog';
 
export async function getAllBlogs(c: Context){
	try {
		const prisma = new PrismaClient({
			datasourceUrl: c.env.DATABASE_URL,
		  }).$extends(withAccelerate());
		  
		
	} catch (error) {
		
	}		

   }
   export async function getBlogById(c: Context){
	try {
		const id = c.req.param('id')
		const prisma = new PrismaClient({
			datasourceUrl: c.env.DATABASE_URL,
		  }).$extends(withAccelerate());
	
		const blog = await prisma.post.findFirst({where:{id}})
		c.status = StatusCode.OK;
		return c.json({blog: blog});
	} catch (error: any) {
		 
		return c.json({error:{message: error.message}});
	}

}
interface blogInput{
	title: String
	content : String
}

export async function addBlog(c: Context){
	try {
		const input: blogInput =await  c.req.json();
		console.log(input);
		const {success, error} = await blogSchema.safeParse(input);
		if(!success) {
			c.status = StatusCode.BADREQ;
			return c.json({"error": error.issues})
		}else{
			const prisma = new PrismaClient({
				datasourceUrl: c.env.DATABASE_URL,
			  }).$extends(withAccelerate());
			
			const blog = await prisma.post.create({data:{
				title:input.title,
				content:input.content,
				authorId: Number(c.get("userId"))
			}})

			c.status = StatusCode.OK;
			return c.json({blog: blog})

		}

	} catch (error: any) {
		console.error(error)
		return c.json({error:{message: error.message}});
	}
	
}

export async function deleteBlog(c: Context){
	const id = c.req.param('id')
	const prisma = new PrismaClient({
		datasourceUrl: c.env.DATABASE_URL,
	  }).$extends(withAccelerate());
	
}
export async function getmyBlog(c: Context){
	const id = c.req.param('id')
	const prisma = new PrismaClient({
		datasourceUrl: c.env.DATABASE_URL,
	  }).$extends(withAccelerate());
	
}
export async function updateBlog(c: Context){
	const prisma = new PrismaClient({
		datasourceUrl: c.env.DATABASE_URL,
	  }).$extends(withAccelerate());
	
}
 