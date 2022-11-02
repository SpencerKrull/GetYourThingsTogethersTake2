# Get Your S#!t Together

Get Your S#!t Together is a cataloguing app, allowing you to store inventory of your personal items all in one place!

Are you a collector of physical media, and found yourself overwhelmed by how much crap you own? I sure am, and am tired of using Google sheets and DEFINITELY don't want to use a paid database app (seriously, why do those exist?).

Get Your S#!t Together combines the likeability of anything free with the foul-mouthed anxiety of simply just having too many things to keep track of. Can be used for standard cataloguing, an insurance rider, or simply for fun, just as long as you get your s#!t together!

## How to Use
It's as simple as typing! Just enter the item's information into the correct fields, and click submit. Nothing more simple than that! For die-hard collectors, you can also add scores and comments to each item (this is especially great for you review TikTokers!). 

## More to Come!
This is simply version 1 of what could come! Future functionality will include individualized lists for each item (you'll finally be able to keep your books, music, and whanot away from each other). 

Looking at the app, and forget what your item looks like? Don't worry, picture functionality will also be here soon!

Finally, do I smell the ability to enter the barcode and have all the information populated? Or is that just the stench of all the s#!t we've gotten together?

## Technologies
GYST is built using Node Express and React, interacting with the PostgreSQL database and Sequelize language. Deployed using Heroku.

## Sources used for code:
https://sequelize.org/docs/v6/core-concepts/model-basics/ - Used when setting up sequelize models; ultimately used the automated models method to auto-generate, then edited the necessary information as needed <br />
https://stackoverflow.com/questions/49480021/sequelize-model-loading-in-nodejs - Used when setting up sequelize models; largely used the "2. Importing/Reading Models" portion for reading the directories that will be used for the models, and debugging in my code, as the geeksforgeeks link led to bugs <br />
https://www.geeksforgeeks.org/node-js-fs-readdirsync-method/ - Used when setting up sequelize models; similar to the previous link from stackoverflow. Started with trying to use this code to read directories for my sequelize models <br />
https://github.com/sequelize/express-example/issues/99 - Used when setting up sequelize models; same with last two, used rakeshlanjewar's code in order to fully debug the code from the last two links <br />
https://stackoverflow.com/questions/65972228/how-to-associate-models-in-es6-syntax-using-sequelize-v6 - Used when setting up sequelize models; this was especially helpful when editing the auto-generated models, as it spelled out what I needed to do for the DataTypes, as well as gives a good picture of the syntax of a model. <br />
https://sequelize.org/docs/v6/other-topics/migrations/ - Referred to as a refresher on setting up sequelize migrations, moreso the process of coding in the terminal, rather than the actual migrations themselves <br /> 
https://www.section.io/engineering-education/how-to-build-authentication-api-with-jwt-token-in-nodejs/ - JWT tutorial, used when hitting a wall with setting up JWT. Couldn't figure out how to conjoin JWT/Bearer/Token with bcrypt. Just needed bcrypt.compare in code <br />
https://reactjs.org/docs/getting-started.html - Official React documentation, used to rebuild the different view pages. Particularly useful for hooks (useContext for calling the context, useNavigate for navigation, useState for adding to function components) <br />
https://reactjs.org/docs/context.html - Used for setting up the context; largely troubleshot my own syntax, which was then combined with the JWT source above in order to get the tokens working <br />
https://getbootstrap.com/docs/4.0/components/buttons/ - Used for making button designs <br />
https://getbootstrap.com/docs/4.2/layout/grid/ - Bootstrap forms, used these to look at buttons for submissions/deletion <br />
https://www.npmjs.com/package/react-bootstrap-range-slider - Bootstrap forms, used to make range slider for user score on items <br />
https://react-hook-form.com/api/useform/handlesubmit/ - Troubleshooting between on/handleSubmit. Needed this in order to perform submission functions for items and notes. <br />
https://blog.jonathanchannon.com/2013-08-24-async-route-handling-with-nancy/#:~:text=If%20you%20make%20your%20routes,likely%20hood%20of%20large%20queues. - Used for async/await routes. No code was really lifted from this, however wanted to make sure I was using it correctly for the routes, and that I was understanding the definitions. <br />
https://developer.mozilla.org/en-US/docs/Web/API/Event/preventDefault - Used in conjunction with async/await functions, in order to cancel any non-default happenings within the functions where it was used <br />
https://dev.to/zenveus/routing-with-react-router-v6-6b1 - Troubleshooting why useHistory wouldn't work (it's useNavigate now, that's why!) <br />
https://v5.reactrouter.com/web/api/BrowserRouter - Used to build the router for React-DOM. BrowserRouter keeps UI in sync with URLs.<br />
https://nodemailer.com/message/ - Used for setting up Nodemailer. Wanted to follow along with both tutorial and official documentation to better understand how to get email forms to work <br />
https://www.n-able.com/blog/sha-256-encryption#:~:text=SHA%2D256%20is%20used%20in,SHA%2D256%20for%20verifying%20transactions. - Researching the hash algorithms for the reset token. <br />