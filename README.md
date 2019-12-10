## BhouseReminderApp


## Steps to run the project.

### 1. Clone the develop branch of the project.
``` cmd
   git clone https://github.com/khertg/BhouseReminderApp.git
```

### 2. Install dependencies and packages used in api and web.
``` cmd
   npm install
```
If you only want to install the dependencies for the api
``` cmd
   npm run install:api
```
If you only want to install the dependencies for the web
``` cmd
   npm run install:web
```

### 3. Ways in running this application

##### First way is running the api and web at the same time using the command below.
``` cmd
   npm start
```

##### Second way is running only the api.
``` cmd
   npm run start:api
```

##### Third way is running only the web.
``` cmd
   npm run start:web
```

##### Fourth way is going to the directory of the application individually.

If you want to run the api.

``` cmd
   cd root/api
```

``` cmd
   npm start
```

If you want to run the api.

``` cmd
   cd root/web
```

``` cmd
   npm start
```