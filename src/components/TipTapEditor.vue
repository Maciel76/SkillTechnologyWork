<template>
  <div class="tiptap-editor">
    <!-- Toolbar -->
    <div class="editor-toolbar" v-if="editor">
      <!-- Formatação de Texto -->
      <div class="toolbar-group">
        <button
          @click="editor.chain().focus().toggleBold().run()"
          :class="{ 'is-active': editor.isActive('bold') }"
          title="Negrito (Ctrl+B)"
        >
          <i class="fas fa-bold"></i>
        </button>
        <button
          @click="editor.chain().focus().toggleItalic().run()"
          :class="{ 'is-active': editor.isActive('italic') }"
          title="Itálico (Ctrl+I)"
        >
          <i class="fas fa-italic"></i>
        </button>
        <button
          @click="editor.chain().focus().toggleStrike().run()"
          :class="{ 'is-active': editor.isActive('strike') }"
          title="Riscado"
        >
          <i class="fas fa-strikethrough"></i>
        </button>
        <button
          @click="editor.chain().focus().toggleHighlight().run()"
          :class="{ 'is-active': editor.isActive('highlight') }"
          title="Destacar"
        >
          <i class="fas fa-highlighter"></i>
        </button>
      </div>

      <div class="toolbar-divider"></div>

      <!-- Títulos -->
      <div class="toolbar-group">
        <button
          @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
          :class="{ 'is-active': editor.isActive('heading', { level: 1 }) }"
          title="Título 1"
        >
          H1
        </button>
        <button
          @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
          :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }"
          title="Título 2"
        >
          H2
        </button>
        <button
          @click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
          :class="{ 'is-active': editor.isActive('heading', { level: 3 }) }"
          title="Título 3"
        >
          H3
        </button>
        <button
          @click="editor.chain().focus().setParagraph().run()"
          :class="{ 'is-active': editor.isActive('paragraph') }"
          title="Parágrafo"
        >
          <i class="fas fa-paragraph"></i>
        </button>
      </div>

      <div class="toolbar-divider"></div>

      <!-- Listas -->
      <div class="toolbar-group">
        <button
          @click="editor.chain().focus().toggleBulletList().run()"
          :class="{ 'is-active': editor.isActive('bulletList') }"
          title="Lista com marcadores"
        >
          <i class="fas fa-list-ul"></i>
        </button>
        <button
          @click="editor.chain().focus().toggleOrderedList().run()"
          :class="{ 'is-active': editor.isActive('orderedList') }"
          title="Lista numerada"
        >
          <i class="fas fa-list-ol"></i>
        </button>
        <button
          @click="editor.chain().focus().toggleBlockquote().run()"
          :class="{ 'is-active': editor.isActive('blockquote') }"
          title="Citação"
        >
          <i class="fas fa-quote-left"></i>
        </button>
      </div>

      <div class="toolbar-divider"></div>

      <!-- Alinhamento -->
      <div class="toolbar-group">
        <button
          @click="editor.chain().focus().setTextAlign('left').run()"
          :class="{ 'is-active': editor.isActive({ textAlign: 'left' }) }"
          title="Alinhar à esquerda"
        >
          <i class="fas fa-align-left"></i>
        </button>
        <button
          @click="editor.chain().focus().setTextAlign('center').run()"
          :class="{ 'is-active': editor.isActive({ textAlign: 'center' }) }"
          title="Centralizar"
        >
          <i class="fas fa-align-center"></i>
        </button>
        <button
          @click="editor.chain().focus().setTextAlign('right').run()"
          :class="{ 'is-active': editor.isActive({ textAlign: 'right' }) }"
          title="Alinhar à direita"
        >
          <i class="fas fa-align-right"></i>
        </button>
        <button
          @click="editor.chain().focus().setTextAlign('justify').run()"
          :class="{ 'is-active': editor.isActive({ textAlign: 'justify' }) }"
          title="Justificar"
        >
          <i class="fas fa-align-justify"></i>
        </button>
      </div>

      <div class="toolbar-divider"></div>

      <!-- Mídia -->
      <div class="toolbar-group">
        <button @click="showImageUrlModal = true" title="Inserir imagem (URL)">
          <i class="fas fa-image"></i>
        </button>
        <button @click="showYoutubeModal = true" title="Inserir vídeo do YouTube">
          <i class="fab fa-youtube"></i>
        </button>
        <button @click="showLinkModal = true" title="Inserir link">
          <i class="fas fa-link"></i>
        </button>
        <button
          @click="editor.chain().focus().toggleCodeBlock().run()"
          :class="{ 'is-active': editor.isActive('codeBlock') }"
          title="Bloco de código"
        >
          <i class="fas fa-code"></i>
        </button>
      </div>

      <div class="toolbar-divider"></div>

      <!-- Ações -->
      <div class="toolbar-group">
        <button
          @click="editor.chain().focus().undo().run()"
          :disabled="!editor.can().undo()"
          title="Desfazer (Ctrl+Z)"
        >
          <i class="fas fa-undo"></i>
        </button>
        <button
          @click="editor.chain().focus().redo().run()"
          :disabled="!editor.can().redo()"
          title="Refazer (Ctrl+Y)"
        >
          <i class="fas fa-redo"></i>
        </button>
        <button
          @click="editor.chain().focus().setHorizontalRule().run()"
          title="Linha horizontal"
        >
          <i class="fas fa-minus"></i>
        </button>
      </div>
    </div>

    <!-- Editor Content -->
    <editor-content :editor="editor" class="editor-content" />

    <!-- Modal: Inserir Imagem por URL -->
    <div v-if="showImageUrlModal" class="modal-overlay" @click="closeImageModal">
      <div class="modal-content" @click.stop>
        <h3>Inserir Imagem</h3>
        <input
          v-model="imageUrl"
          type="url"
          placeholder="https://exemplo.com/imagem.jpg"
          @keyup.enter="addImage"
        />
        <div class="modal-actions">
          <button @click="addImage" class="btn-primary">Inserir</button>
          <button @click="closeImageModal" class="btn-secondary">Cancelar</button>
        </div>
      </div>
    </div>

    <!-- Modal: Inserir Vídeo do YouTube -->
    <div v-if="showYoutubeModal" class="modal-overlay" @click="closeYoutubeModal">
      <div class="modal-content" @click.stop>
        <h3>Inserir Vídeo do YouTube</h3>
        <input
          v-model="youtubeUrl"
          type="url"
          placeholder="https://www.youtube.com/watch?v=..."
          @keyup.enter="addYoutube"
        />
        <div class="modal-actions">
          <button @click="addYoutube" class="btn-primary">Inserir</button>
          <button @click="closeYoutubeModal" class="btn-secondary">Cancelar</button>
        </div>
      </div>
    </div>

    <!-- Modal: Inserir Link -->
    <div v-if="showLinkModal" class="modal-overlay" @click="closeLinkModal">
      <div class="modal-content" @click.stop>
        <h3>Inserir Link</h3>
        <input
          v-model="linkUrl"
          type="url"
          placeholder="https://exemplo.com"
          @keyup.enter="addLink"
        />
        <div class="modal-actions">
          <button @click="addLink" class="btn-primary">Inserir</button>
          <button @click="closeLinkModal" class="btn-secondary">Cancelar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useEditor, EditorContent } from '@tiptap/vue-3';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import Youtube from '@tiptap/extension-youtube';
