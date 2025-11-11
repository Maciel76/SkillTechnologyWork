<template>
  <transition name="modal-fade">
    <div class="modal-overlay-new" @click="$emit('close')">
      <div class="modal-container-new" @click.stop>
        <div class="modal-header-new">
          <div>
            <h2>{{ isEditing ? "Editar Projeto" : "Criar Novo Projeto" }}</h2>
            <p>Preencha as informações do seu projeto</p>
          </div>
          <button class="close-btn-new" @click="$emit('close')">
            <i class="fas fa-times"></i>
          </button>
        </div>

        <div class="modal-body-new">
          <form @submit.prevent="submitForm" class="project-form-new">
            <!-- Progress Steps -->
            <div class="progress-steps">
              <div class="step" :class="{ active: currentStep >= 1 }">
                <div class="step-number">1</div>
                <span>Informações</span>
              </div>
              <div
                class="step-line"
                :class="{ active: currentStep >= 2 }"
              ></div>
              <div class="step" :class="{ active: currentStep >= 2 }">
                <div class="step-number">2</div>
                <span>Imagens</span>
              </div>
              <div
                class="step-line"
                :class="{ active: currentStep >= 3 }"
              ></div>
              <div class="step" :class="{ active: currentStep >= 3 }">
                <div class="step-number">3</div>
                <span>Detalhes</span>
              </div>
            </div>

            <!-- Step 1: Informações Básicas -->
            <div v-show="currentStep === 1" class="form-step">
              <h3>Informações Básicas do Projeto</h3>
              <p class="step-description">
                Preencha os dados principais do projeto
              </p>

              <div class="form-grid">
                <div class="form-group-new full-width">
                  <label for="projectTitle">
                    <i class="fas fa-heading"></i>
                    Título do Projeto *
                  </label>
                  <input
                    id="projectTitle"
                    name="title"
                    type="text"
                    v-model="localFormData.title"
                    placeholder="Ex: Dashboard com IA para Controle de Estoque"
                    required
                  />
                </div>

                <div class="form-group-new">
                  <label for="projectCategory">
                    <i class="fas fa-tag"></i>
                    Categoria *
                  </label>
                  <input
                    id="projectCategory"
                    name="category"
                    type="text"
                    v-model="localFormData.category"
                    placeholder="Ex: Website & Sistema"
                    required
                  />
                </div>

                <div class="form-group-new">
                  <label for="projectClient">
                    <i class="fas fa-user"></i>
                    Cliente *
                  </label>
                  <input
                    id="projectClient"
                    name="client"
                    type="text"
                    v-model="localFormData.client"
                    placeholder="Ex: TechCorp Inc."
                    required
                  />
                </div>

                <div class="form-group-new">
                  <label for="projectYear">
                    <i class="fas fa-calendar"></i>
                    Ano *
                  </label>
                  <input
                    id="projectYear"
                    name="year"
                    type="text"
                    v-model="localFormData.year"
                    placeholder="Ex: 2024"
                    required
                  />
                </div>

                <div class="form-group-new">
                  <label for="projectLiveUrl">
                    <i class="fas fa-link"></i>
                    URL ao Vivo
                  </label>
                  <input
                    id="projectLiveUrl"
                    name="liveUrl"
                    type="text"
                    v-model="localFormData.liveUrl"
                    placeholder="https://..."
                  />
                </div>

                <div class="form-group-new">
                  <label for="projectGithubUrl">
                    <i class="fab fa-github"></i>
                    URL de Contato
                  </label>
                  <input
                    id="projectGithubUrl"
                    name="githubUrl"
                    type="text"
                    v-model="localFormData.githubUrl"
                    placeholder="https://..."
                  />
                </div>

                <div class="form-group-new full-width">
                  <label>
                    <i class="fas fa-code"></i>
                    Tecnologias Utilizadas
                  </label>

                  <div
                    v-if="localFormData.technologies.length > 0"
                    class="selected-technologies"
                  >
                    <span
                      v-for="(tech, i) in localFormData.technologies"
                      :key="i"
                      class="tech-tag-selected"
                    >
                      {{ tech }}
                      <button
                        type="button"
                        @click="removeTechnology(i)"
                        class="remove-tech"
                      >
                        <i class="fas fa-times"></i>
                      </button>
                    </span>
                  </div>

                  <div class="tech-grid">
                    <label
                      v-for="tech in availableTechnologies"
                      :key="tech"
                      class="tech-checkbox-item"
                      :class="{
                        selected: localFormData.technologies.includes(tech),
                      }"
                    >
                      <input
                        type="checkbox"
                        :value="tech"
                        :checked="localFormData.technologies.includes(tech)"
                        @change="toggleTechnology(tech)"
                      />
                      <span class="tech-name">{{ tech }}</span>
                    </label>
                  </div>

                  <div class="custom-tech-input">
                    <input
                      type="text"
                      v-model="customTechInput"
                      @keydown.enter.prevent="addCustomTechnology"
                      placeholder="Outra tecnologia? Digite e pressione Enter"
                      class="tech-input-custom"
                    />
                    <button
                      type="button"
                      @click="addCustomTechnology"
                      class="btn-add-custom-tech"
                      :disabled="!customTechInput.trim()"
                    >
                      <i class="fas fa-plus"></i>
                    </button>
                  </div>
                </div>

                <div class="form-group-new">
                  <label class="checkbox-container">
                    <input type="checkbox" v-model="localFormData.published" />
                    <span class="checkbox-custom"></span>
                    <span class="checkbox-label">
                      <i class="fas fa-eye"></i>
                      Publicar no site
                    </span>
                  </label>
                </div>
              </div>
            </div>

            <!-- Step 2: Imagens -->
            <div v-show="currentStep === 2" class="form-step">
              <h3>Imagens do Projeto</h3>
              <p class="step-description">
                Adicione imagens de destaque e galeria
              </p>

              <div class="form-group-new">
                <label>
                  <i class="fas fa-image"></i>
                  Imagem Principal (Thumbnail) *
                </label>
                <div class="image-upload-new">
                  <div v-if="localFormData.thumbnail" class="image-preview-new">
                    <img :src="localFormData.thumbnail" alt="Preview" />
                    <button
                      type="button"
                      class="btn-remove-image-new"
                      @click="removeThumbnail"
                    >
                      <i class="fas fa-times"></i>
                    </button>
                  </div>
                  <div v-else class="upload-placeholder-new">
                    <i class="fas fa-cloud-upload-alt"></i>
                    <h4>Adicionar Imagem Principal</h4>
                    <p>Arraste uma imagem ou clique para selecionar</p>
                  </div>

                  <div class="upload-options">
                    <div class="upload-option">
                      <label class="file-upload-label">
                        <i class="fas fa-file-image"></i>
                        <span>Fazer Upload</span>
                        <input
                          type="file"
                          accept="image/*"
                          @change="handleThumbnailUpload"
                          hidden
                        />
                      </label>
                    </div>
                    <div class="upload-divider">ou</div>
                    <div class="upload-option">
                      <input
                        type="url"
                        v-model="thumbnailUrl"
                        placeholder="Cole a URL da imagem"
                        class="url-input"
                      />
                      <button
                        type="button"
                        class="btn-add-url"
                        @click="addThumbnailFromUrl"
                        :disabled="!thumbnailUrl"
                      >
                        <i class="fas fa-link"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div class="form-group-new">
                <label>
                  <i class="fas fa-images"></i>
                  Galeria de Imagens (até 3 imagens) -
                  {{ localFormData.images.length }}/3
                </label>
                <div class="gallery-grid-new">
                  <div
                    v-for="(image, index) in localFormData.images"
                    :key="index"
                    class="gallery-item-new"
                  >
                    <img :src="image" :alt="`Imagem ${index + 1}`" />
                    <button
                      type="button"
                      class="btn-remove-gallery-new"
                      @click="removeGalleryImage(index)"
                    >
                      <i class="fas fa-times"></i>
                    </button>
                  </div>

                  <div
                    v-if="localFormData.images.length < 3"
                    class="gallery-add-new"
                    @click="openGalleryUpload"
                  >
                    <i class="fas fa-plus"></i>
                    <p>Adicionar Imagem</p>
                  </div>
                </div>

                <div v-if="showGalleryUpload" class="gallery-upload-options">
                  <div class="upload-option">
                    <label class="file-upload-label">
                      <i class="fas fa-file-image"></i>
                      <span>Fazer Upload</span>
                      <input
                        type="file"
                        accept="image/*"
                        @change="handleGalleryImageUpload"
                        hidden
                      />
                    </label>
                  </div>
                  <div class="upload-divider">ou</div>
                  <div class="upload-option">
                    <input
                      type="url"
                      v-model="galleryImageUrl"
                      placeholder="Cole a URL da imagem"
                      class="url-input"
                      @keypress.enter.prevent="addGalleryImageFromUrl"
                    />
                    <button
                      type="button"
                      class="btn-add-url"
                      @click="addGalleryImageFromUrl"
                      :disabled="
                        !galleryImageUrl || localFormData.images.length >= 3
                      "
                    >
                      <i class="fas fa-link"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <!-- Step 3: Detalhes do Projeto -->
            <div v-show="currentStep === 3" class="form-step">
              <h3>Detalhes do Projeto</h3>
              <p class="step-description">
                Descreva o desafio, solução e resultados
              </p>

              <div class="form-grid">
                <div class="form-group-new full-width">
                  <label for="projectChallenge">
                    <i class="fas fa-lightbulb"></i>
                    O Desafio *
                  </label>
                  <textarea
                    id="projectChallenge"
                    name="challenge"
                    v-model="localFormData.challenge"
                    placeholder="Descreva os desafios enfrentados pelo cliente..."
                    rows="5"
                    required
                  ></textarea>
                </div>

                <div class="form-group-new full-width">
                  <label>
                    <i class="fas fa-cogs"></i>
                    Nossa Solução (pressione Enter para adicionar itens)
                  </label>
                  <div class="solution-list">
                    <div
                      v-for="(item, i) in localFormData.solution"
                      :key="i"
                      class="solution-item"
                    >
                      <i class="fas fa-check-circle"></i>
                      <span>{{ item }}</span>
                      <button
                        type="button"
                        @click="removeSolution(i)"
                        class="remove-solution"
                      >
                        <i class="fas fa-times"></i>
                      </button>
                    </div>
                  </div>
                  <input
                    type="text"
                    v-model="solutionInput"
                    @keydown.enter.prevent="addSolution"
                    placeholder="Digite um item da solução e pressione Enter"
                    class="solution-input"
                  />
                </div>

                <div class="form-group-new full-width">
                  <label>
                    <i class="fas fa-chart-line"></i>
                    Resultados (pressione Enter para adicionar itens)
                  </label>
                  <div class="results-list">
                    <div
                      v-for="(item, i) in localFormData.results"
                      :key="i"
                      class="result-item"
                    >
                      <i class="fas fa-trophy"></i>
                      <span>{{ item }}</span>
                      <button
                        type="button"
                        @click="removeResult(i)"
                        class="remove-result"
                      >
                        <i class="fas fa-times"></i>
                      </button>
                    </div>
                  </div>
                  <input
                    type="text"
                    v-model="resultInput"
                    @keydown.enter.prevent="addResult"
                    placeholder="Digite um resultado e pressione Enter"
                    class="result-input"
                  />
                </div>
              </div>
            </div>

            <!-- Navigation Buttons -->
            <div class="form-navigation">
              <button
                v-if="currentStep > 1"
                type="button"
                class="btn-secondary-new"
                @click="previousStep"
              >
                <i class="fas fa-arrow-left"></i>
                Voltar
              </button>
              <button
                v-if="currentStep < 3"
                type="button"
                class="btn-primary-new"
                @click="nextStep"
                :disabled="!canProceedToNextStep"
                :title="nextStepTooltip"
              >
                Próximo
                <i class="fas fa-arrow-right"></i>
              </button>
              <button
                v-if="currentStep === 3"
                type="submit"
                class="btn-success-new"
                :disabled="isSaving || !canProceedToNextStep"
                :title="nextStepTooltip"
              >
                <i v-if="isSaving" class="fas fa-spinner fa-spin"></i>
                <i v-else class="fas fa-check"></i>
                {{
                  isSaving ? "Salvando..." : isEditing ? "Atualizar" : "Criar"
                }}
                Projeto
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { defineComponent, ref, watch, computed } from "vue";

