const express =  require('express');
const app = express();
const cors = require('cors');


app.use(cors());
app.use(express.json());

app.use(require('./routers/index'));


app.set('port',process.env.PORT || 5000) ;

app.listen(app.get('port'), () => console.log(`Server running on port ${app.get('port')}`));
