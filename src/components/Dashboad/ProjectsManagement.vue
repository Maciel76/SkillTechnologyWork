<template>
  <div class="projects-management">
    <div class="section-header">
      <div>
        <h2>Gerenciamento de Projetos Recentes</h2>
        <p class="subtitle">Crie e gerencie projetos para seu portfólio</p>
      </div>
      <button class="btn-primary-new" @click="openCreateModal">
        <i class="fas fa-plus"></i> Criar Projeto
      </button>
    </div>

    <!-- Loading -->
    <div v-if="projectStore.loading" class="loading-container">
      <div class="spinner"></div>
      <p>Carregando projetos...</p>
    </div>

    <!-- Error -->
    <div
      v-if="projectStore.error && !projectStore.loading"
      class="error-message"
    >
      <i class="fas fa-exclamation-circle"></i>
      {{ projectStore.error }}
      <button @click="projectStore.clearError" class="btn-close-error">
        <i class="fas fa-times"></i>
      </button>
    </div>

    <!-- Grid de Projetos -->
    <div class="projects-grid-dashboard" v-if="!projectStore.loading">
      <div
        v-for="project in projectStore.projects"
        :key="project._id"
        class="project-card-dashboard"
        @click="openProjectModal(project)"
      >
        <div class="project-image-dashboard">
          <img :src="project.thumbnail" :alt="project.title" />
          <div class="project-category-badge">
            {{ project.category }}
          </div>
          <div
            class="project-status-badge"
            :class="{ published: project.published }"
          >
            {{ project.published ? "Publicado" : "Rascunho" }}
          </div>
        </div>
        <div class="project-content-dashboard">
          <h3>{{ project.title }}</h3>
          <div class="project-meta">
            <span><i class="fas fa-user"></i> {{ project.client }}</span>
            <span><i class="fas fa-calendar"></i> {{ project.year }}</span>
          </div>
          <div class="tech-tags-dashboard">
            <span
              v-for="(tech, i) in project.technologies.slice(0, 3)"
              :key="i"
              class="tech-tag"
            >
              {{ tech }}
            </span>
            <span v-if="project.technologies.length > 3" class="tech-tag more">
              +{{ project.technologies.length - 3 }}
            </span>
          </div>
          <div class="project-actions-dashboard">
            <button class="btn-edit" @click.stop="editProject(project)">
              <i class="fas fa-edit"></i> Editar
            </button>
            <button class="btn-delete" @click.stop="deleteProject(project._id)">
              <i class="fas fa-trash"></i> Excluir
            </button>
            <button
              class="btn-publish"
              :class="{ published: project.published }"
              @click.stop="togglePublish(project._id)"
            >
              <i
                class="fas"
                :class="project.published ? 'fa-eye-slash' : 'fa-eye'"
              ></i>
              {{ project.published ? "Despublicar" : "Publicar" }}
            </button>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-if="projectStore.projects.length === 0" class="empty-state">
        <i class="fas fa-folder-open"></i>
        <h3>Nenhum projeto cadastrado</h3>
        <p>Comece criando seu primeiro projeto!</p>
        <button class="btn-primary-new" @click="openCreateModal">
          <i class="fas fa-plus"></i> Criar Projeto
        </button>
      </div>
    </div>

    <!-- Modal de Criar/Editar Projeto -->
    <transition name="modal-fade">
      <div v-if="showModal" class="modal-overlay-new" @click="closeModal">
        <div class="modal-container-new" @click.stop>
          <div class="modal-header-new">
            <div>
              <h2>{{ isEditing ? "Editar Projeto" : "Criar Novo Projeto" }}</h2>
              <p>Preencha as informações do seu projeto</p>
            </div>
            <button class="close-btn-new" @click="closeModal">
              <i class="fas fa-times"></i>
            </button>
          </div>

          <div class="modal-body-new">
            <form @submit.prevent="saveProject" class="project-form-new">
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
                      v-model="formData.title"
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
                      v-model="formData.category"
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
                      v-model="formData.client"
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
                      v-model="formData.year"
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
                      v-model="formData.liveUrl"
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
                      v-model="formData.githubUrl"
                      placeholder="https://..."
                    />
                  </div>

                  <div class="form-group-new full-width">
                    <label>
                      <i class="fas fa-code"></i>
                      Tecnologias Utilizadas
                    </label>

                    <!-- Tecnologias Selecionadas -->
                    <div v-if="formData.technologies.length > 0" class="selected-technologies">
                      <span
                        v-for="(tech, i) in formData.technologies"
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

                    <!-- Grid de Tecnologias Populares -->
                    <div class="tech-grid">
                      <label
                        v-for="tech in availableTechnologies"
                        :key="tech"
                        class="tech-checkbox-item"
                        :class="{ selected: formData.technologies.includes(tech) }"
                      >
                        <input
                          type="checkbox"
                          :value="tech"
                          :checked="formData.technologies.includes(tech)"
                          @change="toggleTechnology(tech)"
                        />
                        <span class="tech-name">{{ tech }}</span>
                      </label>
                    </div>

                    <!-- Input para Tecnologia Customizada -->
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
                      <input type="checkbox" v-model="formData.published" />
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

                <!-- Imagem Principal -->
                <div class="form-group-new">
                  <label>
                    <i class="fas fa-image"></i>
                    Imagem Principal (Thumbnail) *
                  </label>
                  <div class="image-upload-new">
                    <div v-if="formData.thumbnail" class="image-preview-new">
                      <img :src="formData.thumbnail" alt="Preview" />
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

                <!-- Galeria de Imagens -->
                <div class="form-group-new">
                  <label>
                    <i class="fas fa-images"></i>
                    Galeria de Imagens (até 3 imagens) - {{ formData.images.length }}/3
                  </label>
                  <div class="gallery-grid-new">
                    <div
                      v-for="(image, index) in formData.images"
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
                      v-if="formData.images.length < 3"
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
                          !galleryImageUrl || formData.images.length >= 3
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
                      v-model="formData.challenge"
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
                        v-for="(item, i) in formData.solution"
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
                        v-for="(item, i) in formData.results"
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
                >
                  Próximo
                  <i class="fas fa-arrow-right"></i>
                </button>
                <button
                  v-if="currentStep === 3"
                  type="submit"
                  class="btn-success-new"
                  :disabled="isSaving"
                >
                  <i v-if="isSaving" class="fas fa-spinner fa-spin"></i>
                  <i v-else class="fas fa-check"></i>
                  {{
                    isSaving
                      ? "Salvando..."
                      : isEditing
                      ? "Atualizar"
                      : "Criar"
                  }}
                  Projeto
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </transition>

    <!-- Modal de Visualização do Projeto -->
    <div
      v-if="selectedProject"
      class="project-modal-overlay"
      @click="closeProjectModal"
    >
      <div class="project-modal-content" @click.stop>
        <button class="close-project-modal" @click="closeProjectModal">
          <i class="fas fa-times"></i>
        </button>

        <div class="project-modal-header">
          <img :src="selectedProject.thumbnail" :alt="selectedProject.title" />
          <div class="project-modal-category">
            {{ selectedProject.category }}
          </div>
        </div>

        <div class="project-modal-body">
          <h2>{{ selectedProject.title }}</h2>

          <div class="project-modal-meta">
            <div class="meta-item">
              <i class="fas fa-user"></i>
              <span>{{ selectedProject.client }}</span>
            </div>
            <div class="meta-item">
              <i class="fas fa-calendar"></i>
              <span>{{ selectedProject.year }}</span>
            </div>
          </div>

          <div class="project-modal-tech">
            <h4>Tecnologias</h4>
            <div class="tech-tags">
              <span
                v-for="(tech, i) in selectedProject.technologies"
                :key="i"
                class="tech-tag"
              >
                {{ tech }}
              </span>
            </div>
          </div>

          <div class="project-modal-section">
            <h4>O Desafio</h4>
            <p>{{ selectedProject.challenge }}</p>
          </div>

          <div v-if="selectedProject.solution.length > 0" class="project-modal-section">
            <h4>Nossa Solução</h4>
            <ul>
              <li v-for="(item, i) in selectedProject.solution" :key="i">
                {{ item }}
              </li>
            </ul>
          </div>

          <div v-if="selectedProject.results.length > 0" class="project-modal-section">
            <h4>Resultados</h4>
            <ul>
              <li v-for="(item, i) in selectedProject.results" :key="i">
                {{ item }}
              </li>
            </ul>
          </div>

          <div
            v-if="selectedProject.images && selectedProject.images.length > 0"
            class="project-modal-gallery"
          >
            <h4>Galeria</h4>
            <div class="gallery-grid">
              <img
                v-for="(image, index) in selectedProject.images"
                :key="index"
                :src="image"
                :alt="`${selectedProject.title} - Imagem ${index + 1}`"
              />
            </div>
          </div>

          <div class="project-modal-actions">
            <button class="btn-edit" @click="editProject(selectedProject)">
              <i class="fas fa-edit"></i> Editar Projeto
            </button>
            <button class="btn-delete" @click="deleteProject(selectedProject._id)">
              <i class="fas fa-trash"></i> Excluir Projeto
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal de Confirmação de Exclusão -->
    <div v-if="showDeleteModal" class="modal-overlay" @click="closeDeleteModal">
      <div class="modal-content delete-modal" @click.stop>
        <div class="modal-header">
          <h3>Confirmar Exclusão</h3>
          <button class="close-btn" @click="closeDeleteModal">
            <i class="fas fa-times"></i>
          </button>
        </div>
        <div class="modal-body">
          <p>
            Tem certeza que deseja excluir o projeto "<strong>{{
              projectToDelete?.title
            }}</strong
            >"?
          </p>
          <p class="warning-text">
            <i class="fas fa-exclamation-triangle"></i>
            Esta ação não pode ser desfeita.
          </p>
          <div class="form-actions">
            <button
              type="button"
              class="btn-secondary"
              @click="closeDeleteModal"
            >
              Cancelar
            </button>
            <button
              type="button"
              class="btn-danger"
              @click="confirmDelete"
              :disabled="isDeleting"
            >
              <span v-if="isDeleting">
                <i class="fas fa-spinner fa-spin"></i> Excluindo...
              </span>
              <span v-else> Excluir </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { useRecentProjectStore } from "@/stores/recentProjectStore";

