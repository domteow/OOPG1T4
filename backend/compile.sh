echo "Enter the path:"
read path
export PATH=$path:$PATH
mvn clean compile