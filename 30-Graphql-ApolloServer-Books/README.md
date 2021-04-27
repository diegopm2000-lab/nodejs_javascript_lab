# ApolloServer Books example

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

```
{
  books {
    title,
    author
  }
}
```

And get the next result:

```json
{
  "data": {
    "books": [
      {
        "title": "The Awakening",
        "author": "Kate Chopin"
      },
      {
        "title": "City of Glass",
        "author": "Paul Auster"
      }
    ]
  }
}
```

## 5. Test in playground an alternative query


We can choose to obtain only the book titles:

```
{
  books {
    title,
  }
}
```

And get the next result:

```json
{
  "data": {
    "books": [
      {
        "title": "The Awakening"
      },
      {
        "title": "City of Glass"
      }
    ]
  }
}
```