export default defineComponent({
  name: "ProjectsManagement",

  data() {
    return {
      projectStore: useRecentProjectStore(),
      showModal: false,
      showDeleteModal: false,
      isEditing: false,
      isSaving: false,
      isDeleting: false,
      selectedProject: null,
      projectToDelete: null,
      currentStep: 1,
      thumbnailUrl: "",
      galleryImageUrl: "",
      showGalleryUpload: false,
      customTechInput: "",
      solutionInput: "",
      resultInput: "",
      availableTechnologies: [
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
        "CentOS"
      ],
      formData: {
        title: "",
        category: "",
        client: "",
        year: "",
        thumbnail: "",
        images: [],
        technologies: [],
        challenge: "",
        solution: [],
        results: [],
        liveUrl: "",
        githubUrl: "",
        published: false,
      },
    };
  },

  computed: {
    canProceedToNextStep() {
      if (this.currentStep === 1) {
        return !!(
          this.formData.title &&
          this.formData.category &&
          this.formData.client &&
          this.formData.year
        );
      }
      if (this.currentStep === 2) {
        return !!this.formData.thumbnail;
      }
      if (this.currentStep === 3) {
        return !!this.formData.challenge;
      }
      return true;
    },
  },

  mounted() {
    this.projectStore.fetchAllProjects();
  },

  methods: {
    // Step Navigation
    nextStep() {
      if (this.canProceedToNextStep && this.currentStep < 3) {
        this.currentStep++;
      }
    },

    previousStep() {
      if (this.currentStep > 1) {
        this.currentStep--;
      }
    },

    // Technologies
    toggleTechnology(tech) {
      const index = this.formData.technologies.indexOf(tech);
      if (index > -1) {
        // Se já está selecionado, remove
        this.formData.technologies.splice(index, 1);
      } else {
        // Se não está selecionado, adiciona
        this.formData.technologies.push(tech);
      }
    },

    addCustomTechnology() {
      if (this.customTechInput.trim()) {
        const customTech = this.customTechInput.trim();
        // Verifica se já não existe na lista
        if (!this.formData.technologies.includes(customTech)) {
          this.formData.technologies.push(customTech);
        }
        this.customTechInput = "";
      }
    },

    removeTechnology(index) {
      this.formData.technologies.splice(index, 1);
    },

    // Solution
    addSolution() {
      if (this.solutionInput.trim()) {
        this.formData.solution.push(this.solutionInput.trim());
        this.solutionInput = "";
      }
    },

    removeSolution(index) {
      this.formData.solution.splice(index, 1);
    },

    // Results
    addResult() {
      if (this.resultInput.trim()) {
        this.formData.results.push(this.resultInput.trim());
        this.resultInput = "";
      }
    },

    removeResult(index) {
      this.formData.results.splice(index, 1);
    },

    // Image Upload Handlers
    handleThumbnailUpload(event) {
      const target = event.target;
      const file = target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.formData.thumbnail = e.target?.result;
        };
        reader.readAsDataURL(file);
      }
    },

    addThumbnailFromUrl() {
      if (this.thumbnailUrl) {
        this.formData.thumbnail = this.thumbnailUrl;
        this.thumbnailUrl = "";
      }
    },

    removeThumbnail() {
      this.formData.thumbnail = "";
    },

    handleGalleryImageUpload(event) {
      const target = event.target;
      const file = target.files?.[0];
      if (file && this.formData.images.length < 3) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.formData.images.push(e.target?.result);
          this.showGalleryUpload = false;
        };
        reader.readAsDataURL(file);
      }
    },

    openGalleryUpload() {
      this.showGalleryUpload = true;
    },

    addGalleryImageFromUrl() {
      if (this.galleryImageUrl && this.formData.images.length < 3) {
        this.formData.images.push(this.galleryImageUrl);
        this.galleryImageUrl = "";
        this.showGalleryUpload = false;
      }
    },

    removeGalleryImage(index) {
      this.formData.images.splice(index, 1);
    },

    openCreateModal() {
      this.isEditing = false;
      this.currentStep = 1;
      this.formData = {
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
      this.showModal = true;
    },

    editProject(project) {
      this.isEditing = true;
      this.currentStep = 1;
      this.formData = {
        _id: project._id,
        title: project.title,
        category: project.category,
        client: project.client,
        year: project.year,
        thumbnail: project.thumbnail,
        images: [...project.images],
        technologies: [...project.technologies],
        challenge: project.challenge,
        solution: [...project.solution],
        results: [...project.results],
        liveUrl: project.liveUrl || "",
        githubUrl: project.githubUrl || "",
        published: project.published,
      };
      this.closeProjectModal();
      this.showModal = true;
    },

    async saveProject() {
      if (this.isSaving) return;

      this.isSaving = true;

      try {
        if (this.isEditing && this.formData._id) {
          await this.projectStore.updateProject(
            this.formData._id,
            this.formData
          );
        } else {
          const { _id, ...projectData } = this.formData;
          await this.projectStore.createProject(projectData);
        }

        this.closeModal();
        console.log(
          `Projeto ${this.isEditing ? "atualizado" : "criado"} com sucesso!`
        );
      } catch (error) {
        console.error("Erro ao salvar projeto:", error);
      } finally {
        this.isSaving = false;
      }
    },

    openProjectModal(project) {
      this.selectedProject = project;
    },

    closeProjectModal() {
      this.selectedProject = null;
    },

    deleteProject(projectId) {
      const project = this.projectStore.projects.find((p) => p._id === projectId);
      if (project) {
        this.projectToDelete = project;
        this.showDeleteModal = true;
      }
    },

    async confirmDelete() {
      if (!this.projectToDelete || this.isDeleting) return;

      this.isDeleting = true;

      try {
        await this.projectStore.deleteProject(this.projectToDelete._id);
        this.closeDeleteModal();
        this.closeProjectModal();
        console.log("Projeto excluído com sucesso!");
      } catch (error) {
        console.error("Erro ao excluir projeto:", error);
      } finally {
        this.isDeleting = false;
      }
    },

    async togglePublish(projectId) {
      try {
        await this.projectStore.togglePublish(projectId);
        console.log("Status de publicação alterado com sucesso!");
      } catch (error) {
        console.error("Erro ao alternar publicação:", error);
      }
    },

    closeModal() {
      this.showModal = false;
      this.currentStep = 1;
      this.thumbnailUrl = "";
      this.galleryImageUrl = "";
      this.showGalleryUpload = false;
      this.techInput = "";
      this.solutionInput = "";
      this.resultInput = "";
      this.formData = {
        title: "",
        category: "",
        client: "",
        year: "",
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
    },

    closeDeleteModal() {
      this.showDeleteModal = false;
      this.projectToDelete = null;
    },
  },
});
</script>

