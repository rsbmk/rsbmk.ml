---
title: Como hacer un dark mode fácil, rápido y sencillo
date: 20 Ene 2022
miniature: https://i.postimg.cc/d3r5G0L1/image.png
tags: ["css", "tips"]
---

# Como hacer un dark mode fácil, rápido y sencillo

<date>Jueves, 20 de Enero de 2022</date>

<div class='img-project'>

![image.png](https://i.postimg.cc/xCXYH8BM/Group-22.png)

<cite> [AdventJS](https://adventjs.dev) web para hacer retos de JavaScript</cite>

</div>

Quizás te has preguntado como puedes hacer para tener un **tema claro** y un **tema oscuro**, según las preferencias del usuario. Hacer un **dark mode theme** es mucho más sencillo de lo que te puedas imaginar, y **sin JavaScript**.

Lo único de lo que tienes que tener conocimientos previos son de las [**custom properties de CSS.**](https://developer.mozilla.org/es/docs/Web/CSS/Using_CSS_custom_properties) Que si no las conoces, no pasa nada. Te explicaré la sintaxis básica para que puedas entender el ejemplo y próximamente escribiré un artículo en donde te lo explico detalladamente.

## Sintaxis básica de las custom properties

Lo único tienes que tener en cuenta que las [custom properties de CSS](https://developer.mozilla.org/es/docs/Web/CSS/Using_CSS_custom_properties) no son ni más ni menos que variables. Debes declarar estas variables con un valor, el cual puedes leer o cambiar.

```css
:root {
  --nombre-de-la-propiedad: valor;
}
```

> Fíjate que antes del nombre de la propiedad hay dos guiones ( - ) estos son necesarios para declarar las variables.

Teniendo esto en cuenta, puedes continuar con el dark mode. Pero yo te recomiendo personalmente que profundices en el tema. Puedes leer mi artículo acerca de ello, pero no te quedes con lo mínimo.

## Declara tus variables

Declarar tus variables con los colores que vas a utilizar para crear tu página web, es una de las primeras cosas que tienes que hacer antes de comenzar a maquetar. Normalmente, los colores vienen predefinidos en el diseño. Y si no es el caso, sería bueno que antes selecciones una paleta de colores.

**Theme Light**

```css
:root {
  --gray: #eff3f8;
  --white: #fff;
  --grayText: #8c8c8c;
  --blue: #199afc;
  --text: #555;
}
```

Teniendo las variables del light theme, es fácil declarar las variables del dark theme. **Pero aquí es donde viene el truco (tips o estrategia)**. Las variables del dark mode, tiene que llamarse igual que las de **light theme**, lo único que deben de cambiar son los valores.

**Theme Dark**

```css
:root {
  --text: #eff3f8;
  --white: #8c8c8c;
  --blue: #199afc;
  --gray: #555;
}
```

¡Con esto, ya tienes más del 80% del trabajo hecho!

## Preferencias del usuario

Necesitas de alguna manera saber si el usuario tiene activado el tema oscuro en su configuración del sistema. Una forma muy sencilla de saber esto es a través de CSS y su propiedad `prefers-color-scheme`.

```css
@media (prefers-color-scheme: dark);
```

Esta propiedad detecta si el usuario prefiere el tema oscuro o no, y nos dice cual theme deberíamos mostrarle.

```css
@media (prefers-color-scheme: dark) {
  /* Variables del Dark theme */
  :root {
    --text: #eff3f8;
    --white: #8c8c8c;
    --blue: #199afc;
    --gray: #555;
  }
}
```

**¡Ya está!** Con solo envolver nuestras variables del dark mode con esta propiedad, ya tenemos todo listo. Esta propiedad hará todo el trabajo extra por nosotros.

Ayúdame a compartir y que más personas puedan aprender más cosas acerca del desarrollo web.
