/* Import the mongoose module
 *
 */
const mongoose = require('mongoose');

/* Step 1.
 *
 * TODO: replace <db-name> with the name of your mongo database. 
 * This will need to change for every new project you create.
 *
 */

if (process.env.MONGODB_URI) {
  mongoose.connect(process.env.MONGODB_URI);
}
else {
  mongoose.connect('mongodb://localhost/balloons');
}
mongoose.connection.on('error', function(err) {
  console.error('MongoDB connection error: ' + err);
  process.exit(-1);
  }
);
mongoose.connection.once('open', function() {
  console.log("Mongoose has connected to MongoDB!");
});


/* Export the mongoose object.
 *
 * This will allow us to use the same connection to our DB
 * across our different controllers.
 *
 */
module.exports = mongoose;
