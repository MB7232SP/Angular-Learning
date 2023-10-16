import  mysql  from 'mysql';

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    port: '3306',
   password: '8948',
     database: 'mydb',
});

export const connectDb = () => {
    return new Promise((resolve, reject) => {
      connection.connect((err) => {
        if (err) {
          console.error('Error connecting to MySQL: ' + err.stack);
          reject(err);
        } else {
          console.log('Connected to MySQL as ID ' + connection.threadId);
          resolve();
        }
      });
    });
  };
// You can now use this `connection` object to perform database operations.
