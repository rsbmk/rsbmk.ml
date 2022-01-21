---
date: '11 jun 2021'
name: Mavs
description: En está web encontrarás todos los personajes del mundo de Marvel, y algunos datos curiosos acerca de ellos.
imageURL: https://i.postimg.cc/VvQJM1sb/Screenshot-from-2021-12-31-13-46-24.png
---

# Mavs

### [Deployed](https://rsbmk.github.io/mavs/) | [Github](https://github.com/rsbmk/mavs) 

<div class='img-project'>

![image.png](https://i.postimg.cc/T2twfrgD/image.png)
</div>

## ¿Qué es Mavs?

Mavs es una aplicación en la que puedes buscar todos los personajes del mundo Marvel, ya sean súper héroes o villanos, los vas a encontrar todos.

También podrás encontrar información detallada acerca de los personajes, como su nombre, una pequeña descripción acerca de su papel en su historia, las series y cómics en los que aparece, y las historias de las que hace parte.

Puedes interactuar directamente con la plataforma, dando le like o comentando en los distintos personajes. Tus propios comentarios los puedes editar como también borrar. Claro que para poder hacer todas estas acciones necesitas estar registrado.

El registro es sencillo, solo necesitas un usuario único y una contraseña cualquiera sin mucha seguridad. En esta plataforma no se pedirán ningún tipo de datos personales, ni se guardarán ninguna información, tampoco se rastrearán tus acciones ni nada parecido.

<div class='img-project'>

![image.png](https://i.postimg.cc/cHgP8G6Y/image.png)</div>

## ¿Cómo fue desarrollado?
Mavs fue desarrollada como practica personal para afianzar los conocimientos previamente establecidos en cursos y estudios pasados. El proceso de desarrollo fue puramente educativo, informativo, educativo e interesante.

Esta aplicación fue desarrollada en React con `create-react-app` (webpack), unas de las principales configuraciones es `Eslint (standard)` y algunas dependencias de terceros para el correcto funcionamiento de la aplicación tales como:

- [just-debounce-it](https://www.npmjs.com/package/just-debounce-it)
- [react-helmet](https://www.npmjs.com/package/react-helmet)
- [wouter](https://github.com/molefrog/wouter)

## Funcionalidades
Algunas de la funcionalidades más interesantes de mencionar que tiene Mavs son las siguientes:

- **Frontend**: 
  - Scroll infinito
  - Botón de like
  - Comentarios (editar y eliminar)
- [**Backend**](/project/mavs-backend)
  - Login y Logout
  - Autenticación de usuarios
  - API's REST CRUD (likes, comentarios)

### Scroll infinito

Para lograr el Scroll infinito, utilice la API nativa del navegador `Intersection Observer` para detectar cuando el usuario esta apunto de llagar al final de la página, y antes de que el usuario haya llegado al final, hacer la llamada a la API's REST para obtener los personajes siguientes.

Está lógica la extraje en un Custom Hook `useNearScreen` y quedó de la siguiente manera:

``` javascript
export const useNearScreen = ({ once = true } = {}) => {
  const [isIntersection, setIntersection] = useState(false)
  const elementNearScreen = useRef(null)

  useEffect(function () {
    const handleIntersection = (entries, observer) => {
      const element = entries[0]

      if (element.isIntersecting) {
        setIntersection(true)
        once && observer.disconnect()
      } else {
        !once && setIntersection(false)
      }
    }

    const observer = new IntersectionObserver(handleIntersection, {
      rootMargin: '750px'
    })

    observer.observe(elementNearScreen.current)

    return () => observer.disconnect()
  }, [once])

  return { elementNearScreen, isIntersection }
}
```

### Botón de like

Aunque parezca un componente muy pequeño y simple, tiene su buena lógica por detrás. Los likes vienen representados en una lista de los id de los personajes. Estos datos son obtenidos del backend, entonces lo que hace compara si el id del personaje se encuentra en la lista de likes del usuario.

``` js 
const isLike = useCallback(
  likeList.some(like => like === idCharacter),
  [likeList]
)
```

Y esta constante `isLike` es la que nos dice si pintar o no el botón de like.

No obstante, ¿qué pasa cuando el usuario hace click en el botón para dar su like?. Controlamos este evento dependiendo de si este personaje estaba o no en la lista de likes del usuario. Y dependiendo del valor de `isLike`, agregamos este personaje a la lista de likes o lo eliminamos.

``` js
const handleClickLike = useCallback(
  () => {
    if (!isLogged) return openModal()
    
    isLike 
      ? deleteLike({ idCharacter, jwt }) 
      : addLike({ idCharacter, jwt })
  }, [isLike, isLogged])
```
###  Comentarios
La sección de comentarios es bastante sencilla, simplemente se toma del formulario el comentario del usuario junto con el ID del personaje al que le esta haciendo el comentario y se envía a la bases de datos.

La lógica en los botones para editar el comentario, y el de eliminarlo se toma en base a los ID de los comentarios y se manejan en el backend.

<div class='img-project'>

![image.png](https://i.postimg.cc/FFq9HNQW/image.png)
</div>

## [Backend](/project/mavs-backend)

Las demás funcionalidades que se realizaron en el backend serán documentadas en un apartado por aparte.

Puedes ir a leer lo en el siguiente en lace: [Backend project](/project/mavs-backend)