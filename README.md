<p align="center">
  <a href="https://okvianey.github.io">
    <img alt="casasapp" src="/src/images/logo-white.svg" width="160" />
  </a>
</p>
<h1 align="center">
 CASAS APP
</h1>

### Links

👉🏻 Code: [Code URL](https://github.com/okvianey/casasapp)
👉🏻 Live Site URL: [View Live Preview](https://casas.flatlatte.com/)


<!-- resources -->
### Resources

Some third-party plugins that we used to build this template. Please check their license.

* **Google Fonts**: <http://fonts.google.com/>


    - [Documentation](https://www.gatsbyjs.com/docs/?utm_source=starter&utm_medium=readme&utm_campaign=minimal-starter)

    - [Tutorials](https://www.gatsbyjs.com/tutorial/?utm_source=starter&utm_medium=readme&utm_campaign=minimal-starter)

    - [Guides](https://www.gatsbyjs.com/tutorial/?utm_source=starter&utm_medium=readme&utm_campaign=minimal-starter)

    - [API Reference](https://www.gatsbyjs.com/docs/api-reference/?utm_source=starter&utm_medium=readme&utm_campaign=minimal-starter)

    - [Plugin Library](https://www.gatsbyjs.com/plugins?utm_source=starter&utm_medium=readme&utm_campaign=minimal-starter)

    - [Cheat Sheet](https://www.gatsbyjs.com/docs/cheat-sheet/?utm_source=starter&utm_medium=readme&utm_campaign=minimal-starter)

## Doc

Para iniciar servidor
* gatsby dev

Para mandar a producción
* gatsby build

Para desplegar en gh pages
* npm run deploy


En el package.json
    "deploy": "gatsby build --prefix-paths && echo 'casas.flatlatte.com' > public/CNAME && gh-pages -d public -b gh-pages"

Este script es para que cada que se haga el deploy de una actualización, el CNAME en github pages se actualice automaticamente.

### Trobleshoothing

Si hay error al hacer deploy, primero correr servidor con gatsby dev

Si se hace una actualización y no se ve la pagina. Revisar que en gh pages esté el subdominio actualizado con su respectivo CNAME



## Author

☕️ Made with coffee and code by [okvianey](https://flatlatte.com/okvianey)
- Linkedin - [@vianydev](https://www.linkedin.com/in/vianydev/)
- Github - [@vianydev](https://github.com/okvianey)
