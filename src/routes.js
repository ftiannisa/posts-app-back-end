const {
  addPostHandler,
  getAllPostsHandler,
  getPostByIdHandler,
  deletePostByIdHandler,
} = require('./handler');

const routes = [
  {
    method: 'POST',
    path: '/posts',
    handler: addPostHandler,
  },
  {
    method: 'GET',
    path: '/posts',
    handler: getAllPostsHandler,
  },
  {
    method: 'GET',
    path: '/posts/{id}',
    handler: getPostByIdHandler,
  },
  {
    method: 'DELETE',
    path: '/posts/{id}',
    handler: deletePostByIdHandler,
  },
];

module.exports = routes;
