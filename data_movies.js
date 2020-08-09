const elasticsearch = require('elasticsearch');
// instantiate an Elasticsearch client
const client = new elasticsearch.Client({
   hosts: [ 'http://localhost:9200']
});
// ping the client to be sure Elasticsearch is up
client.ping({
     requestTimeout: 30000,
 }, function(error) {
 // at this point, eastic search is down, please check your Elasticsearch service
     if (error) {
         console.error('Elasticsearch cluster is down!');
     } else {
         console.log('Everything is ok');
     }
 });


 // create a new index called scotch.io-tutorial. If the index has already been created, this function fails safely
client.indices.create({
    index: 'movies'
}, function(error, response, status) {
    if (error) {
        console.log(error);
    } else {
        console.log("created a new index", response);
    }
});

// client.index({
//     index: 'movies',
//     id: '1',
//     type: 'movies_list',
//     body: {
//         "Key1": "Content for key one",
//         "Key2": "Content for key two",
//         "key3": "Content for key three",
//     }
// }, function(err, resp, status) {
//     console.log("response",resp);
// });

const movies = require('./moremovies.json');
// declare an empty array called bulk
var bulk = [];
//loop through each city and create and push two objects into the array in each loop
//first object sends the index and type you will be saving the data as
//second object is the data you want to index
movies.forEach(movie =>{
   bulk.push({index:{ 
                 _index:"movies", 
                 _type:"movies_list",

                 
             }          
         })
  bulk.push(movie)
  
})
console.log(bulk[0],bulk[1]);
console.log(bulk[25041],bulk[25041],bulk[25043])
console.log("===================",bulk.length);

//perform bulk indexing of the data passed
client.bulk({body:bulk,type:"movies_list"}, function( err, response  ){ 
         if( err ){ 
             console.log("Failed Bulk operation".red, err) 
         } else { 
             console.log("Successfully imported %s", movies.length); 
         } 
}); 