import TextAlign from '@tiptap/extension-text-align';
import Highlight from '@tiptap/extension-highlight';
import { ref, watch, onBeforeUnmount } from 'vue';

export default {
  name: 'TipTapEditor',
  components: {
    EditorContent,
  },
  props: {
    modelValue: {
      type: String,
      default: '',
    },
  },
  emits: ['update:modelValue', 'textChange'],
  setup(props, { emit }) {
    const showImageUrlModal = ref(false);
    const showYoutubeModal = ref(false);
    const showLinkModal = ref(false);
    const imageUrl = ref('');
    const youtubeUrl = ref('');
    const linkUrl = ref('');

    const editor = useEditor({
      content: props.modelValue,
      extensions: [
        StarterKit,
        Image.configure({
          inline: true,
          allowBase64: true,
        }),
        Link.configure({
          openOnClick: false,
          HTMLAttributes: {
            target: '_blank',
            rel: 'noopener noreferrer',
          },
        }),
        Youtube.configure({
          controls: true,
          nocookie: true,
        }),
        TextAlign.configure({
          types: ['heading', 'paragraph'],
        }),
        Highlight.configure({
          multicolor: false,
        }),
      ],
      onUpdate: ({ editor }) => {
        const html = editor.getHTML();
        emit('update:modelValue', html);
        emit('textChange');
      },
    });

    // Watch for external changes
    watch(
      () => props.modelValue,
      (value) => {
        const isSame = editor.value.getHTML() === value;
        if (!isSame) {
          editor.value.commands.setContent(value, false);
        }
      }
    );

    const addImage = () => {
      if (imageUrl.value) {
        editor.value.chain().focus().setImage({ src: imageUrl.value }).run();
        closeImageModal();
      }
    };

    const addYoutube = () => {
      if (youtubeUrl.value) {
        editor.value.chain().focus().setYoutubeVideo({ src: youtubeUrl.value }).run();
        closeYoutubeModal();
      }
    };

    const addLink = () => {
      if (linkUrl.value) {
        editor.value
          .chain()
          .focus()
          .extendMarkRange('link')
          .setLink({ href: linkUrl.value })
          .run();
        closeLinkModal();
      }
    };

    const closeImageModal = () => {
      showImageUrlModal.value = false;
      imageUrl.value = '';
    };

    const closeYoutubeModal = () => {
      showYoutubeModal.value = false;
      youtubeUrl.value = '';
    };

    const closeLinkModal = () => {
      showLinkModal.value = false;
      linkUrl.value = '';
    };

    onBeforeUnmount(() => {
      editor.value.destroy();
    });

    return {
      editor,
      showImageUrlModal,
      showYoutubeModal,
      showLinkModal,
      imageUrl,
      youtubeUrl,
      linkUrl,
      addImage,
      addYoutube,
      addLink,
      closeImageModal,
      closeYoutubeModal,
      closeLinkModal,
    };
  },
};
</script>

