import Youtube from '@tiptap/extension-youtube';
import { VueNodeViewRenderer } from '@tiptap/vue-3';
import ResizableVideoComponent from './ResizableVideoComponent.vue';

export default Youtube.extend({
  name: 'resizableYoutube',

  addAttributes() {
    return {
      ...this.parent?.(),
      width: {
        default: '100%',
        parseHTML: (element) => element.getAttribute('width') || element.style.width || '100%',
        renderHTML: (attributes) => {
          if (!attributes.width) return {};
          return { width: attributes.width };
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
    return VueNodeViewRenderer(ResizableVideoComponent);
  },
});
