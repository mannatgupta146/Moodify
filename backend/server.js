const app = require('./src/app')
const connectToDb = require('./src/config/db')

connectToDb()

app.listen(3000, ()=> {
    console.log('app is running on port 3000');
    
})
