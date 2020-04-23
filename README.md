## Project 5 - Cloud Developer Nanodegree

Notes:

- The idea of the capstone project was to refactor and extend code based on final Serverless project and separate functionalities to business logic and data layer. Also my idea was not to generate attachmentUrl until image is uploaded for todo item so that is why S3 event processing was introduced.

### BACKEND (/backend)

- In order to make serverless framework to work it was required to update nodejs runtime environment from version 8 to version 12
- Postman collection contained errors regarding updating of the items that was done through PUT method instead of the PATCH method as it was specified so Capstone Project.postman_collection.json contains updated version. I've added additional variable to test image upload uploadUrl that is automatically populated through Postman Test upon presigned S3 link retrieval and added new request for image upload method. Also when creating a new item variable todoId is automatically populated through Postman Test so that Postman testing of other endpoints Update, Delete Get attachement URL can be done without editing URL every time
- Permissions in serverless.yaml are added in global and per lambda function because of the specifics with serverless framework and bugs that require first global deployment and then update of permissions per lambda function. serverless.yaml corresponds to the latest config deployed.
- In order to return Items without userId new Typescript interface was developed named TodoQueryItem.ts
- API Gateway does the verifications of POST and PATCH methods through json specification located in models directory
- JWT does certificate retrieval from web as it was specified in guide you have provided in :TODO comments
- Tracing was done through AWS X-Ray
- Assigning of S3 link attachmentUrl is done through s3/sendNotifications lambda function in a way that S3 when image is uploaded sends notification to lamdba function that verifies the item and generates attachmentUrl link in DynamoDB
- Deletion of items in DynamoDB and S3 is done through one operation so that once item is deleted also the corresponding S3 image is deleted if uploaded

### FRONTEND (/client)

- Prepopulated config.ts so that code works out of the box
- Usabillity and functionalities are the same as in final Serverless project


This Course was great and and thank you for detailed explanations and going through various topics, it was really useful and it will help me in my career :)

Code is located in repo:

[https://github.com/manjosk8/capstone-project](https://github.com/manjosk8/capstone-project)