<style scoped>
/* Reusing styles from EventsManagement */
.projects-management {
  padding: 20px;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
}

.section-header h2 {
  font-size: 1.75rem;
  margin-bottom: 4px;
  color: var(--gray-900);
}

.subtitle {
  color: var(--gray-600);
  font-size: 0.95rem;
}

.btn-primary-new {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
}

.btn-primary-new:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(102, 126, 234, 0.6);
}

.btn-secondary-new {
  background: #f3f4f6;
  color: #374151;
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

.btn-secondary-new:hover {
  background: #e5e7eb;
}

.btn-success-new {
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  color: white;
  border: none;
  padding: 12px 32px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(16, 185, 129, 0.4);
}

.btn-success-new:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(16, 185, 129, 0.6);
}

.btn-success-new:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* Loading */
.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  gap: 16px;
}

.spinner {
  width: 48px;
  height: 48px;
  border: 4px solid #e5e7eb;
  border-top-color: #667eea;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.error-message {
  background: #fee;
  border: 1px solid #fcc;
  color: #c33;
  padding: 16px 20px;
  border-radius: 8px;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 12px;
}

.btn-close-error {
  margin-left: auto;
  background: none;
  border: none;
  color: #c33;
  cursor: pointer;
  font-size: 1.2rem;
  padding: 4px;
}

