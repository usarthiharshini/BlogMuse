
# BlogMuse

BlogMuse is a full featured blog application, where users can read and write blogs on various subjects


## Features

- Read blogs
- Create new blogs
- leave comments
- Edit and delete blogs
- Search functionality


## Permissions

- user 
    - read blogs
    - update his own blogs
    - delete his own blogs
    - create new blogs
- reader 
    - read blogs
    - cannot create,update or delete blogs
    - can leave comments on blogs
 - admin 
    - read blogs
    - update any blog
    - delete any blogs
    - create new blogs 
    - leave  comments 
    - He can login directly. No signup needed.
     - Credentials: 
         - email :  admin@gmail.com
         - password : adminbro
        
## Folder structure

    |-- pages
    |-- /api
    |   |--- /blogs
    |   |   |-- [getblogbyid]
    |   |   |-- createblog  
    |   |   |-- getblogs
    |   |   |-- search/[query] 
    |   |   |-- addcomment
    |   |- /users
    |   |   |-- [getblogbyid]
    |   |   |-- createblog   
    |   |   |-- getblogs
    |   |   |-- search/[query]    
    |   |   |-- addcomment  
    |   |      
    |-- /
    |-- /login  ( user can login with email and password)
    |-- /signup  ( user can signup with email,password,name and select role)
    |-- /createPost (user can create post with title content and image)
    |-- /[individual post]( view individual page)
    |-- /[individual post]/edit (edit a particular blog)
    |-- /search/[query](search any query)

    

## Demo

Find deployed link to the project

https://blog-muse.vercel.app/


## Run Locally

Clone the project

```bash
  git clone https://github.com/usarthiharshini/BlogMuse.git
```

Go to the project directory

```bash
  cd blog-muse
```

Install dependencies

```bash
  npm install
```

Change the domain 
```bash
https://blog-muse.vercel.
```
 to
 
 ```bash
  http://localhost:3000/
```
Start the development server

```bash
  npm run dev
```


## Tech Stack

**Client:** Nextjs, React,Chakra UI,  React Slick, React Quilljs for editor

**Server:** MONGODB


## Authors

- [@harshini](https://github.com/usarthiharshini/)


