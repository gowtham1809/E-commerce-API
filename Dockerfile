 #use the offical node.js image 
 FROM node:18

# set the working directory in the container
 WORKDIR /user/src/app

 COPY package.json ./
 RUN npm install

 # copy the rest of the file
 COPY . .

 # expose port 5000
 EXPOSE 5000

 # start the application
 CMD ["npm", "start"]