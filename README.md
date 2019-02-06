# Book Worms

### Overview

Books Worms is a mobile-first application that seeks to help UCI students create and find study groups. 

### Collaborators
- Collin Stewart
- Edmund Park
- Erin Tait
- Erick Brownfield

### Setup Instructions

> 1. Import database
>    - Import `config/studygroupfinder.sql`
> 1. Create login files
>    - `cd` to `/config`
>    - copy and rename `db.template` into `db.js`
>    - fill out empty fields
> 1. Install server dependencies 
>    - `cd` to `/`
>    - `npm install`
> 1. Install client dependencies 
>    - `cd` to `/client`
>    - `npm install`
> 1. Start dev server
>    - `cd` to `/`
>    - `npm run dev`
> 1. Open a browser and navigate to `localhost:3000` 

### Bundle For Deployment

> 1. Run webpack to bundle files
>    - `npm run bundle`
> 
> **NOTE:** *After bundling you can not directly run your app locally. You must run your app from the root directory of a server.*