export default defineComponent({
  name: "ProjectFormModal",
  props: {
    projectData: {
      type: Object,
      default: null,
    },
    isEditing: {
      type: Boolean,
      default: false,
    },
    isSaving: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["close", "save"],
  setup(props, { emit }) {
    const currentStep = ref(1);
    const localFormData = ref({});

    const thumbnailUrl = ref("");
    const galleryImageUrl = ref("");
    const showGalleryUpload = ref(false);
    const customTechInput = ref("");
    const solutionInput = ref("");
    const resultInput = ref("");

    const availableTechnologies = ref([
      "Vue.js",
      "React",
      "Angular",
      "Node.js",
      "Express",
      "MongoDB",
      "PostgreSQL",
      "MySQL",
      "Firebase",
      "TypeScript",
      "JavaScript",
      "Python",
      "Django",
      "Flask",
      "PHP",
      "Laravel",
      "Next.js",
      "Nuxt.js",
      "TailwindCSS",
      "Bootstrap",
      "SASS",
      "Docker",
      "Kubernetes",
      "AWS",
      "Azure",
      "Google Cloud",
      "Git",
      "GitHub",
      "GitLab",
      "HTML5",
      "CSS3",
      "jQuery",
      "Redux",
      "Vuex",
      "Pinia",
      "GraphQL",
      "REST API",
      "WebSocket",
      "Socket.io",
      "Webpack",
      "Vite",
      "Figma",
      "Adobe XD",
      "Photoshop",
      "Illustrator",
      "WordPress",
      "Shopify",
      "Stripe",
      "PayPal",
      "TensorFlow.js",
      "Three.js",
      "D3.js",
      "Chart.js",
      "Jest",
      "Cypress",
      "Mocha",
      "Chai",
      "WebRTC",
      "Electron",
      "React Native",
      "Flutter",
      "Swift",
      "Kotlin",
      "Java",
      "C#",
      ".NET",
      "Spring Boot",
      "Redis",
      "Elasticsearch",
      "RabbitMQ",
      "Nginx",
      "Apache",
      "Linux",
      "Ubuntu",
      "Debian",
      "CentOS",
    ]);

    const resetForm = () => {
      localFormData.value = {
        title: "",
        category: "",
        client: "",
        year: new Date().getFullYear().toString(),
        thumbnail: "",
        images: [],
        technologies: [],
        challenge: "",
        solution: [],
        results: [],
        liveUrl: "",
        githubUrl: "",
        published: false,
      };
    };

    watch(
      () => props.projectData,
      (newVal) => {
        if (newVal) {
          localFormData.value = JSON.parse(JSON.stringify(newVal)); // Deep copy
        } else {
          resetForm();
        }
        currentStep.value = 1;
      },
      { immediate: true, deep: true }
    );

    const canProceedToNextStep = computed(() => {
      if (currentStep.value === 1) {
        return !!(
          localFormData.value.title &&
          localFormData.value.category &&
          localFormData.value.client &&
          localFormData.value.year
        );
      }
      if (currentStep.value === 2) {
        return !!localFormData.value.thumbnail;
      }
      if (currentStep.value === 3) {
        return !!localFormData.value.challenge;
      }
      return true;
    });

    const nextStepTooltip = computed(() => {
      if (canProceedToNextStep.value) return "";
      if (currentStep.value === 1)
        return "Preencha todos os campos obrigatórios (*)";
      if (currentStep.value === 2)
        return "Adicione uma imagem principal (thumbnail)";
      if (currentStep.value === 3) return "Descreva o desafio do projeto";
      return "Preencha os campos obrigatórios para avançar";
    });

    const nextStep = () => {
      if (canProceedToNextStep.value && currentStep.value < 3) {
        currentStep.value++;
      }
    };

    const previousStep = () => {
      if (currentStep.value > 1) {
        currentStep.value--;
      }
    };

    const toggleTechnology = (tech) => {
      const index = localFormData.value.technologies.indexOf(tech);
      if (index > -1) {
        localFormData.value.technologies.splice(index, 1);
      } else {
        localFormData.value.technologies.push(tech);
      }
    };

    const addCustomTechnology = () => {
      if (customTechInput.value.trim()) {
        const customTech = customTechInput.value.trim();
        if (!localFormData.value.technologies.includes(customTech)) {
          localFormData.value.technologies.push(customTech);
        }
        customTechInput.value = "";
      }
    };

    const removeTechnology = (index) => {
      localFormData.value.technologies.splice(index, 1);
    };

    const addSolution = () => {
      if (solutionInput.value.trim()) {
        localFormData.value.solution.push(solutionInput.value.trim());
        solutionInput.value = "";
      }
    };

    const removeSolution = (index) => {
      localFormData.value.solution.splice(index, 1);
    };

    const addResult = () => {
      if (resultInput.value.trim()) {
        localFormData.value.results.push(resultInput.value.trim());
        resultInput.value = "";
      }
    };

    const removeResult = (index) => {
      localFormData.value.results.splice(index, 1);
    };

    const handleImageUpload = (event, target) => {
      const file = event.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          if (target === "thumbnail") {
            localFormData.value.thumbnail = e.target?.result;
          } else if (
            target === "gallery" &&
            localFormData.value.images.length < 3
          ) {
            localFormData.value.images.push(e.target?.result);
            showGalleryUpload.value = false;
          }
        };
        reader.readAsDataURL(file);
      }
    };

    const handleThumbnailUpload = (e) => handleImageUpload(e, "thumbnail");
    const handleGalleryImageUpload = (e) => handleImageUpload(e, "gallery");

    const addThumbnailFromUrl = () => {
      if (thumbnailUrl.value) {
        localFormData.value.thumbnail = thumbnailUrl.value;
        thumbnailUrl.value = "";
      }
    };

    const removeThumbnail = () => {
      localFormData.value.thumbnail = "";
    };

    const openGalleryUpload = () => {
      showGalleryUpload.value = true;
    };

    const addGalleryImageFromUrl = () => {
      if (galleryImageUrl.value && localFormData.value.images.length < 3) {
        localFormData.value.images.push(galleryImageUrl.value);
        galleryImageUrl.value = "";
        showGalleryUpload.value = false;
      }
    };

    const removeGalleryImage = (index) => {
      localFormData.value.images.splice(index, 1);
    };

    const submitForm = () => {
      if (!canProceedToNextStep.value) return;
      emit("save", localFormData.value);
    };

    return {
      currentStep,
      localFormData,
      thumbnailUrl,
      galleryImageUrl,
      showGalleryUpload,
      customTechInput,
      solutionInput,
      resultInput,
      availableTechnologies,
      canProceedToNextStep,
      nextStepTooltip,
      nextStep,
      previousStep,
      toggleTechnology,
      addCustomTechnology,
      removeTechnology,
      addSolution,
      removeSolution,
      addResult,
      removeResult,
      handleThumbnailUpload,
      addThumbnailFromUrl,
      removeThumbnail,
      handleGalleryImageUpload,
      openGalleryUpload,
      addGalleryImageFromUrl,
      removeGalleryImage,
      submitForm,
    };
  },
});
</script>

