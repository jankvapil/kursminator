# GraphQL API

## GraphQL Queries

```GraphQl
query {
  courses {
    id
    name
    instructor {
      id
      name
      surname
    }
  }
}

query {
  instructors {
    id
    name
    surname
    courses {
      id
      name
    }
  }
}

query {
  places {
    id
    name
    virutal
    address
    city
  }
}
```

## GraphQL Mutations

```GraphQl
mutation {
  addPlace (input: {
    name: "LP-1029",
    virtual: false,
    address: "17. listopadu 1192",
    city: "Olomouc"
  }) {
    id
  }
}
```
