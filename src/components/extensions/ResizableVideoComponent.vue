<template>
  <node-view-wrapper
    class="resizable-video-wrapper"
    :class="[floatClass, { 'is-selected': selected }]"
    :style="wrapperStyle"
  >
    <div class="video-container" @click="selectNode">
      <!-- Float controls -->
      <div v-if="selected" class="video-float-controls">
        <button
          @click.stop="setFloat('left')"
          :class="{ active: node.attrs.float === 'left' }"
          title="Alinhar à esquerda"
        >
          <i class="fas fa-align-left"></i>
        </button>
        <button
          @click.stop="setFloat('center')"
          :class="{ active: !node.attrs.float || node.attrs.float === 'center' }"
          title="Centralizar"
        >
          <i class="fas fa-align-center"></i>
        </button>
        <button
          @click.stop="setFloat('right')"
          :class="{ active: node.attrs.float === 'right' }"
          title="Alinhar à direita"
        >
          <i class="fas fa-align-right"></i>
        </button>
      </div>

      <div class="video-iframe-wrapper" ref="videoRef">
        <iframe
          :src="embedUrl"
          frameborder="0"
          allowfullscreen
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        ></iframe>
      </div>

      <!-- Resize handles -->
      <template v-if="selected">
        <div class="resize-handle resize-handle-right" @mousedown.stop.prevent="startResize($event, 'right')"></div>
        <div class="resize-handle resize-handle-left" @mousedown.stop.prevent="startResize($event, 'left')"></div>
      </template>
    </div>
  </node-view-wrapper>
</template>

<script>
import { NodeViewWrapper, nodeViewProps } from '@tiptap/vue-3';
import { ref, computed } from 'vue';

export default {
  name: 'ResizableVideoComponent',
  components: { NodeViewWrapper },
  props: nodeViewProps,
  setup(props) {
    const videoRef = ref(null);
    const startX = ref(0);
    const startWidth = ref(0);

    const embedUrl = computed(() => {
      const raw = props.node.attrs.src || '';
      // If already an embed URL, return as-is
      if (raw.includes('/embed/')) return raw;

      // Convert youtube.com/watch?v=ID or youtu.be/ID to embed URL
      let videoId = null;
      const watchMatch = raw.match(/(?:youtube\.com|youtube-nocookie\.com)\/(?:watch\?v=|shorts\/)([\w-]+)/);
      if (watchMatch) {
        videoId = watchMatch[1];
      } else {
        const shortMatch = raw.match(/youtu\.be\/([\w-]+)/);
        if (shortMatch) videoId = shortMatch[1];
      }

      if (videoId) {
        return `https://www.youtube-nocookie.com/embed/${videoId}`;
      }

      return raw;
    });

    const floatClass = computed(() => {
      const f = props.node.attrs.float;
      if (f === 'left') return 'float-left';
      if (f === 'right') return 'float-right';
      return 'float-center';
    });

    const wrapperStyle = computed(() => {
      const f = props.node.attrs.float;
      const w = props.node.attrs.width;
      const style = {};

      if (w) {
        style.width = w.toString().includes('%') || w.toString().includes('px') ? w : `${w}px`;
      }

      if (f === 'left') {
        style.float = 'left';
        style.marginRight = '16px';
        style.marginBottom = '8px';
      } else if (f === 'right') {
        style.float = 'right';
        style.marginLeft = '16px';
        style.marginBottom = '8px';
      } else {
        style.margin = '1rem auto';
        style.display = 'block';
      }

      return style;
    });

    const setFloat = (value) => {
      props.updateAttributes({ float: value });
    };

    const startResize = (event, direction) => {
      event.preventDefault();
      startX.value = event.clientX;
      const el = videoRef.value;
      startWidth.value = el ? el.offsetWidth : 400;

      const onMouseMove = (e) => {
        const diff = direction === 'left'
          ? startX.value - e.clientX
          : e.clientX - startX.value;
        const newWidth = Math.max(200, startWidth.value + diff);
        props.updateAttributes({ width: `${newWidth}px` });
      };

      const onMouseUp = () => {
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    };

    return {
      videoRef,
      embedUrl,
      floatClass,
      wrapperStyle,
      setFloat,
      startResize,
    };
  },
};
</script>

<style scoped>
.resizable-video-wrapper {
  position: relative;
  max-width: 100%;
}

.resizable-video-wrapper.is-selected .video-container {
  outline: 3px solid #3b82f6;
  outline-offset: 2px;
  border-radius: 8px;
}

.video-container {
  position: relative;
  display: inline-block;
  width: 100%;
  cursor: pointer;
}

.video-iframe-wrapper {
  position: relative;
  width: 100%;
  padding-bottom: 56.25%; /* 16:9 */
  height: 0;
  overflow: hidden;
  border-radius: 8px;
}

.video-iframe-wrapper iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 8px;
}

/* Float controls */
.video-float-controls {
  position: absolute;
  top: -40px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 4px;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 4px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 10;
}

.video-float-controls button {
  width: 32px;
  height: 32px;
  border: 1px solid #e5e7eb;
  background: white;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  color: #6b7280;
  transition: all 0.15s;
}

.video-float-controls button:hover {
  background: #eff6ff;
  color: #3b82f6;
  border-color: #3b82f6;
}

.video-float-controls button.active {
  background: #3b82f6;
  color: white;
  border-color: #3b82f6;
}

/* Resize handles */
.resize-handle {
  position: absolute;
  background: #3b82f6;
  border: 2px solid white;
  border-radius: 50%;
  z-index: 5;
}

.resize-handle-right {
  width: 12px;
  height: 12px;
  right: -6px;
  top: 50%;
  transform: translateY(-50%);
  cursor: ew-resize;
}

.resize-handle-left {
  width: 12px;
  height: 12px;
  left: -6px;
  top: 50%;
  transform: translateY(-50%);
  cursor: ew-resize;
}
</style>
