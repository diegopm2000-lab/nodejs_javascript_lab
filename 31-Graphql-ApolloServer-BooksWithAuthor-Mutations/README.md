# ApolloServer Books with authors - Using Mutations

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

## 4. Test in playground

Query with the books and authors at the same time

```graphql
query GetBooksAndAuthors {
  books {
    title
  }

  authors {
    name
  }
}
```

And get the next result:

```json
{
  "data": {
    "books": [
      {
        "title": "The Foundation"
      },
      {
        "title": "Foundation and Empire"
      },
      {
        "title": "Second Foundation"
      },
      {
        "title": "Dune"
      }
    ],
    "authors": [
      {
        "name": "Isaac Asimov"
      },
      {
        "name": "Frank Herbert"
      }
    ]
  }
}
```

## 5. Test in playground an alternative query

We can choose to obtain the books, with the title and the name of the author

```graphql
query GetBooks {
  books {
    title
    author {
      name
    }
  }
}
```

And get the next result:

```json
{
  "data": {
    "books": [
      {
        "title": "The Foundation",
        "author": {
          "name": "Isaac Asimov"
        }
      },
      {
        "title": "Foundation and Empire",
        "author": {
          "name": "Isaac Asimov"
        }
      },
      {
        "title": "Second Foundation",
        "author": {
          "name": "Isaac Asimov"
        }
      },
      {
        "title": "Dune",
        "author": {
          "name": "Frank Herbert"
        }
      }
    ]
  }
}
```

## 6. Test in playground a mutation

```graphql
mutation CreateBook {
  addBook(title: "Solaris", author: "Stanislaw Lem") {
    title
    author {
      name
    }
  }
}
```

```JSON
{
  "data": {
    "addBook": {
      "title": "Fox in Socks",
      "author": {
        "name": "Dr. Seuss"
      }
    }
  }
}
```
