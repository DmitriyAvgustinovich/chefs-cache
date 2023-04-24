import { Router } from "express";
import {
    createPost,
    getAll,
    getById,
    getMyPosts,
    removePost,
    UpdatePost
} from "../controllers/posts.js";
import { checkAuth } from "../middlewares/checkAuth.js";

const router = new Router()

// Create Post
router.post('/', checkAuth, createPost)

// Get All Post
router.get('/', getAll)

// Get Post By Id
router.get('/:id', getById)

// Get My Posts
router.get('/user/me', checkAuth, getMyPosts)

// Remove Post
router.delete('/:id', checkAuth, removePost)

// Update Post
router.put('/:id', checkAuth, UpdatePost)

export default router