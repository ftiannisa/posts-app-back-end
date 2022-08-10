const { nanoid } = require('nanoid');
const posts = require('./posts');

const addPostHandler = (request, h) => {
  const { images, caption, tags } = request.payload;

  const id = nanoid(16);
  const createdAt = new Date().toISOString();
  const updatedAt = createdAt;

  const newPost = {
    images, caption, tags, id, createdAt, updatedAt,
  };

  posts.push(newPost);

  const isSuccess = posts.filter((post) => post.id === id).length > 0;

  if (isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'Postingan berhasil ditambahkan',
      data: {
        postId: id,
      },
    });
    response.code(201);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Postingan gagal ditambahkan',
  });
  response.code(500);
  return response;
};

const getAllPostsHandler = () => ({
  status: 'success',
  data: {
    posts,
  },
});

const getPostByIdHandler = (request, h) => {
  const { id } = request.params;

  const post = posts.filter((n) => n.id === id)[0];

  if (post !== undefined) {
    return {
      status: 'success',
      data: {
        post,
      },
    };
  }

  const response = h.response({
    status: 'fail',
    message: 'Postingan tidak ditemukan',
  });
  response.code(404);
  return response;
};

const deletePostByIdHandler = (request, h) => {
  const { id } = request.params;

  const index = posts.findIndex((post) => post.id === id);

  if (index !== -1) {
    posts.splice(index, 1);
    const response = h.response({
      status: 'success',
      message: 'Postingan berhasil dihapus',
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Postingan gagal dihapus',
  });
  response.code(404);
  return response;
};

module.exports = {
  addPostHandler,
  getAllPostsHandler,
  getPostByIdHandler,
  deletePostByIdHandler,
};
