#!/bin/bash

alphaS3="s3://ft-policy-web"
betaS3="s3://a-protocol-dev"
prodS3="s3://a-protocol-prod"

alphaCF="EG18TQ35TN2KJ"
betaCF="E32S7GBM2TU3RK"
prodCF="E1Y8XN2ILBSZ5X"

if [ "alpha" == "$1" ]; then
    echo "Deploying to Alpha"
    export NODE_ENV=production
    npm run build-only
    aws s3 sync dist/ $alphaS3 --profile scentdiah
    aws cloudfront create-invalidation --distribution-id $alphaCF --paths "/*" --profile scentdiah
elif [ "beta" == "$1" ]; then
    echo "Deploying to Beta"
    export NODE_ENV=beta
    npm run generate
    aws s3 sync dist/ $betaS3 --profile scentdiah
    aws cloudfront create-invalidation --distribution-id $betaCF --paths "/*" --profile scentdiah
elif [ "prod" == "$1" ]; then
    echo "Deploying to Prod"
    export NODE_ENV=production
    npm run build-only
    aws s3 sync dist/ $prodS3 --profile scentdiah
    aws cloudfront create-invalidation --distribution-id $prodCF --paths "/*" --profile scentdiah
else
    echo "Invalid Environment"
fi

export NODE_ENV=development
