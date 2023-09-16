# Auctionz Auth Service

## Table of Contents

1. AWS IAM
2. AWS CLI
3. Serverless
4. NoSQL Database using DynamoDB
5. Middleware handling using Middy
6. [Authentication using Auth0](#6-authentication-using-auth0)

### AWS IAM

### AWS CLI

- Install AWS CLI [Docs](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html)

```bash
aws --version
```

- Configure AWS CLI

```bash
aws configure

AWS Access Key ID [None]: <AccessKey>
AWS Secret Access Key [None]: <SecretKey>
Default region name [None]: eu-west-2
Default output format [None]: yaml
```

### Serverless

serverless in a nutshell

- pay as you go
- auto scaling - managed services
  supported by large cloud providers
  language agnostic
  Decreased type to market.

## Function as a service

- AWS Lambda
- Google CloudFunctions
- Azure Functions

Event triggers functions

- Amazon S3 - when a document is uploaded
- API gateway - when a request is sent to an endpoint
- DynamoDB - when a record is created

## Infrastructure as Code

Install serverless

```bash
npm i -g serverless
sls --version
```

Create serverless service:

`sls create --template aws-nodejs --name auth-service --path auth-service`
`sls create --template aws-nodejs --name auction-service --path auction-service`
`sls create --template aws-nodejs --name notification-service --path notification-service`

Deploy serverless stack:

```bash
  sls deploy --stage --verbose
  sls deploy --stage prod --verbose # production
```

Deploy serverless function:

```bash
  sls deploy --function createAuction --verbose
```

Remove serverless stack:

```bash
  sls remove --verbose
```

Invoke serverless function:

```bash
sls invoke processAuctions
```

View serverless function logs:

```bash
sls logs --function createAuction
```

Tail serverless function logs:

```bash
sls logs --function createAuction --tail
```

### DynamoDB

### Middy

npm i @middy/http-json-body-parser @middy/http-event-normalizer @middy/http-error-handler @middy/http-cors

### (6.) Authentication using Auth0
