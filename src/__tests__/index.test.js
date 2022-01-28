/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
// eslint-disable-next-line no-unused-vars
/* globals describe, expect,test,jest,
    beforeAll,afterAll,beforeEach,
    afterEach
 */

const {moveObject} = require('../fileTransaferUtil');
const {handler} = require('../index');

// jest.mock('../fileTransaferUtil', () => ({
//   moveObject: jest.fn(),
// }));

const exptectedRes = `Error getting object patient_junit.csv from bucket edc-read-file-demo. Make sure they exist and your bucket is in the same region as this function.`;
jest.mock('../fileTransaferUtil', () => ({
  moveObject: jest.fn().mockRejectedValue(new Error(exptectedRes)),
}));

beforeAll(() => {});

afterAll(() => {
  jest.resetAllMocks();
});

beforeEach(() => {});

afterEach(() => {
  jest.clearAllMocks();
});

describe('Test handler() function', () => {
  // test('happy path', async () => {
  //   const event = {
  //     'Records': [
  //       {
  //         's3': {
  //           'bucket': {
  //             'name': 'edc-read-file-demo',
  //           },
  //           'object': {
  //             'key': 'source/patient_junit.csv',
  //           },
  //         },
  //       },
  //     ],
  //   };

  //   const exptectedRes = {
  //     status: 200,
  //     body: {
  //       Bucket: 'edc-read-file-demo',
  //       DestinationKey: 'destination/patient_junit.csv',
  //     },
  //     message:
  //           'File source/patient_junit.csv successfully transfered to destination/patient_junit.csv',
  //   };

  //   const res = await handler(event);

  //   console.log(res);

  //   expect(exptectedRes).toEqual(res);
  // });

  test('should throw an error', async () => {
    const event = {
      'Records': [
        {
          's3': {
            'bucket': {
              'name': 'edc-read-file-demo',
            },
            'object': {
              'key': 'source/patient_junit.csv',
            },
          },
        },
      ],
    };

    const res = await handler(event);

    console.log('res message', res.message);

    expect(exptectedRes).toEqual(res.message);
  });
});
