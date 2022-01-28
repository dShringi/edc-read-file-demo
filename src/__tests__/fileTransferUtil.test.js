/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
// eslint-disable-next-line no-unused-vars
/* globals describe, expect,test,jest,
    beforeAll,afterAll,beforeEach,
    afterEach
 */

const AWS = require('aws-sdk');
const {moveObject} = require('../fileTransaferUtil');

jest.mock('aws-sdk', () => {
  const mS3 = {
    copyObject: jest.fn().mockName('copyObject').mockReturnThis(),
    deleteObject: jest.fn().mockName('deleteObject').mockReturnThis(),
    promise: jest.fn().mockName('promise'),
  };
  return {S3: jest.fn(() => mS3).mockName('S3')};
});

let s3;
beforeAll(() => {
  s3 = new AWS.S3({apiVersion: '2006-03-01'});
});

afterAll(() => {
  jest.resetAllMocks();
});

describe('moveObject()', () => {
  test('Calls Copy and Delete to move file', async () => {
    const sourceBucket = 's3SourceBucket';
    const bucketKey = 's3File';
    const destinationKey = 's3File';

    const copyParams = {
      CopySource: `${sourceBucket}/${bucketKey}`,
      Bucket: sourceBucket,
      Key: bucketKey,
    };

    const deleteParams = {
      Bucket: sourceBucket,
      Key: bucketKey,
    };

    await moveObject(sourceBucket, bucketKey, destinationKey);

    expect(s3.copyObject).toBeCalledTimes(1);
    expect(s3.deleteObject).toBeCalledTimes(1);

    expect(s3.copyObject).toBeCalledWith(copyParams);
    expect(s3.deleteObject).toBeCalledWith(deleteParams);
  });
});

