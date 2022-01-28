const aws = require('aws-sdk');
const api = new aws.S3({apiVersion: '2006-03-01'});

async function moveObject(sourceBucket, bucketKey, destinationKey) {
  const copyParams = {
    CopySource: `${sourceBucket}/${bucketKey}`,
    Bucket: sourceBucket,
    Key: destinationKey,
  };

  const deleteParams = {
    Bucket: sourceBucket,
    Key: bucketKey,
  };
  console.log(`Copying file [s3://${sourceBucket}/${bucketKey}] to [s3://${sourceBucket}/${destinationKey}]`);

  await api.copyObject(copyParams).promise();

  console.log(`Deleting file [s3://${sourceBucket}/${bucketKey}]`);
  await api.deleteObject(deleteParams).promise();
}
module.exports = {moveObject};
