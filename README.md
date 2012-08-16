mongodb-poc
===========

Example geospatial app with MongoDB, Mongoose and Node.js.

See my blog post here for details on how to use:

http://loutilities.wordpress.com/2012/08/10/dogtag-app-in-30-minutes-part-1-node-js-and-mongodb/

Note that you can import the dogs.json into OpenShifts MongoDB using the following:

mongoimport --host $OPENSHIFT_NOSQL_DB_HOST --port $OPENSHIFT_NOSQL_DB_PORT --username $OPENSHIFT_NOSQL_DB_USERNAME --password $OPENSHIFT_NOSQL_DB_PASSWORD --db [DB_NAME] --collection dogtags --file dogs.json --jsonArray

But after the import you'll want to create an coords field and index it for geospatial queries as follows:

db.dogtags.find().forEach( function (e) { e.coords = [ e.longitude, e.latitude ]; db.dogtags.save(e); });

db.dogtags.ensureIndex( { coords : "2d" } );
