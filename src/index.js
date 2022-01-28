const {moveObject} = require('./fileTransaferUtil');

exports.handler = async (event, context) => {
  // Get the object from the event and transfer file to another s3 location.
  const bucket = event.Records[0].s3.bucket.name;
  const key = event.Records[0].s3.object.key;
  const fileName = key.replace('source/', '');
  const destinationKey = 'destination/'+fileName;

  console.log('Processing file transfer and file name is: ', key);
  try {
    await moveObject(bucket, key, destinationKey );
    console.log('file transfer successfully');

    return {
      status: 200,
      body: {
        Bucket: bucket,
        DestinationKey: destinationKey,
      },
      message: `File ${key} successfully transfered to ${destinationKey}`,
    };
  } catch (err) {
    console.log(err);
    // eslint-disable-next-line max-len
    const message = `Error getting object ${key} from bucket ${bucket}. Make sure they exist and your bucket is in the same region as this function.`;
    console.log(message);
    throw new Error(message);
  }
};
