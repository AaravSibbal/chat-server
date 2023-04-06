
Example of Chat Server based on Socket.io

Based on:
https://socket.io
see in particular:
https://socket.io/docs/
https://socket.io/get-started/chat/


This sample demonstrates how to implement a basic chat application in Node.js
using the npm socket.io helper module only.

If there is no package.json file then create on by executing
>npm init
It will ask some questions and then generate the package.json file

install socket.io and add the dependency to package.json by exectuing
>npm install socket.io --save
(as of npm 5.x.x it will generate a package-lock.json which you can ignore)

To run first install the dependencies in package.json by executing:
  >npm install

Then run:
  >node server.js

To try the application open several browser instances at the address:
  http://localhost:3000/chatClient.html

Then chat with each other.
