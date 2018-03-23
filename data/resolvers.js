// const resolvers = {
//   Query: {
//     author(root, args) {
//       return { id: 1, firstName: 'Hello', lastName: 'World' }
//     },
//     allAuthors() {
//       return [{ id: 1, firstName: 'Hello', lastName: 'World' }]
//     }
//   },
//   Author: {
//     posts(author) {
//       return [
//         { id: 1, title: 'A post', text: 'Some text', views: 2 },
//         { id: 2, title: 'Another post', text: 'Some other text', views: 200 }
//       ];
//     }
//   },
//   Post: {
//     author(post) {
//       return { id: 1, firstName: 'Hello', lastName: 'World' }
//     }
//   }
// }

// export default resolvers

import { Author, View, Post, FortuneCookie } from './connectors'

const resolvers = {
  Query: {
    author(_, args) {
      return Author.find({ where: args })
    },
    allAuthors(_, args) {
      return Author.findAll()
    },
    allPosts(_, args) {
      return Post.findAll()
    },
    getFortuneCookie() {
      return FortuneCookie.getOne()
    }
  },
  Author: {
    posts(author) {
      return author.getPosts()
    }
  },
  Post: {
    author(post) {
      return post.getAuthor()
    },
    views(post) {
      return View.findOne({ postId: post.id }).then(view => view.views)
    }
  }
}

export default resolvers