# Blog App

This is an api for a blog app

---

## Requirements

1. User should be able to signup
2. User should be able to login with Passport using JWT
3. Logged-in and not Loggedin users should be able to get all published books
4. Logged-in and not Loggedin users should be able to get a particular published book
5. Logged-in users should be able to create a blog which should be of draft as default
6. Logged-in Users should be able to edit and delete their blogs
7. Logged-in users should be able to get their blogs
8. Test application

---

## Setup

- Install NodeJS, mongodb
- pull this repo
- update env with example.env
- run `npm run start:dev`

---

## Base URL

-

## Models

---

### users

| field      | data_type | constraints |
| ---------- | --------- | ----------- |
| id         | string    | required    |
| created_at | date      | optional    |
| first_name | string    | required    |
| last_name  | string    | required    |
| email      | string    | required    |
| password   | string    | required    |


### blog

| field        | data_type            | constraints                |
| ------------ | -------------------- | -------------------------- |
| id           | string               | optional                   |
| title        | string               | required , unique          |
| author       | ObjectID ref:"users" | optional                   |
| state        | string               | optional,default:"draft"   |
| read_count   | number               | optional, default:0        |
| reading_time | string               | optional                   |
| tags         | array                | optional                   |
| body         | string               | required                   |
| timestamp    | date                 | optional, default:Date.now |
| Description  | string               | optional

## APIs

---

### Signup User

- Route: /user/signup
- Method: POST
- Body:

```
{
  "email": "doe@example.com",
  "password": "Password1",
  "first_name": "jon",
  "last_name": "doe"
}
```

- Responses

Success

```
{
    message: 'Signup successful',
    user: {
        "email": "doe@example.com",
        "password": "Password1",
        "first_name": "jon",
        "last_name": "doe"
    }
}
```

---

### Login User

- Route: /user/login
- Method: POST
- Body:

```
{
  "password": "Password1",
  "email": 'doe@example.com',
}
```

- Responses

Success

```
{
    message: 'Login successful',
    token: 'tegggwctf'
}
```

### Create a blog

- Route: /blog/create-blog?secret-token=tegggwctf
- Method: POST
- Body:

```
{
  title: 'Lopin the movie 2',
  Description: 'Happenings of the world war 2',
  tags: 'war peace',
  body: 'Nothing last forever',
  email: 'xero@gmail.com',
  password: 'nothing',
  first_name: 'Xero',
  last_name: 'Musk'
}
```

- Responses

Success

```
{
  "status": true,
  "blog": {
    "title": "Lopin the movie 2",
    "Description": "Happenings of the world war 2",
    "author": "63627355cd874b1a6f3c4a58",
    "state": "draft",
    "read_count": 0,
    "reading_time": "0.012 minutes",
    "tags": [
      "war",
      "peace"
    ],
    "body": "Nothing last forever",
    "timestamp": {
      "created_at": "2022-11-02T13:50:40.896Z",
      "updated_at": "2022-11-02T13:50:40.896Z"
    },
    "_id": "636275b05771dc8d26868b97",
    "__v": 0
  }
}

```

### Publish a blog

- Route: /blog/publish-blog/Lopin the movie 2?secret-token=tegggwctf
- Method: PUT
- Body:

```
{
  email: 'xero@gmail.com'

}
```

- Responses

Success

```
{
  "updatedBlog": {
    "timestamp": {
      "created_at": "2022-11-02T13:50:40.896Z",
      "updated_at": "2022-11-02T13:50:40.896Z"
    },
    "_id": "636275b05771dc8d26868b97",
    "title": "Lopin the movie 2",
    "Description": "Happenings of the world war 2",
    "author": "63627355cd874b1a6f3c4a58",
    "state": "published",
    "read_count": 0,
    "reading_time": "0.012 minutes",
    "tags": [
      "war",
      "peace"
    ],
    "body": "Nothing last forever",
    "__v": 0
  }
}

```

### Edit a blog

- Route: /blog/edit-blog/Lopin the movie 2?secret-token=tegggwctf
- Method: PUT
- Body:

```
{
  email: 'xero@gmail.com'
  Description: 'tyranny of a viscious leader'
}
```

- Responses

Success

