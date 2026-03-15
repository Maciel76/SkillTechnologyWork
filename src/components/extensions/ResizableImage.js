import Image from '@tiptap/extension-image';
import { mergeAttributes } from '@tiptap/core';
import { VueNodeViewRenderer } from '@tiptap/vue-3';
import ResizableImageComponent from './ResizableImageComponent.vue';

export default Image.extend({
  name: 'resizableImage',

  addAttributes() {
    return {
      ...this.parent?.(),
      width: {
        default: null,
        parseHTML: (element) => element.getAttribute('width') || element.style.width || null,
        renderHTML: (attributes) => {
          if (!attributes.width) return {};
          return { width: attributes.width };
        },
      },
      height: {
        default: null,
        parseHTML: (element) => element.getAttribute('height') || element.style.height || null,
        renderHTML: (attributes) => {
          if (!attributes.height) return {};
          return { height: attributes.height };
        },
      },
      float: {
        default: null,
        parseHTML: (element) => element.getAttribute('data-float') || null,
        renderHTML: (attributes) => {
          if (!attributes.float) return {};
          return { 'data-float': attributes.float };
        },
      },
    };
  },

  addNodeView() {
    return VueNodeViewRenderer(ResizableImageComponent);
  },

  parseHTML() {
    return [
      {
        tag: 'img[src]',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    const attrs = mergeAttributes(this.options.HTMLAttributes, HTMLAttributes);
    const style = [];

    if (attrs.width) {
      style.push(`width: ${attrs.width}`);
    }
    if (attrs['data-float']) {
      const f = attrs['data-float'];
      if (f === 'left') {
        style.push('float: left', 'margin-right: 16px', 'margin-bottom: 8px');
      } else if (f === 'right') {
        style.push('float: right', 'margin-left: 16px', 'margin-bottom: 8px');
      } else {
        style.push('display: block', 'margin-left: auto', 'margin-right: auto');
      }
    }

    if (style.length) {
      attrs.style = style.join('; ');
    }

    return ['img', attrs];
  },
});
