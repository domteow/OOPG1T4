echo "Enter the path:"
read path
export PATH=$path:$PATH
cd ..
cd frontend
npm install
npm start &
sleep 10
cd ../backend
mvn clean compile
javac -cp "bin:$(mvn dependency:build-classpath | grep -v "^\[INFO\]")" -sourcepath src/main/java src/main/java/com/smu/oopg1t4/FormApplication.java
java -cp "bin:$(mvn dependency:build-classpath | grep -v "^\[INFO\]")" com.smu.oopg1t4.FormApplication