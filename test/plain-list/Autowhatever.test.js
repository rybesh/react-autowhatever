import React from 'react';
import TestUtils from 'react-addons-test-utils';
import { expect } from 'chai';
import {
  init,
  getStoredInput,
  getStoredItemsContainer,
  getStoredFocusedItem,
  getInputAttribute,
  getItemsContainerAttribute,
  getItems,
  mouseEnterItem,
  mouseLeaveItem,
  mouseDownItem,
  clickItem
} from '../helpers';
import AutowhateverApp, {
  renderItem
} from './AutowhateverApp';

describe('Plain List Autowhatever', () => {
  beforeEach(() => {
    renderItem.reset();
    init(TestUtils.renderIntoDocument(<AutowhateverApp />));
  });

  describe('initially', () => {
    it('should set input\'s `aria-owns` to items container\'s `id`', () => {
      expect(getInputAttribute('aria-owns')).to.equal(getItemsContainerAttribute('id'));
    });

    it('should render all items', () => {
      expect(getItems()).to.be.of.length(5);
    });

    it('should call `renderItem` exactly `items.length` times', () => {
      expect(renderItem).to.have.callCount(5);
    });

    it('should store the input on the instance', () => {
      expect(getStoredInput().getAttribute('id')).to.equal('my-fancy-input');
    });

    it('should store the items container on the instance', () => {
      expect(getStoredItemsContainer().getAttribute('id')).to.equal('react-autowhatever-my-fancy-component');
    });

    it('should set the stored focused item on the instance to null', () => {
      expect(getStoredFocusedItem()).to.equal(null);
    });
  });

  describe('hovering items', () => {
    it('should call `renderItem` once with the right parameters when item is entered', () => {
      renderItem.reset();
      mouseEnterItem(0);
      expect(renderItem).to.have.been.calledOnce;
      expect(renderItem).to.be.calledWith({ text: 'Apple' });
    });

    it('should call `renderItem` twice when the focused item is changed', () => {
      mouseEnterItem(1);
      renderItem.reset();
      mouseLeaveItem(1);
      mouseEnterItem(2);
      expect(renderItem).to.have.been.calledTwice;
    });

    it('should call `renderItem` once when item is left', () => {
      mouseEnterItem(3);
      renderItem.reset();
      mouseLeaveItem(3);
      expect(renderItem).to.have.been.calledOnce;
    });

    it('should not call `renderItem` when item is clicked', () => {
      renderItem.reset();
      mouseDownItem(4);
      clickItem(4);
      expect(renderItem).not.to.have.been.called;
    });

    it('should store the focused item on the instance', () => {
      mouseEnterItem(2);
      expect(getStoredFocusedItem().getAttribute('id'))
        .to.equal('react-autowhatever-my-fancy-component--item-2');

      mouseLeaveItem(2);
      expect(getStoredFocusedItem()).to.equal(null);

      mouseEnterItem(3);
      expect(getStoredFocusedItem().getAttribute('id'))
        .to.equal('react-autowhatever-my-fancy-component--item-3');
    });
  });
});
