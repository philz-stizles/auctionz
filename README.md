# Uctionz

## AWS IAM



## AWS CLI

- Install AWS CLI [Docs](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html)

```bash
aws --version
```

- Configure AWS CLI

```bash
aws configure

AWS Access Key ID [None]: <AccessKey>
AWS Secret Access Key [None]: <SecretKey>
Default region name [None]: 
Default output format [None]: yaml
```

## serverless in a nutshell

- pay as you go
- auto scaling - nabaged services
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

npm update -g serverless
```

Create serverless services within stack:

`sls create --template aws-nodejs --name auth-service --path auth-service`
`sls create --template aws-nodejs --name auction-service --path auction-service`
`sls create --template aws-nodejs --name notification-service --path notification-service`

Deploy serverless stack:

```bash
  sls deploy -v
  sls deploy --stage prod -v # production
```

Deploy serverless function:

```bash
  sls deploy -f createAuction -v
```

Remove serverless stack:

```bash
  sls remove -v
```