```
{
  "updatedBlog": {
    "timestamp": {
      "created_at": "2022-11-02T13:50:40.896Z",
      "updated_at": "2022-11-02T13:50:40.896Z"
    },
    "_id": "636275b05771dc8d26868b97",
    "title": "Lopin the movie 2",
    "Description": "tyranny of a viscious leader",
    "author": {
      "_id": "63627355cd874b1a6f3c4a58",
      "first_name": "Xero",
      "last_name": "Musk"
    },
    "state": "published",
    "read_count": 0,
    "reading_time": "0.012 minutes",
    "tags": [
      "war peace"
    ],
    "body": "Nothing last forever",
    "__v": 0
  }
}

```

### Delete a blog

-Route: /blog/delete-blog/Lopin the movie 2?secret-token=tegggwctf

- Method: DELETE
- Body:

```
{
  email: 'xero@gmail.com'
  Description: 'tyranny of a viscious leader'
}
```

- Responses

Success

```
{
  "message": "Blog sucessfully deleted"
}


```

### Get User Blogs

- Route: /blog/user-blogs?secret-token=tegggwctf&draft=published
- Method: GET
- Body:

```
{
  email: 'xero@gmail.com'
}
```

- Responses

Success

```
{
  "userBlogs": [
    {
      "timestamp": {
        "created_at": "2022-10-30T09:38:42.278Z",
        "updated_at": "2022-10-30T09:38:42.278Z"
      },
      "_id": "635e46229f1fe73f914e6317",
      "title": "Biography of Muhammed Ali",
      "Description": "Asthonishing Career of Muhammed Ali",
      "author": "635e44543d77a48424f280d9",
      "state": "published",
      "read_count": 5,
      "reading_time": "0.036 minutes",
      "tags": [
        "thieves Alibaba"
      ],
      "body": "Fly like a butterfly and sting like a bee so ",
      "__v": 0
    },
    {
      "timestamp": {
        "created_at": "2022-10-30T12:56:58.398Z",
        "updated_at": "2022-10-30T12:56:58.399Z"
      },
      "_id": "635e749a7809b71f782b5e27",
      "title": "Over the coast",
      "Description": "Happenings of the world war 2",
      "author": "635e44543d77a48424f280d9",
      "state": "draft",
      "read_count": 0,
      "reading_time": "0.012 minutes",
      "tags": [
        "war",
        "peace"
      ],
      "body": "Nothing last forever",
      "__v": 0
    }
  ]
}


```

### Get all Published Blogs

-Route: all-published-blogs?author=Joy Ajayi&order_by=timestamp,state

- Method: GET
- Body:
  



- Responses

Success
```

{
"status": true,
"blogs": [
{
"timestamp": {
"created_at": "2022-10-30T09:38:42.278Z",
"updated_at": "2022-10-30T09:38:42.278Z"
},
"\_id": "635e46229f1fe73f914e6317",
"title": "Biography of Muhammed Ali",
"Description": "Asthonishing Career of Muhammed Ali",
"author": "635e44543d77a48424f280d9",
"state": "published",
"read_count": 5,
"reading_time": "0.036 minutes",
"tags": [
"thieves Alibaba"
],
"body": "Fly like a butterfly and sting like a bee so ",
"**v": 0
},
{
"timestamp": {
"created_at": "2022-10-30T12:56:58.398Z",
"updated_at": "2022-10-30T12:56:58.399Z"
},
"\_id": "635e749a7809b71f782b5e27",
"title": "Over the coast",
"Description": "Happenings of the world war 2",
"author": "635e44543d77a48424f280d9",
"state": "draft",
"read_count": 0,
"reading_time": "0.012 minutes",
"tags": [
"war",
"peace"
],
"body": "Nothing last forever",
"**v": 0
}
]
}

```


### Get a Published Blog

-Route: a-published-blog?title=Biography of Muhammed Ali&state=published

- Method: GET
- Body:

- Responses


```
{
  "status": true,
  "blogs": {
    "timestamp": {
      "created_at": "2022-10-30T09:38:42.278Z",
      "updated_at": "2022-10-30T09:38:42.278Z"
    },
    "_id": "635e46229f1fe73f914e6317",
    "title": "Biography of Muhammed Ali",
    "Description": "Asthonishing Career of Muhammed Ali",
    "author": {
      "_id": "635e44543d77a48424f280d9",
      "first_name": "Joy",
      "last_name": "Ajayi"
    },
    "state": "published",
    "read_count": 5,
    "reading_time": "0.036 minutes",
    "tags": [
      "thieves Alibaba"
    ],
    "body": "Fly like a butterfly and sting like a bee so ",
    "__v": 0
  }
}


```

...

## Contributor

- Adediran Kehinde
