import { CreatePostDTO, UpdatePostDTO } from "../dtos/post.dto"
import { validateCreateComment, validateCreatePost, validateUpdateComment, validateUpdatePost } from "../validator/post"
import { post_db } from '../persistence'
import * as dtoConverter from '../utils/dtoConverter'
import { Post, User, Comment } from "../models"
import CustomError from "../error/CustomError"
import { StatusCodes } from "http-status-codes"
import Pagination from "../utils/pagination"
import { Sequelize } from "sequelize-typescript"
import { CreateCommentDTO, UpdateCommentDTO } from "../dtos/comment.dto"

const findPostWithPagination = async (pagination: Pagination, condition: {[key:string]:any} = {}): Promise<{totalPages: number, page: number,posts: Post[]} > => {
    const posts = await Post.findAll({
        limit: pagination.getPerPage(),
        offset: pagination.getOffSet(),
        order: pagination.getSort(),
        attributes: {
            include: [
                [Sequelize.literal(`
                    (SELECT count(*) FROM comment WHERE comment.post_id = Post.post_id)`
                )
                    , "numberOfComments"]
            ]
        },
        include: [
            {
                model: User,
                attributes: ["user_id", "firstName", "lastName", "avatar"]
            },
        ],
        ...condition
    })
    return {
        totalPages: pagination.getTotalPage(),
        page: pagination.getPage(),
        posts
    }
}

export const createPost = async (authID: string, post: CreatePostDTO): Promise<string> => {
    const user = await User.findByPk(authID, {
        attributes: ["user_id"]
    })
    if (!user) {
        throw new CustomError(StatusCodes.NOT_FOUND, `Cannot find user: ${authID}`)
    }
    post = validateCreatePost(post)
    post.auth_id = authID
    const newPost = await post_db.create(dtoConverter.toPost(post).dataValues)
    return newPost.post_id
}

export const updatePost = async (id: string, post: UpdatePostDTO): Promise<Post> => {
    const existingPost = await post_db.findByID(id)
    if (!existingPost) {
        throw new CustomError(StatusCodes.NOT_FOUND, `Post with ID:'${id}' not found.`)
    }
    post = validateUpdatePost(post)
    const updatedPost = await post_db.update(id, post)
    return Promise.resolve(updatedPost);
}

export const deletePost = async (id: string):Promise<Post | null> => {
    const deletedPost = await post_db.deleteByID(id)
    return Promise.resolve(deletedPost)
}

export const list = async (q: { [key: string]: any }): Promise<{totalPages: number, page: number,posts: Post[]} > => {
    const perPage = q.perPage
    const page = q.page
    const sort = q.sort
    const totalRows = await Post.count()
    const pagination = new Pagination(totalRows, perPage, page, sort)
    return findPostWithPagination(pagination)
}

export const getComments = async(postId: string):Promise<Comment[]> => {
    return await Comment.findAll({
        where: {
            post_id: postId
        },
        include: [
            {
                model: User,
                attributes: ["user_id", "firstName", "lastName", "avatar"]
            }
        ]
    })
}

export const comment = async (authId: string, postId: string, cmt: CreateCommentDTO): Promise<Comment> => {
    const user = await User.findByPk(authId, {
        attributes: ["user_id"]
    })
    if (!user) {
        throw new CustomError(StatusCodes.NOT_FOUND, `Cannot find user: ${authId}`)
    }
    const post = await Post.findByPk(postId)
    if (!post) {
        throw new CustomError(StatusCodes.NOT_FOUND, `Cannot find post: ${postId}`)
    }
    cmt = validateCreateComment(cmt)
    cmt.auth_id = authId
    cmt.post_id = postId
    const newCmt = await Comment.create({ ...cmt })
    return newCmt
}

export const deleteComment = async (id: string): Promise<Comment> => {
    const cmt = await Comment.findByPk(id)
    if (!cmt) {
        throw new CustomError(StatusCodes.NOT_FOUND, `Cannot find comment: ${id}`)
    }

    await Comment.destroy({ where: { comment_id: id } })
    return cmt
}

export const updateComment = async (id: string, updateComment: UpdateCommentDTO): Promise<Comment> => {
    const cmt = await Comment.findByPk(id)
    if (!cmt) {
        throw new CustomError(StatusCodes.NOT_FOUND, `Cannot find comment: ${id}`)
    }
    updateComment = validateUpdateComment(updateComment)
    cmt.content = updateComment.content!
    await cmt.save()
    return cmt;
}

export const getPostsByUser = async (userId: string, q: { [key: string]: any }) :Promise<{totalPages: number, page: number,posts: Post[]} >=> {
    const user = await User.findByPk(userId, {
        attributes: ["user_id"]
    })
    if (!user) {
        throw new CustomError(StatusCodes.NOT_FOUND, `Cannot find user: ${userId}`)
    }
    const perPage = q.perPage
    const page = q.page
    const sort = q.sort
    const totalRows = await Post.count()
    const pagination = new Pagination(totalRows, perPage, page, sort)
    return findPostWithPagination(pagination, {
        where: {
            auth_id: userId
        }
    })
}