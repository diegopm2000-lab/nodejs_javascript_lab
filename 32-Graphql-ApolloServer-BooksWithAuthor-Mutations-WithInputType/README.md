# ApolloServer Books with authors - Mutations with input types

## 1. Install the program

```shell
npm install
```

## 2. Run the program

```shell
npm run start
```

## 3. Open Graphql playground in the browser

```html
http://localhost:4000/graphql
```

## 4. Use of Input types

In the previous example we created this mutation:

```graphql
type Mutation {
  addBook(title: String, author: String): Book
}
```

Now, we can use a input type

```graphql
type Mutation {
  addBook(book: PostInput): Book
}

input PostInput {
  # Title of the book
  title: String
  # Author of the book
  author: String
}
```

__Note__: Do not use the same input type for both queries and mutations. In many cases, arguments that are required for a mutation are optional for a corresponding query.

Then, our mutation in playground will be:

```graphql
mutation CreateBook {
  addBook(book: { title: "Solaris", author: "Stanislaw Lem"}) {
    title
    author {
      name
    }
  }
}
```

And, we need to change our resolver too:

```javascript
Mutation: {
    addBook: (parent, args) => {
      const book = {
        title: args.book.title,
        author: {
          name: args.book.author,
        },
      };
      books.push(book);
      return book;
    },
  }
```
