import qs from 'qs';
import client from './client';

export const writePost = ({ title, body, tags }) =>
  client.post('/api/posts', { title, body, tags });

export const readPost = (id) => client.get(`/api/posts/${id}`);

export const listPosts = ({ page, username, tag }) => {
  const queryString = qs.stringify({
    page,
    username,
    tag,
  });
  return client.get(`/api/posts?${queryString}`);
};

export const updatePost = ({ title, body, tags, id }) =>
  client.patch(`/api/posts/${id}`, { title, body, tags });

export const removePost = (id) => client.delete(`/api/posts/${id}`);
