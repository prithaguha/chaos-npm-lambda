#!/bin/sh

set -e

npm run build

cd dist

echo ""

echo Uploading Worker Lambda to AWS Silverwater Singapore
aws --region us-east-1 --profile debg lambda update-function-code --function-name "arn:aws:lambda:us-east-1:968323395773:function:lambda-chaos" --zip-file fileb://lambda-chaos.zip &

wait

echo "Lambda updated"
