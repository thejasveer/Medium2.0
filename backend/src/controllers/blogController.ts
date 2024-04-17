import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import {Context} from 'hono'
import StatusCode from '../utils/statusCode';
import { blogSchema, updateBlogSchema } from "@codewithjass/common/dist"
import { HTTPException } from 'hono/http-exception'

 
export async function getAllBlogs(c:Context){
	try {
		const prisma = new PrismaClient({
			datasourceUrl: c.env.DATABASE_URL,
		  }).$extends(withAccelerate());
		  const blogs = await prisma.post.findMany({
			select:{
				id:true,
				title:true,
				content:true,
				published:true,
				createdAt:true,
				author: {
					select:{name:true}
				}
			}
		  });
		  c.status(StatusCode.OK);
		  return c.json({blogs:blogs})
	} catch (error: any) {
		 console.log(error)
		throw new HTTPException(StatusCode.BADREQ, { cause:error.message })
		 
	}			

   }
   export async function getBlogById(c: Context){
	try {
	 
		const id = c.req.param('id')
		const prisma = new PrismaClient({
			datasourceUrl: c.env.DATABASE_URL,
		  }).$extends(withAccelerate());
	
		const blog = await prisma.post.findFirst({where:{id},
			select:{
				id:true,
				title:true,
				content:true,
				published:true,
				createdAt:true,
				author: {
					select:{name:true}
				}
			}})
		c.status(StatusCode.OK);
		return c.json({blog: blog});
	} catch (error: any) {
		c.status(StatusCode.BADREQ);
		return c.json({error:{message: error.message}});
	}

}
interface blogInput{
	title: String
	content : String 
}

export async function addBlog(c: Context){
	try {
		const input: blogInput = await  c.req.json();
		console.log(input);
		const {success, error} = await blogSchema.safeParse(input);
		if(!success) {
			c.status(StatusCode.BADREQ);
			return c.json({"error": error.issues})
		}else{
			const prisma = new PrismaClient({
				datasourceUrl: c.env.DATABASE_URL,
			  }).$extends(withAccelerate());
			console.log(c.get("userId"))
			const authorId =  c.get("userId")
			const blog = await prisma.post.create({data:{
				title:input.title,
				content:input.content,
				authorId: authorId
			}})

			c.status(StatusCode.OK);
			return c.json({blog: blog})

		}

	} catch (error: any) {
		c.status(StatusCode.BADREQ);
		return c.json({error:{message: error.message}});
	}
	
}

export async function deleteBlog(c: Context){
	try {
		const id = c.req.param('id')
		const prisma = new PrismaClient({
			datasourceUrl: c.env.DATABASE_URL,
		  }).$extends(withAccelerate());
		const res = await prisma.post.delete({where:{id}});
		const blogs = await prisma.post.findMany({where:{authorId: c.get("userId")}})
		c.status(StatusCode.OK);
		return c.json({blogs: blogs});
	
	} catch (error: any) {
		c.status(StatusCode.BADREQ);
		return c.json({error:{message: error.message}});
	}
	
}
export async function getmyBlogs(c: Context){
	try{
 		const prisma = new PrismaClient({
			datasourceUrl: c.env.DATABASE_URL,
		  }).$extends(withAccelerate());
		  const authorId = c.get("userId")
		const blogs = await prisma.post.findMany({
			where:{authorId : authorId},
			select:{
				title:true,
				content:true,
				
				author:{
					name:true
				}
			}
		
		})

		c.status(StatusCode.OK);
		return c.json({blogs: blogs});
	} catch (error: any) {
		c.status(StatusCode.BADREQ);
		return c.json({error:{message: error.message}});
	}
		
}

export async function updateBlog(c: Context){
	try{
		const input = await c.req.json()
		const prisma = new PrismaClient({
		   datasourceUrl: c.env.DATABASE_URL,
		 }).$extends(withAccelerate());
		 const {success, error} = updateBlogSchema.safeParse(input)
		 if(!success){
			c.status(StatusCode.BADREQ);
			return c.json({error:error.issues});
		 }else{

			const updated = await prisma.post.update({where:{id:input.id}, data:input})

			c.status(StatusCode.OK);
			return c.json({blog:updated})

		 }
		
   } catch (error: any) {
	c.status(StatusCode.BADREQ);
	   return c.json({error:{message: error.message}});
   }
}
 