 
import {Context} from 'hono'
import {z} from "zod";
import {  sign } from 'hono/jwt'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { readingListSchema, signinSchema, signupSchema }  from '@codewithjass/common/dist'
import StatusCode from '../utils/statusCode';
interface singupInput  {
    name:string
    email:string
    password:string
}
interface signinInput {
    email: string
    password: string
}
interface readingList{
    id:string
}

    export const currentUser = async(c:Context)=>{
        const prisma = new PrismaClient({
            datasourceUrl: c.env.DATABASE_URL,
          }).$extends(withAccelerate());
        
        const user= await prisma.user.findFirst({
            where:{id: c.get("userId")},
            select: {
                id:true,
                name:true,
                email:true,
                description:true,
                posts:{
                    where:{placeholder:false},
                    select:{
                        id:true,
                        title:true,
                        content:true,
                        published:true,
                        createdAt:true,
                        author: {
                            select:{name:true,id:true}
                        },
                        tags: {
                            select:{tag:true}
                        }
                    }
                },
                list:{
                    include:{
                        
                           post:{
                            select:{
                                id:true,
                                title:true,
                                content:true,
                                published:true,
                                createdAt:true,
                                author: {
                                    select:{name:true,id:true}
                                },
                                tags: {
                                    select:{tag:true}
                                }
                            }
                        }
                    }
                }
               
               
            }
        });
        c.status(StatusCode.OK);
                return c.json({
                     user: {
                        userId: user?.id,
                        username: user?.name,
                        blogs:user?.posts,
                        list:user?.list,
                        
                        email:user?.email,
                      },
                })
    }

 export const signup = async (c:Context) => {
        try {
            const input: singupInput = await  c.req.json();
       
            const {success,error} = await signupSchema.safeParse(input);
            if(!success){
                c.status(StatusCode.BADREQ);
              
                return   c.json({"error": error.issues});
            }else{
                const prisma = new PrismaClient({
                    datasourceUrl: c.env.DATABASE_URL,
                  }).$extends(withAccelerate());
                
                const exist= await prisma.user.findFirst({
                    where:{email:input.email},
                   
                });
                if(exist!=null){
                    c.status(StatusCode.BADREQ);
                    return c.json({"error":[{message: 'Email already exist.'}]});
                }

                const user= await prisma.user.create({
                    data: input,
                    select: {
                        id:true,
                        name:true,
                        email:true,
                        description:true,
                        posts:{
                            select:{
                                id:true,            
                                title:true,
                                content:true,
                                published:true,
                                createdAt:true,
                                tags: {
                                    select:{tag:true}
                                }
                            }
                        },
                        list:{
                            include:{
                                post:true
                            }
                        }
                       
                       
                    }
                }
            
            );
          
                const token = await sign( user.id , c.env.JWT_SECRET)
                c.status(StatusCode.OK);
                return c.json({
                    token: token,
                    message:"user added successfully",
                    user: {
                        userId: user?.id,
                        username: user?.name,
                        blogs:user?.posts,
                        list:user?.list,
                        
                        email:user?.email,
                      },
                })
            }

    } catch (error: any) {
      
        c.status(StatusCode.BADREQ);
        return   c.json({"error": [{message: error.message}]});
    }
 
}

export const signin= async (c:Context) => {
    try {
        const input: signinInput =   await c.req.json();
        const {success,error} =  signinSchema.safeParse(input);
        if(!success) {
            c.status(StatusCode.BADREQ);
            return   c.json({"error": error.issues});
        }else{
            const prisma = new PrismaClient({
                datasourceUrl: c.env.DATABASE_URL,
              }).$extends(withAccelerate());
            const user=  await prisma.user.findFirst({
                where:{email: input.email,password:input.password},
                select: {
                    id:true,
                    name:true,
                    email:true,
                    description:true,
                    posts:{
                        select:{
                            id:true,            
                            title:true,
                            content:true,
                            published:true,
                            createdAt:true,
                            tags: {
                                select:{tag:true}
                            }
                        }
                    },
                    list:{
                        include:{
                            post:true
                        }
                    }
                   
                   
                }
            })
              
            if(user==null){
                c.status(StatusCode.BADREQ);
                return c.json({"error":[ {message:"Please enter valid credentials"}]});
            }else{
                const token = await sign( user.id , c.env.JWT_SECRET)
                c.status(StatusCode.OK);
                return c.json({
                    token: token,
                    message:"logged in successfully",
                    user: {
                        userId: user?.id,
                        username: user?.name,
                        blogs:user?.posts,
                        list:user?.list,
                        
                        email:user?.email,
                      },
                })
            }

        }

        
    } catch (error: any) {
      
        c.status(StatusCode.BADREQ);
        return c.json({"error": [{message: error.message}]});
    }
}


export const updateReadingList= async (c:Context)=>{
    try {
        const input: readingList =   await c.req.json();
        const {success,error} =  readingListSchema.safeParse(input);
        if(!success) {
            c.status(StatusCode.BADREQ);
            return   c.json({"error": error.issues});
        }else{
            const prisma = new PrismaClient({
                datasourceUrl: c.env.DATABASE_URL,
              }).$extends(withAccelerate());
              const userId =  c.get("userId")
            const exist=  await prisma.readingList.findFirst({where:{postId: input.id,userId:userId}})
              
            if(exist!=null){
                await prisma.readingList.delete({
                    where: {
                      id: exist.id,
                      
                    },
                  });
               
            }else{
                await prisma.readingList.create({
                   data: {
                      postId: input.id,
                      userId:userId
                    },
                  });
                 
            }
            const updatedList= await prisma.readingList.findMany({
                where:{
                    userId:userId
                },
                include:{
                        
                    post:{
                     select:{
                         id:true,
                         title:true,
                         content:true,
                         published:true,
                         createdAt:true,
                         author: {
                             select:{name:true,id:true}
                         },
                         tags: {
                             select:{tag:true}
                         }
                     }
                 }
             }
                
            })
            c.status(StatusCode.OK);
            return c.json({message: "Reading list updated",list:updatedList});

        }

        
    } catch (error: any) {
      
        c.status(StatusCode.BADREQ);
        return c.json({"error": [{message: error.message}]});
    }
}