<style scoped>
.tiptap-editor {
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  overflow: hidden;
  background: white;
}

/* Toolbar */
.editor-toolbar {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  padding: 12px;
  background: #f9fafb;
  border-bottom: 2px solid #e5e7eb;
}

.toolbar-group {
  display: flex;
  gap: 4px;
}

.toolbar-divider {
  width: 1px;
  background: #d1d5db;
  margin: 0 8px;
}

.editor-toolbar button {
  padding: 8px 12px;
  border: 1px solid #e5e7eb;
  background: white;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 14px;
  font-weight: 600;
  color: #6b7280;
  min-width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.editor-toolbar button:hover:not(:disabled) {
  background: #eff6ff;
  border-color: #3b82f6;
  color: #3b82f6;
}

.editor-toolbar button.is-active {
  background: #3b82f6;
  border-color: #3b82f6;
  color: white;
}

.editor-toolbar button:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

/* Editor Content */
.editor-content {
  min-height: 400px;
  max-height: 600px;
  overflow-y: auto;
  padding: 20px;
}

.editor-content :deep(.ProseMirror) {
  outline: none;
  min-height: 360px;
}

.editor-content :deep(.ProseMirror > * + *) {
  margin-top: 0.75em;
}

.editor-content :deep(h1) {
  font-size: 2em;
  font-weight: 700;
  margin: 1.5rem 0 1rem;
}

.editor-content :deep(h2) {
  font-size: 1.5em;
  font-weight: 700;
  margin: 1.2rem 0 0.8rem;
}

.editor-content :deep(h3) {
  font-size: 1.25em;
  font-weight: 600;
  margin: 1rem 0 0.6rem;
}

.editor-content :deep(p) {
  line-height: 1.6;
}

.editor-content :deep(ul),
.editor-content :deep(ol) {
  padding-left: 2rem;
  margin: 1rem 0;
}

.editor-content :deep(li) {
  margin: 0.5rem 0;
}

.editor-content :deep(blockquote) {
  border-left: 4px solid #3b82f6;
  padding-left: 1rem;
  margin: 1rem 0;
  font-style: italic;
  color: #6b7280;
}

.editor-content :deep(img) {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
  margin: 1rem 0;
  display: block;
}

.editor-content :deep(pre) {
  background: #1f2937;
  color: #f9fafb;
  padding: 1rem;
  border-radius: 8px;
  overflow-x: auto;
  margin: 1rem 0;
}

.editor-content :deep(code) {
  background: #f3f4f6;
  padding: 0.2em 0.4em;
  border-radius: 4px;
  font-family: monospace;
  font-size: 0.9em;
}

.editor-content :deep(pre code) {
  background: none;
  padding: 0;
  color: inherit;
}

.editor-content :deep(a) {
  color: #3b82f6;
  text-decoration: underline;
}

.editor-content :deep(mark) {
  background: #fef08a;
  padding: 0.1em 0.2em;
  border-radius: 2px;
}

.editor-content :deep(hr) {
  border: none;
  border-top: 2px solid #e5e7eb;
  margin: 2rem 0;
}

.editor-content :deep(iframe) {
  max-width: 100%;
  border-radius: 8px;
  margin: 1rem 0;
}

/* Modals */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.modal-content {
  background: white;
  padding: 24px;
  border-radius: 12px;
  min-width: 400px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
}

.modal-content h3 {
  margin: 0 0 16px 0;
  font-size: 1.25rem;
  color: #111827;
}

.modal-content input {
  width: 100%;
  padding: 12px;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  font-size: 1rem;
  margin-bottom: 16px;
}

.modal-content input:focus {
  outline: none;
  border-color: #3b82f6;
}

.modal-actions {
  display: flex;
  gap: 8px;
  justify-content: flex-end;
}

.btn-primary {
  padding: 10px 20px;
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}

.btn-primary:hover {
  background: #2563eb;
}

.btn-secondary {
  padding: 10px 20px;
  background: #f3f4f6;
  color: #6b7280;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}

.btn-secondary:hover {
  background: #e5e7eb;
}

/* Responsive */
@media (max-width: 768px) {
  .editor-toolbar {
    overflow-x: auto;
  }

  .modal-content {
    min-width: 90vw;
    margin: 0 20px;
  }
}
</style>
