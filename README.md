# Modularity - A Design Boilerplate for Compiling CSS.

<p align="center">
![modularity-design-boilerplate](https://camo.githubusercontent.com/ae746e186fc99bfd41fe3c745d515786d9b2e551/68747470733a2f2f73332d75732d776573742d322e616d617a6f6e6177732e636f6d2f732e6364706e2e696f2f3434383230302f6d6f64756c61726974792d6373732d64657369676e2e6a7067)
</p>

Modularity is a boilerplate and methodology for compiling your CSS and revolves around PostCSS and SASS and uses GulpJS. It's a basis for providing you with all of your CSS needs to become more efficienet and organized. It is meant to encourage best practices and ease-of-use when building sites.

# To Use:
- install nodeJS
- install npm
- clone this repo
- open a shell up in the project folder and run `gulp`
- Edit styles ONLY from the `components` folder and they are output in the `app` folder. Include the `SCSS` file extension if you are using SASS mixins. If you are only using PostCSS, you can use plain CSS files.

# How it Works: 

You can include more PostCSS plugins and if you want to, use SASS or plain old CSS. Up to you.

Every site is different, but they all have underlying issues in which Modularity aims to solve:
- Compartementalize your style-sheets (stay organized)
- Grids are annoying and everyone has a different way to make them, there are hundred's of frameworks and methods. **[lost](http://lostgrid.org/)** grid-system is super flexible and easy for everyone to read. No need to reinvent the wheel.
- Choosing the right amount of negative space between elements can be a tough decision, or when scaling elements proprtionate to other elements. Choosing a body copy size that looks good with heading sizes... modular-scale helps to resolve these issues by providing a sass function `ms(x)`. Just update the `_variables.scss` file to change the scaling options. More at **[modularscale-sass](https://github.com/modularscale/modularscale-sass).
- Use semantic media queries, ie `$mobile`, `$desktop`, `$iphone_landscape`, etc. Use `em` not `px`. _Why?_ Checkout https://zellwk.com/blog/media-query-units/ for more info. Recommending and already included, **[breakpoint-sass](http://breakpoint-sass.com/)**.
- Exclude bulky prefixes in you SASS/CSS source files, only include them in the output files via **autoprefixer**.
- Live reload styles with **[browser-sync](https://www.browsersync.io/docs/gulp)**. You can share your project and updates locally or use tunnel-me to share remotely.
- Sourcemaps should be created and are configured to already be working. They help you and others debug your CSS.
- CSS should be compressed on PRODUCTION sites.(**cssnano**).
- Media queries should be combined. (setup already via PostCSS plugin **mediaQueryPacker**).
- Responsive typography can easily be created without the use of jQuery plugins or complicated mixins. Simply use a min/max font-size and min/max viewport range in `px` or `em` like so:
```css
.foo {
    font-size-responsive: 12px 32px 480px 1024px;
}
.bar {
    font-size-responsive: 1em 2.2em 320px 767px;
}
```