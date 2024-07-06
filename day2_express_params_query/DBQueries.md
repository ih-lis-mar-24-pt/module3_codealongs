# MongoDB Queries

### by field

{title : "The Godfather"}
By id:
{\_id : ObjectId('6689291262bad114ca5de926')}

### and

{$and: [ {year: "2002"}, {rate: "8.5"} ]}
{year: "2002", rate: "8.5"}

### or

{$or: [ {year: "2002"}, {rate: "8.5"} ]}

### nor

{$nor: [ {year: "2002"}, {rate: "8.5"} ]}

### ne

{rate: {$ne: "9.0"}}

### eq

{rate: {$eq: "9.0"}}
{rate: "9.0"}

### gt

{rate: {$gt: "9.0"}}  
rate > 9

### gte

{rate: {$gte: "9.0"}}
rate >= 9.0

### lt

{rate: {$lt: "9.0"}}

rate < 9

### lte

{rate: {$lte: "9.0"}}
rate <= 9.0

## Array operators

### in

{genre : {$in: [ "Comedy", "Fantasy"] }}

### nin

{genre : {$nin: [ "Comedy", "Fantasy"] }}

### all

{genre : {$all: [ "Comedy", "Fantasy", "Drama"] }}

### Query projection

{title: 1, \_id: 0}

### Query sort

{year: 1}

1 for ascending
-1 for descending

1 -

query: {name: "Babelgum"}
projection: {name: 1}
