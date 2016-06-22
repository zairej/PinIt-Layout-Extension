import { expect } from 'chai';
import * as types from '../../../app/constants/ActionTypes';
import * as actions from '../../../app/actions/images';

describe('image actions', () => {
  const MOCK_IMAGE = { id: 1, data: 'foo', isSelected: false };

  it('addImage should create ADD_IMAGE action', () => {
    expect(actions.addImage(MOCK_IMAGE)).to.eql({
      type: types.ADD_IMAGE,
      image: MOCK_IMAGE
    });
  });

  it('selectImage should create SELECT_IMAGE action', () => {
    expect(actions.selectImage(MOCK_IMAGE.id)).to.eql({
      type: types.SELECT_IMAGE,
      id: MOCK_IMAGE.id
    });
  });

  it('deselectImage should create DESELECT_IMAGE action', () => {
    expect(actions.deselectImage(MOCK_IMAGE.id)).to.eql({
      type: types.DESELECT_IMAGE,
      id: MOCK_IMAGE.id
    });
  });
});
