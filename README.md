# LOCKER PORJECT

FontEnd

```
📦 framwork
 ┗ vite + react
📦 lib
 ┣ state management in react
 ┃  ┣ redux 
 ┃  ┣ react-redux 
 ┃  ┗ redux-thunk
 ┣ axios -> http and https req
 ┗ react-router-dom -> manage route in project
📦 css framwork and lib style
 ┣ tailwindcss
 ┣ material tailwindcss
 ┗ mui
    ┣ material UI
    ┗ Data Grid

``` 

BackEnd

```
📦 runtime
 ┗ nodejs
📦 lib
 ┣ nodemon -> automatic restarting
 ┣ express -> api server
 ┣ passport.js -> auth
 ┣ cors -> http and https middleware
 ┣ prisma -> database orm
 ┣ jwt -> jsonwebtoken
 ┣ redis -> client cache in memory
 ┣ pgsql -> pg database
 ┗ mssql -> connect database on promise
``` 

# Quick start

เมื่อ Clone ตัว project มาแล้วให้ cd เข้าไปที่ path ของ project แล้วใช้คำสั่ง
```
docker compose up

or

ใช้เพื่อให้ container run เป็น background ไปเลย
docker compose up -d --build
```

เมื่อ container run อยู่ให้ทำการ ssh เข้าไปที่ container เพื่อ migrate database
```
เป็นคำสั่งที่ใช้ในการ ssh เข้าไปใน container
docker exec -it <container name or container id> sh
```

เมื่อเข้าไปยัง container แล้ว ให้ใช้คำสั่ง
```
npx prisma migrate dev --name <migrate name>
```

endpoint ของ service แต่ละตัว
```
fontend -> 127.0.0.1:4000
backend -> 127.0.0.1:3000
redis gui -> 127.0.0.1:8001
redis cli -> 127.0.0.1:6379
pg database -> 127.0.0.1:5432
```