<style scoped>
/* Reusing styles from EventsManagement and adding specific ones */
.modal-overlay-new {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(4px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 20px;
  overflow-y: auto;
}

.modal-container-new {
  background: white;
  border-radius: 16px;
  width: 100%;
  max-width: 900px;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

.modal-header-new {
  padding: 24px 32px;
  border-bottom: 1px solid #e5e7eb;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-header-new h2 {
  font-size: 1.5rem;
  margin-bottom: 4px;
  color: #111827;
}

.modal-header-new p {
  color: #6b7280;
  font-size: 0.9rem;
}

.close-btn-new {
  background: #f3f4f6;
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  color: #6b7280;
}

.close-btn-new:hover {
  background: #e5e7eb;
  color: #111827;
}

.modal-body-new {
  padding: 32px;
  overflow-y: auto;
}

/* Progress Steps */
.progress-steps {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 40px;
}

.step {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.step-number {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #e5e7eb;
  color: #9ca3af;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  transition: all 0.3s ease;
}

.step.active .step-number {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
}

.step span {
  font-size: 0.85rem;
  color: #9ca3af;
  font-weight: 500;
}

.step.active span {
  color: #667eea;
}

.step-line {
  width: 80px;
  height: 2px;
  background: #e5e7eb;
  margin: 0 16px 24px;
  transition: all 0.3s ease;
}

.step-line.active {
  background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
}

/* Form Steps */
.form-step {
  animation: fadeIn 0.4s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.form-step h3 {
  font-size: 1.25rem;
  margin-bottom: 8px;
  color: #111827;
}

.step-description {
  color: #6b7280;
  margin-bottom: 24px;
}

/* Form Grid */
.form-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

.form-group-new {
  display: flex;
  flex-direction: column;
}

.form-group-new.full-width {
  grid-column: 1 / -1;
}

.form-group-new label {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
  font-weight: 500;
  color: #374151;
  font-size: 0.9rem;
}

.form-group-new label i {
  color: #667eea;
  width: 16px;
}

.form-group-new input,
.form-group-new select,
.form-group-new textarea {
  padding: 12px 16px;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  font-size: 0.95rem;
  transition: all 0.3s ease;
  font-family: inherit;
}

.form-group-new input:focus,
.form-group-new select:focus,
.form-group-new textarea:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

/* Tech Input */
.selected-technologies {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 16px;
  padding: 12px;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  border-radius: 12px;
  border: 1px solid #dee2e6;
}

.tech-tag-selected {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 6px;
  box-shadow: 0 2px 8px rgba(102, 126, 234, 0.3);
  transition: all 0.3s ease;
}

.tech-tag-selected:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
}

.tech-tag-selected .remove-tech {
  background: rgba(255, 255, 255, 0.2);
  border: none;
  color: white;
  cursor: pointer;
  padding: 2px 4px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
  transition: all 0.2s ease;
}

.tech-tag-selected .remove-tech:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: scale(1.1);
}

.tech-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  gap: 10px;
  margin-bottom: 16px;
  max-height: 300px;
  overflow-y: auto;
  padding: 12px;
  background: #f8f9fa;
  border-radius: 12px;
  border: 1px solid #e5e7eb;
}

.tech-checkbox-item {
  position: relative;
  display: flex;
  align-items: center;
  padding: 10px 14px;
  background: white;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  user-select: none;
}

.tech-checkbox-item:hover {
  border-color: #667eea;
  background: #f0f4ff;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.15);
}

.tech-checkbox-item.selected {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-color: #667eea;
  color: white;
  font-weight: 600;
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
}

.tech-checkbox-item input[type="checkbox"] {
  position: absolute;
  opacity: 0;
  cursor: pointer;
}

.tech-checkbox-item .tech-name {
  width: 100%;
  text-align: center;
  font-size: 0.9rem;
}

.tech-checkbox-item.selected .tech-name::before {
  content: "✓ ";
  font-weight: bold;
}

.custom-tech-input {
  display: flex;
  gap: 8px;
  align-items: center;
  margin-top: 12px;
}

.tech-input-custom {
  flex: 1;
  padding: 10px 14px;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  font-size: 0.95rem;
  transition: all 0.3s ease;
}

.tech-input-custom:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.btn-add-custom-tech {
  padding: 10px 16px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 45px;
}

.btn-add-custom-tech:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
}

