@echo off
set /p path="Enter the path: "
set PATH=%path%;%PATH%
cd ..
cd frontend
npm install
start npm start
timeout /t 10
cd ../backend
mvn clean compile
javac -cp "bin:%~dp0backend\target\classes;%~dp0backend\target\dependency\*;" -d bin -sourcepath src\main\java src\main\java\com\smu\oopg1t4\FormApplication.java
java -cp "bin;%~dp0backend\target\dependency\*;" com.smu.oopg1t4.FormApplication