---
date: '11 jun 2021'
name: Mavs Backend
description: Este es el proyecto backend en el cual encontrarás toda la documentación del proyecto.
imageURL: https://i.postimg.cc/VvQJM1sb/Screenshot-from-2021-12-31-13-46-24.png
---

# Mavs Backend

### [Deployed](https://rsbmk.github.io/mavs/) | [Github](https://github.com/rsbmk/api-mavs)

Mavs del lado del backend fue una forma de practicar todos los conocimientos adquiridos en los diferentes cursos, proyectos y clases que he obtenido durante mi preparación como desarrollador.

A traves de está REST API's es la que el frontend obtiene los datos, para los likes, los comentarios y la sesiones de usuario. La información de los personajes se obtiene directamente de la API de [Marvel](https://developer.marvel.com/docs)

## ¿Cómo fue desarrollado?

Este proyecto fue desarrollado en NodeJS, con el framework Express, y con una base de datos MongoDB (MongoDB Atlas). También se utilizaron algunas dependencias para el funcionamiento del proyecto, como:

- [bcrypt](https://www.npmjs.com/package/bcrypt)
- [cors](https://www.npmjs.com/package/cors)
- [cross-env](https://www.npmjs.com/package/cross-env)
- [dotenv](https://www.npmjs.com/package/dotenv)
- [express](https://www.npmjs.com/package/express)
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
- [Mongoose](https://mongoosejs.com/)
- [mongoose-unique-validator](https://www.npmjs.com/package/mongoose-unique-validator)

## Funcionalidades

Algunas de la funcionalidades más interesantes de mencionar que tiene el Mavs son las siguientes:

- **Backend**:
  - Login y Logout
  - Autenticación de usuarios
  - API's REST CRUD (likes, comentarios)
- [**Frontend**:](/project/mavs)
  - Scroll infinito
  - Botón de like
  - Comentarios (editar y eliminar)

### Login y Logout

El login del usuario se maneja de manera manual, validando que el usuario y contraseña que nos enviá el frontend existen en la base de datos.

Para ello consultamos en la base de datos la información del usuario que se envió, si no encontramos nada devolvemos un error. Si encontramos el usuario, verificamos que la contraseña que envió sea la misma que tenemos guardada. Si no es igual devolvemos un error. Y si todo está bien, generamos un token de sesión, y lo enviamos al frontend.

El código de este proceso quedará de la siguiente manera:

```js
router.post("/", async (request, response) => {
  const { username, password } = request.body;

  const user = await User.findOne({ username });
  const passwordCorrect = user === null ? false : await bcrypt.compare(password, user.passwordHash);

  if (!(user && passwordCorrect)) {
    response.status(401).json({
      message: "invalid user or password",
    });
  }

  const userForToken = {
    id: user._id,
  };

  const token = jwt.sign(userForToken, process.env.SECRET_JWT, {
    expiresIn: 60 * 60,
  });

  response.json({
    name: user.name,
    username: user.username,
    jwt: token,
    id: user._id,
  });
});
```

Para el logout en el frontend nos enviá una petición para poder eliminar el JWT de la sesión.

### Autenticación de usuarios

Para que el usuario pueda hacer cualquier acción en la aplicación, ya sea comentar o dar like a un personaje, debemos de validar que el usuario este logeado y sobre todo que tiene los permisos para hacerlo.

Para esto hacemos un midelware que verifica que el usuario tiene un JWT valido, el cual se le otorgo en el momento de hacer el login. El midelware quedaría de la siguiente manera:

```js
export const jwtMiddleware = (request, response, next) => {
  // recuperamos el token de la cabecera para autorizar
  const authorization = request.get("authorization");

  let token = "";

  if (authorization && authorization.toLocaleLowerCase().startsWith("bearer")) {
    token = authorization.substring(7);
  }

  // verificamos que el token sea valido
  const decodeToken = jwt.verify(token, process.env.SECRET_JWT);

  if (!token || !decodeToken.id) {
    return response.status(401).json({ message: "no authorization" });
  }

  const { id } = decodeToken;
  request.userId = id;

  next();
};
```

Como puedes ver al final del código agregamos el id del usuario en el objeto de la request. Esto nos servirá para tomar el id del usuario para hacer las consultas a la base de datos.

### API's REST CRUD (likes, comentarios)

Aquí es donde viene la magia, de las API's REST el proceso de crear, leer, actualizar y eliminar los datos de la base de datos a traves de endpoints.

#### Likes

**Lectura:** los likes son un atributo de los usuarios, y para obtener todos los likes que ha dado un usuario, se hace una consulta a la base de datos, con el id del usuario que envió la petición. Este resultado se devuelve al frontend.

```js
router.get("/", (request, response, next) => {
  const { userId } = request;

  User.findById(userId)
    .then((user) => {
      response.json(user.characters);
    })
    .catch(next);
});
```

**Creación:** para añadir un like, necesitamos saber a que personaje se le ha dado like y el id del usuario que lo ha dado. Ya que los likes son un array de los IDs de los personajes. Para realizar esta acción consultamos los datos del usuario con su id, si el id del personaje ya se encuentra en la lista de like del usuario, se devuelve un error. Si no se encuentra el id del personaje en la lista de likes, se añade el id del personaje a este array. Y se devuelve el nuevo array al frontend.

```js
router.post("/", (request, response, next) => {
  const { idCharacter } = request.body;
  const { userId } = request;

  User.findById(userId)
    .then((user) => {
      if (user.characters.includes(idCharacter)) {
        return response.status(400).json({ message: "this id already exists" });
      }

      user.characters = [...user.characters, idCharacter];
      response.status(201).json(user.characters);
      user.save();
    })
    .catch(next);
});
```

**Eliminar:** al igual que para la creación, necesitamos saber el id del personaje y el id del usuario. Como los likes no son una colección si no que un atributo del usuario, realizamos una consulta a la base de datos para obtener los datos del usuario y así la lista de likes del usuario y filtramos la lista de likes eliminando el id del personaje que recibimos, y devolvemos el nuevo array al frontend.

```js
router.delete("/", (request, response, next) => {
  const { userId } = request;
  const { idCharacter } = request.body;

  User.findById(userId)
    .then((user) => {
      user.characters = user.characters.filter((idC) => idC !== idCharacter);
      response.json(user.characters);
      user.save();
    })
    .catch(next);
});
```

#### Comentarios

**Lectura:** para leer obtener todos lo comentarios que se han hecho a un personaje, hacemos la petición a la base de datos, y devolvemos el objeto que nos da la base de datos.

```js
router.get("/", async (request, response, next) => {
  try {
    const listComments = await Comment.find({});
    response.json(listComments);
  } catch (error) {
    next(error);
  }
});
```

**Actualizar:** para actualizar un comentario necesitamos el id del comentario y el nuevo comentario. Antes de actualizar el comentario necesitamos validar que los datos que nos paso el backend por lo menos no estén vacíos. Luego consultamos a la base de datos y le pasamos el id y el nuevo comentario.

La base de datos nos devuelve el nuevo comentario actualizado y lo devolvemos al frontend.

```js
router.put("/", async (request, response, next) => {
  const { idComment, comment } = request.body;

  if (!(idComment && comment))
    return response.status(404).json({ message: "the parameters are wrong" });

  const newComment = { comment };

  try {
    await Comment.findByIdAndUpdate(idComment, newComment, { new: true });
    const commetList = await Comment.find({});
    response.json(commetList);
  } catch (error) {
    next(error);
  }
});
```

**Eliminar:** para eliminar un comentario necesitamos el id del comentario que vamos a eliminar. Y le decimos a la base de datos que busque este comentario y lo elimine.

```js
router.delete("/", async (request, response, next) => {
  const { idComment } = request.body;

  if (!idComment) return response.status(404).json({ message: "the parameters are wrong" });

  try {
    await Comment.findByIdAndRemove(idComment);

    const commetList = await Comment.find({});
    response.json(commetList);
  } catch (error) {
    next(error);
  }
});
```

**Creación:** para actualizar un comentario necesitamos el id del usuario, el id del personaje y el nuevo comentario. Antes de actualizar el comentario necesitamos validar que los datos que nos paso el frontend por lo menos no estén vacíos y de ser así devolvemos un error. Luego consultamos a la base de datos el usuario y creamos un nuevo comentario con el schema de los comentarios.

Y este nuevo comentario lo guardamos y hacemos una nueva consulta a la base de datos para que nos devuelva toda la colección de los comentarios para devolver los al backend.

```js
router.post("/", jwtMiddleware, async (request, response, next) => {
  const { comment, idCharacter } = request.body;
  const { userId } = request;

  if (!comment || !idCharacter) response.status(400).json({ message: "Bad request" });

  try {
    const userComment = await User.findById(userId);
    const { name, username } = userComment;

    const newComments = new Comment({
      idCharacter,
      comment,
      user: {
        name,
        username,
      },
    });

    await newComments.save();
    const listComments = await Comment.find({});
    response.json(listComments);
  } catch (error) {
    next(error);
  }
});
```

## Conclusiones
Al no almacenar la información de los personajes la lógica en el backend cambia mucho por que se tienen que hacer muchas consultas por separado. Si a lo mejor guardáramos la información de los personajes, los likes y comentarios seria atributos en esta colección y no por separados.

## [Frontend](/project/mavs)
Para ver toda la documentación de como se creo este proyecto de Mavs en el frontend puedes verlo en el siguiente [enlace](/project/mavs).