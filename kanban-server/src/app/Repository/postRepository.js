const { Post, Comment, User, sequelize } = require('../../models');

export default class PostRepository {
  /**
   * adds a new post to database
   */
  async createPost(user, body) {
    const { title, description } = body;
    console.log('body: ', body);
    const post = await Post.create({
      title,
      description,
      userId: user.id,
    });

    await user.addPost(post);

    return post;
  }

  /**
   * delete the `post`
   */
  async deletePost(post) {
    const response = await post.destroy();
    return response;
  }

  /**
   * get the `post` by the id
   */
  async getPostById(id) {
    const post = await Post.findOne({
      where: {
        id,
      },
    });

    if (!post) {
      throw new Error('Post not found');
    }
    return post;
  }

  /**
   * get the post details with all the comments and number of likes on the post
   */
  async getPostDetails(postid) {
    const postsIdCol = '"likes->PostLikes"."postId"';
    const postCol = '"Post"."id"';
    const commentCol = '"comments"."id"';

    const response = await Post.findOne({
      where: {
        id: postid,
      },
      // includeIgnoreAttributes : false,
      attributes: [
        'id',
        'title',
        'description',
        'createdAt',
        [
          sequelize.literal(`COUNT(${postsIdCol}) OVER (PARTITION BY ${postCol}, ${commentCol} )`),
          'likesCount',
        ],
      ],
      include: [
        {
          model: Comment,
          as: 'comments',
          attributes: ['id', 'content', 'createdAt', 'updatedAt'],
        },
        {
          model: User,
          as: 'likes',
          through: {
            attributes: [],
          },
          attributes: ['id', 'userName', 'email'],
        },
      ],
      distinct: true,
    });
    return response;
  }

  /**
   * get all the posts with there comments
   */
  async getAllPosts(userId) {
    const postsIdCol = '"likes->PostLikes"."postId"';
    const postCol = '"Post"."id"';
    const commentCol = '"comments"."id"';

    const posts = await Post.findAll({
      where: {
        userId,
      },
      attributes: [
        'id',
        'title',
        'description',
        'createdAt',
        [
          sequelize.literal(`COUNT(${postsIdCol}) OVER (PARTITION BY ${postCol}, ${commentCol} )`),
          'likesCount',
        ],
      ],
      include: [
        {
          model: Comment,
          as: 'comments',
          attributes: ['id', 'content', 'createdAt', 'updatedAt'],
        },
        {
          model: User,
          as: 'likes',
          through: {
            attributes: [],
          },
          attributes: ['id', 'userName', 'email'],
        },
      ],
    });

    return posts;
  }

  /**
   * checks if `user` likes the `post`
   */
  async isLiked(user, post) {
    const res = await user.hasLikes(post);
    return res;
  }

  /**
   * `user` adds a like to the `post`
   */
  async addLike(user, post) {
    const res = await user.addLikes(post);
    if (!res) {
      throw new Error('Error while adding like');
    }
    return res;
  }

  /**
   * `user` removes a like from the `post`
   */
  async deleteLike(user, post) {
    const res = await user.removeLikes(post);
    if (!res) {
      throw new Error('Error while removing like');
    }
    return res;
  }

  /**
   * `user` adds a comment to the `post`
   */
  async addComment(user, post, body) {
    const { content } = body;

    const comment = await post.createComment({
      content,
    });

    // add to the user's comments as well.. but for now, just add to the post
    // await user.addComment(comment);
    // console.log('comment: ', comment);

    return comment;
  }
}