.btn-add-custom-tech:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.tech-grid::-webkit-scrollbar {
  width: 8px;
}

.tech-grid::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}

.tech-grid::-webkit-scrollbar-thumb {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 10px;
}

.tech-grid::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(135deg, #764ba2 0%, #667eea 100%);
}

/* Solution and Results */
.solution-list,
.results-list {
  margin-bottom: 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.solution-item,
.result-item {
  background: #f9fafb;
  padding: 12px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 12px;
}

.solution-item i,
.result-item i {
  color: #667eea;
}

.solution-item span,
.result-item span {
  flex: 1;
  color: #374151;
}

.remove-solution,
.remove-result {
  background: none;
  border: none;
  color: #ef4444;
  cursor: pointer;
  padding: 4px;
}

.remove-solution:hover,
.remove-result:hover {
  opacity: 0.7;
}

.solution-input,
.result-input {
  padding: 12px 16px;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  font-size: 0.95rem;
  transition: all 0.3s ease;
  font-family: inherit;
}

.solution-input:focus,
.result-input:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

/* Image Upload */
.image-upload-new {
  margin-bottom: 24px;
}

.image-preview-new {
  position: relative;
  width: 100%;
  height: 300px;
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: 16px;
}

.image-preview-new img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.btn-remove-image-new {
  position: absolute;
  top: 12px;
  right: 12px;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(4px);
  color: white;
  border: none;
  width: 36px;
  height: 36px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-remove-image-new:hover {
  background: rgba(0, 0, 0, 0.9);
}

.upload-placeholder-new {
  width: 100%;
  height: 300px;
  border: 2px dashed #d1d5db;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-bottom: 16px;
}

.upload-placeholder-new:hover {
  border-color: #667eea;
  background: #f9fafb;
}

.upload-placeholder-new i {
  font-size: 3rem;
  color: #9ca3af;
  margin-bottom: 12px;
}

.upload-placeholder-new h4 {
  font-size: 1.1rem;
  margin-bottom: 8px;
  color: #111827;
}

.upload-placeholder-new p {
  color: #6b7280;
  font-size: 0.9rem;
}

.upload-options {
  display: flex;
  align-items: center;
  gap: 16px;
}

.upload-option {
  flex: 1;
  display: flex;
  gap: 8px;
}

.file-upload-label {
  flex: 1;
  background: #f3f4f6;
  border: 2px solid #e5e7eb;
  padding: 12px 20px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 500;
  color: #374151;
}

.file-upload-label:hover {
  background: #e5e7eb;
  border-color: #d1d5db;
}

.upload-divider {
  color: #9ca3af;
  font-size: 0.9rem;
}

.url-input {
  flex: 1;
  padding: 12px 16px;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  font-size: 0.95rem;
  transition: all 0.3s ease;
}

.url-input:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.btn-add-url {
  background: #667eea;
  color: white;
  border: none;
  padding: 12px 16px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-add-url:hover:not(:disabled) {
  background: #5568d3;
}

.btn-add-url:disabled {
  background: #d1d5db;
  cursor: not-allowed;
}

/* Gallery Grid */
.gallery-grid-new {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 16px;
  margin-bottom: 20px;
}

.gallery-item-new {
  position: relative;
  aspect-ratio: 4/3;
  border-radius: 12px;
  overflow: hidden;
}

.gallery-item-new img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.btn-remove-gallery-new {
  position: absolute;
  top: 8px;
  right: 8px;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(4px);
  color: white;
  border: none;
  width: 32px;
  height: 32px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-remove-gallery-new:hover {
  background: rgba(0, 0, 0, 0.9);
}

.gallery-add-new {
  aspect-ratio: 4/3;
  border: 2px dashed #d1d5db;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  background: #f9fafb;
}

.gallery-add-new:hover {
  border-color: #667eea;
  background: white;
}

.gallery-add-new i {
  font-size: 2rem;
  color: #9ca3af;
  margin-bottom: 8px;
}

.gallery-add-new p {
  color: #6b7280;
  font-size: 0.9rem;
  font-weight: 500;
}

.gallery-upload-options {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 20px;
  background: #f9fafb;
  border-radius: 12px;
  margin-bottom: 20px;
}

/* Checkbox */
.checkbox-container {
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  padding: 12px 0;
}

.checkbox-container input[type="checkbox"] {
  display: none;
}

.checkbox-custom {
  width: 20px;
  height: 20px;
  border: 2px solid #e5e7eb;
  border-radius: 4px;
  transition: all 0.3s ease;
  position: relative;
}

.checkbox-container input[type="checkbox"]:checked + .checkbox-custom {
  background: #667eea;
  border-color: #667eea;
}

.checkbox-container input[type="checkbox"]:checked + .checkbox-custom::after {
  content: "✓";
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  font-size: 12px;
  font-weight: bold;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 500;
  color: #374151;
}

/* Form Navigation */
.form-navigation {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  margin-top: 32px;
  padding-top: 24px;
  border-top: 1px solid #e5e7eb;
}

.btn-primary-new,
.btn-secondary-new,
.btn-success-new {
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s ease;
}

.btn-primary-new {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
}

.btn-primary-new:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(102, 126, 234, 0.6);
}

.btn-secondary-new {
  background: #f3f4f6;
  color: #374151;
}

.btn-secondary-new:hover {
  background: #e5e7eb;
}

.btn-success-new {
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  color: white;
  box-shadow: 0 4px 15px rgba(16, 185, 129, 0.4);
}

.btn-success-new:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(16, 185, 129, 0.6);
}

.btn-primary-new:disabled,
.btn-success-new:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}
</style>
