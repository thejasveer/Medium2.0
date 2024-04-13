"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signinSchema = exports.signupSchema = exports.updateBlogSchema = exports.blogSchema = void 0;
const zod_1 = require("zod");
exports.blogSchema = zod_1.z.object({
    title: zod_1.z.string().min(3, { message: "Title should atleast be 3 characters" }),
    content: zod_1.z.string().min(3, { message: "Content should be 3 characters" }),
});
exports.updateBlogSchema = zod_1.z.object({
    id: zod_1.z.string().min(1, { message: "Id required" }),
    title: zod_1.z.optional(zod_1.z.string().min(3, { message: "Title should atleast be 3 characters" })),
    content: zod_1.z.optional(zod_1.z.string().min(3, { message: "Content should be 3 characters" })),
});
exports.signupSchema = zod_1.z.object({
    name: zod_1.z.string().min(3, { message: "Name should atleast be 3 charachter long." }),
    email: zod_1.z.string().email({ message: "Invalid email address" }),
    password: zod_1.z.string().min(5, { message: "Password should atleast be at least 5 characters long." }),
});
exports.signinSchema = zod_1.z.object({
    email: zod_1.z.string().nonempty({ message: "Invalid credentials" }),
    password: zod_1.z.string().nonempty({ message: "invalid credentials" }),
});
