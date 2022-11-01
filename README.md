# Wirelab Default Craft Installation
This is the wirelab (wirecraft) boilerplate for all our Craft CMS projects. 

## Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites
Before installing you need the following software installed on your local machine:

 1. Composer ([link](https://getcomposer.org/))
 2. MySQL Server
 3. NodeJS (v14 LTS)
 4. PHP (7.4+ LTS)

### Creating project
1. `git clone https://github.com/wirelab/wirecraft.git [projectname]`
2. `cd [projectname]` into the project
3. Create database using your favorite DBMS like [Sequel Pro](https://www.sequelpro.com/) or [MySQL Workbench](https://www.mysql.com/products/workbench/) __or__ use the commands below.
    - `mysql -u [username]` (add `-p` if you have a password)
    - `create database [database-name];`
4. Create brand new git
    - `rm .git`
    - `git init`
    - `git branch -m develop`
    - Create git repository on github
    - `git remote add origin <url>`
    - `git push origin develop`
    
### Installing
1. Run `composer install`
2. Run `npm install`
3. Setup the environment file
    - Run `cp .env.example .env` to create the environment file. 
4. Run `./craft setup` 
    - Can't run craft on MacOS? Make it an executable file: `sudo chmod +x craft`
    - Use as CMS username: `wirelab`
    - Generate a password using 1password or another password generator
5. Run `npm run serve` and wait until it opens in your browser
    - It is normal to see a `HTTP 404 – Not Found – yii\web\NotFoundHttpException`, we need to setup the backend first.

Then, we need to install all the plugins we use into your new project.
1. Go to `http://localhost:1423/admin` and login using your credentials you set up earlier.
2. Click `Settings > Plugins`
3. Install all plugins
4. Go to `Settings > Sections` and create a section called `Home` if it doesn't exist yet, link it to a template such as `pages/_home` and set it as the default homepage.

### Setting up your project
To setup the rest of your project, checkout the [Tutorials](https://github.com/wirelab/wirecraft/wiki/Tutorials)

### Debugging
Some usefull tips to debug in templates:

```twig
{{ dump(_context) }}
{{ dump(_context|keys) }}
{{ dump(myProductQuery.rawSQL()) }}
```

If you ever lose the overview of what template is used at what url, you can use this snippet in each template to show the template name as a regular html comment.

```twig
{% if craft.app.config.general.devMode %}
<!-- Template: {{ _self }} -->
{% endif %}
```

### Common and known issues
When encountering issues while setting up, or later on in the project, please checkout the wiki page with [Known Issues](https://github.com/wirelab/wirecraft/wiki/Known-Issues).

## Production build
Run `npm run production` if you are ready for production, this will minify the javascript and css files.

[deploying craft applications using GIT](https://wirelab.atlassian.net/wiki/spaces/AL/pages/1517191302/4.+Deploy+Craft+CMS+trough+Git)<br/>
[craft cms project standards](https://wirelab.atlassian.net/wiki/spaces/AL/pages/1814003713/Craft+CMS+Project+Standards)
### Commonly used plugins
This list is a list of plugins we regularly use for different purposes. It is preferable to stick to one of these plugins whenever you can.
 * Navigation
    * [Navigation](https://plugins.craftcms.com/navigation)
 * Page Parts
    * [Matrix field](https://craftcms.com/docs/3.x/matrix-fields.html)
    * [Neo](https://plugins.craftcms.com/neo)*
 * SEO
    * [SEO](https://plugins.craftcms.com/seo)
 * Forms
    * [Contact Form](https://plugins.craftcms.com/contact-form)
    * [Contact Form Honeypot](https://plugins.craftcms.com/contact-form-honeypot)
    * [Freeform](https://plugins.craftcms.com/freeform)*
 * Debugging
    * [Craft Var Dumper](https://plugins.craftcms.com/craft-var-dumper)

\* Payed plugins
### Boilerplate information
* Craft CMS (clean install)
* Basic folder structure
    * Src folder with JS, TS and SCSS
    * Starting files ( `app.scss` / `app.js` / `index.ts` )
    * Standard mobile mixin ( already includes in `app.scss` ) 
    * Layout folder with `_master.twig` file, which contains basic layout file ( css and js includes aswell as seo plugin )
* Craft Plugins 
    * SEO
    * Redactor
* Laravel Mix (for compiling css and js)
    * ES6 functionality
    * SCSS
    * Copying static assets ( standard fonts and icons )
    * Live server with hot reload (browsersync)
    
_By Wirelab_
