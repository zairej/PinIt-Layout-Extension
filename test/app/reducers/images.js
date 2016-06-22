import { expect } from 'chai';
import * as types from '../../../app/constants/ActionTypes';
import images from '../../../app/reducers/images';

describe('images reducer', () => {
  const MOCK_IMAGE = { id: 1, data: 'foo', isSelected: false };

  it('should handle initial state', () => {
    expect(
      images(undefined, {})
    ).to.eql([]);
  });

  it('should handle ADD_IMAGE', () => {
    expect(
      images([], {
        type: types.ADD_IMAGE,
        image: MOCK_IMAGE
      })
    ).to.eql([MOCK_IMAGE]);
  });

  it('should handle SELECT_IMAGE', () => {
    expect(
      images([MOCK_IMAGE], {
        type: types.SELECT_IMAGE,
        id: MOCK_IMAGE.id
      })
    ).to.eql([{
      ...MOCK_IMAGE,
      isSelected: true
    }]);
  });

  it('should handle DESELECT_IMAGE', () => {
    expect(
      images([{
        ...MOCK_IMAGE,
        isSelected: true
      }], {
        type: types.DESELECT_IMAGE,
        id: MOCK_IMAGE.id
      })
    ).to.eql([{
      ...MOCK_IMAGE,
      isSelected: false
    }]);
  });
});