/* Projects Grid */
.projects-grid-dashboard {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 24px;
  margin-top: 24px;
}

.project-card-dashboard {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid var(--gray-200);
}

.project-card-dashboard:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.project-image-dashboard {
  position: relative;
  height: 200px;
  overflow: hidden;
}

.project-image-dashboard img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.project-card-dashboard:hover .project-image-dashboard img {
  transform: scale(1.05);
}

.project-category-badge {
  position: absolute;
  top: 12px;
  left: 12px;
  background: rgba(255, 255, 255, 0.95);
  color: var(--primary);
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 600;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

.project-status-badge {
  position: absolute;
  top: 12px;
  right: 12px;
  background: rgba(156, 163, 175, 0.95);
  color: white;
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 600;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

.project-status-badge.published {
  background: rgba(16, 185, 129, 0.95);
}

.project-content-dashboard {
  padding: 20px;
}

.project-content-dashboard h3 {
  margin-bottom: 12px;
  font-weight: 600;
  color: var(--gray-900);
  font-size: 1.2rem;
  line-height: 1.3;
}

.project-meta {
  display: flex;
  gap: 16px;
  margin-bottom: 12px;
  font-size: 0.9rem;
  color: var(--gray-600);
}

.project-meta span {
  display: flex;
  align-items: center;
  gap: 6px;
}

.project-meta i {
  color: var(--primary);
}

.tech-tags-dashboard {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 16px;
}

.tech-tag {
  background: var(--gray-100);
  color: var(--gray-700);
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 500;
}

.tech-tag.more {
  background: var(--primary);
  color: white;
}

.project-actions-dashboard {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.btn-edit,
.btn-delete,
.btn-publish {
  padding: 6px 12px;
  border: none;
  border-radius: 6px;
  font-size: 0.8rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  gap: 4px;
  flex: 1;
  justify-content: center;
}

.btn-edit {
  background: var(--info);
  color: white;
}

.btn-edit:hover {
  background: #1a6bc4;
}

.btn-delete {
  background: var(--danger);
  color: white;
}

.btn-delete:hover {
  background: #dc2626;
}

.btn-publish {
  background: var(--gray-300);
  color: var(--gray-700);
}

.btn-publish.published {
  background: var(--success);
  color: white;
}

.btn-publish:hover {
  opacity: 0.9;
}

/* Empty State */
.empty-state {
  text-align: center;
  padding: 80px 20px;
  color: var(--gray-500);
}

.empty-state i {
  font-size: 4rem;
  margin-bottom: 16px;
  opacity: 0.3;
}

.empty-state h3 {
  margin-bottom: 8px;
  color: var(--gray-700);
}

.empty-state p {
  margin-bottom: 24px;
}

/* Modal Transitions */
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.3s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

.modal-fade-enter-active .modal-container-new {
  animation: slideUp 0.3s ease;
}

@keyframes slideUp {
  from {
    transform: translateY(30px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

/* Modal Design */
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
.tech-input-container {
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  padding: 8px;
  transition: all 0.3s ease;
}

.tech-input-container:focus-within {
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.tech-tags-input {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  align-items: center;
}

.tech-tag-input {
  background: #667eea;
  color: white;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 0.85rem;
  display: flex;
  align-items: center;
  gap: 4px;
}

.tech-tag-input .remove-tech {
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
}

.tech-tag-input .remove-tech:hover {
  opacity: 0.8;
}

.tech-input {
  border: none;
  outline: none;
  flex: 1;
  min-width: 150px;
  padding: 4px 8px;
  font-size: 0.95rem;
}

/* Tecnologias Selecionadas */
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

/* Grid de Tecnologias */
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

/* Input para Tecnologia Customizada */
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

/* Scrollbar customizada para tech-grid */
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

/* Project Modal */
.project-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 20px;
}

.project-modal-content {
  background: white;
  border-radius: 12px;
  max-width: 800px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.3);
}

.close-project-modal {
  position: absolute;
  top: 16px;
  right: 16px;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 10;
  transition: background 0.3s;
}

.close-project-modal:hover {
  background: rgba(0, 0, 0, 0.9);
}

.project-modal-header {
  position: relative;
  height: 300px;
}

.project-modal-header img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.project-modal-category {
  position: absolute;
  top: 20px;
  left: 20px;
  background: rgba(255, 255, 255, 0.95);
  color: var(--primary);
  padding: 8px 16px;
  border-radius: 8px;
  font-weight: 600;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.project-modal-body {
  padding: 24px;
}

.project-modal-body h2 {
  margin-bottom: 16px;
  color: var(--gray-900);
  font-size: 1.8rem;
}

.project-modal-meta {
  display: flex;
  gap: 24px;
  margin-bottom: 24px;
  padding: 16px;
  background: var(--gray-50);
  border-radius: 8px;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--gray-700);
}

.meta-item i {
  color: var(--primary);
}

.project-modal-tech h4 {
  margin-bottom: 12px;
  color: var(--gray-800);
}

.project-modal-tech .tech-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 24px;
}

.project-modal-section {
  margin-bottom: 24px;
}

.project-modal-section h4 {
  margin-bottom: 12px;
  color: var(--gray-800);
}

.project-modal-section p {
  line-height: 1.6;
  color: var(--gray-700);
}

.project-modal-section ul {
  list-style: none;
  padding: 0;
}

.project-modal-section li {
  margin-bottom: 8px;
  padding-left: 24px;
  position: relative;
  color: var(--gray-700);
}

.project-modal-section li::before {
  content: "✓";
  position: absolute;
  left: 0;
  color: var(--primary);
  font-weight: bold;
}

.project-modal-gallery h4 {
  margin-bottom: 12px;
  color: var(--gray-800);
}

.gallery-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 12px;
}

.gallery-grid img {
  width: 100%;
  height: 120px;
  object-fit: cover;
  border-radius: 6px;
}

.project-modal-actions {
  display: flex;
  gap: 12px;
  margin-top: 24px;
  padding-top: 20px;
  border-top: 1px solid var(--gray-200);
}

.project-modal-actions .btn-edit,
.project-modal-actions .btn-delete {
  flex: 1;
  padding: 12px;
  font-size: 0.9rem;
}

/* Delete Modal */
.modal-overlay {
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
  z-index: 1001;
  padding: 20px;
}

.modal-content {
  background: white;
  border-radius: 12px;
  max-width: 500px;
  width: 100%;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.3);
}

.modal-header {
  padding: 20px;
  border-bottom: 1px solid #e5e7eb;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-header h3 {
  font-size: 1.25rem;
  color: #111827;
}

.close-btn {
  background: none;
  border: none;
  color: #6b7280;
  cursor: pointer;
  font-size: 1.25rem;
  padding: 4px;
}

.close-btn:hover {
  color: #111827;
}

.modal-body {
  padding: 20px;
}

.modal-body p {
  margin-bottom: 12px;
  color: #374151;
}

.warning-text {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #f59e0b;
  font-size: 0.9rem;
  margin-bottom: 20px;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}

.btn-secondary {
  background: #f3f4f6;
  color: #374151;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-secondary:hover {
  background: #e5e7eb;
}

.btn-danger {
  background: #ef4444;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-danger:hover:not(:disabled) {
  background: #dc2626;
}

.btn-danger:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* Responsive */
@media (max-width: 768px) {
  .section-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }

  .projects-grid-dashboard {
    grid-template-columns: 1fr;
  }

  .form-grid {
    grid-template-columns: 1fr;
  }

  .form-navigation {
    flex-direction: column-reverse;
  }

  .progress-steps {
    flex-wrap: wrap;
    gap: 8px;
  }

  .step-line {
    width: 40px;
    margin: 0 8px 24px;
  }

  .modal-container-new {
    max-width: 100%;
    max-height: 100vh;
    border-radius: 0;
  }

  .modal-body-new {
    padding: 20px;
  }

  .upload-options {
    flex-direction: column;
  }

  .upload-divider {
    display: none;
  }

  .gallery-grid-new {
    grid-template-columns: 1fr;
  }
}
</style>
