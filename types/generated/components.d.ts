import type { Schema, Attribute } from '@strapi/strapi';

export interface TestMiscTest extends Schema.Component {
  collectionName: 'components_test_misc_tests';
  info: {
    displayName: 'miscTest';
    icon: 'alien';
  };
  attributes: {
    testField: Attribute.String;
  };
}

export interface TestTestUid extends Schema.Component {
  collectionName: 'components_test_test_uids';
  info: {
    displayName: 'testUID';
    icon: 'alien';
  };
  attributes: {
    fakeUID: Attribute.String;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'test.misc-test': TestMiscTest;
      'test.test-uid': TestTestUid;
    }
  }
}
