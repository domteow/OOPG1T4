@echo off
set /p temp="Enter the path: "
set "PATH=%PATH%;%temp%"
cd ../frontend
call npm install
start npm start
timeout /t 10
cd ../backend
call mvn clean compile
call mvn dependency:build-classpath -Dmdep.outputFile=cp.txt
set /p classp=<cp.txt

javac -cp "bin;%classp%" -d bin -sourcepath src\main\java src\main\java\com\smu\oopg1t4\FormApplication.java
java -cp "bin;%classp%" com.smu.oopg1t4.FormApplication
