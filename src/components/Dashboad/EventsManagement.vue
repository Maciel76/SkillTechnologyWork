<template>
  <div class="events-management">
    <div class="section-header">
      <div>
        <h2>Gerenciamento de Eventos</h2>
        <p class="subtitle">Crie e gerencie eventos para seu público</p>
      </div>
      <button class="btn-primary-new" @click="openCreateModal">
        <i class="fas fa-plus"></i> Criar Evento
      </button>
    </div>

    <!-- Loading -->
    <div v-if="eventStore.loading" class="loading-container">
      <div class="spinner"></div>
      <p>Carregando eventos...</p>
    </div>

    <!-- Error -->
    <div v-if="eventStore.error && !eventStore.loading" class="error-message">
      <i class="fas fa-exclamation-circle"></i>
      {{ eventStore.error }}
      <button @click="eventStore.clearError" class="btn-close-error">
        <i class="fas fa-times"></i>
      </button>
    </div>

    <!-- Grid de Eventos -->
    <div class="events-grid-dashboard" v-if="!eventStore.loading">
      <div
        v-for="event in eventStore.events"
        :key="event._id"
        class="event-card-dashboard"
        @click="openEventModal(event)"
      >
        <div class="event-image-dashboard">
          <img :src="event.image" :alt="event.title" />
          <div class="event-date-dashboard">
            <span class="day">{{ event.day }}</span>
            <span class="month">{{ event.month }}</span>
          </div>
          <div class="event-status-badge" :class="`status-${event.status}`">
            {{ getStatusLabel(event.status) }}
          </div>
        </div>
        <div class="event-content-dashboard">
          <h3>{{ event.title }}</h3>
          <p class="event-description-dashboard">{{ event.description }}</p>
          <div class="event-details-dashboard">
            <div class="detail">
              <i class="fas fa-clock"></i>
              <span>{{ event.time }}</span>
            </div>
            <div class="detail">
              <i class="fas fa-map-marker-alt"></i>
              <span>{{ event.location }}</span>
            </div>
          </div>
          <div class="event-actions-dashboard">
            <button class="btn-edit" @click.stop="editEvent(event)">
              <i class="fas fa-edit"></i> Editar
            </button>
            <button class="btn-delete" @click.stop="deleteEvent(event._id)">
              <i class="fas fa-trash"></i> Excluir
            </button>
            <button
              class="btn-publish"
              :class="{ published: event.published }"
              @click.stop="togglePublish(event._id)"
            >
              <i
                class="fas"
                :class="event.published ? 'fa-eye-slash' : 'fa-eye'"
              ></i>
              {{ event.published ? "Despublicar" : "Publicar" }}
            </button>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-if="eventStore.events.length === 0" class="empty-state">
        <i class="fas fa-calendar-alt"></i>
        <h3>Nenhum evento cadastrado</h3>
        <p>Comece criando seu primeiro evento!</p>
        <button class="btn-primary-new" @click="openCreateModal">
          <i class="fas fa-plus"></i> Criar Evento
        </button>
      </div>
    </div>

    <!-- Modal de Criar/Editar Evento - NOVO DESIGN -->
    <transition name="modal-fade">
      <div v-if="showModal" class="modal-overlay-new" @click="closeModal">
        <div class="modal-container-new" @click.stop>
          <div class="modal-header-new">
            <div>
              <h2>{{ isEditing ? "Editar Evento" : "Criar Novo Evento" }}</h2>
              <p>Preencha as informações do seu evento</p>
            </div>
            <button class="close-btn-new" @click="closeModal">
              <i class="fas fa-times"></i>
            </button>
          </div>

          <div class="modal-body-new">
            <form @submit.prevent="saveEvent" class="event-form-new">
              <!-- Progress Steps -->
              <div class="progress-steps">
                <div class="step" :class="{ active: currentStep >= 1 }">
                  <div class="step-number">1</div>
                  <span>Imagem</span>
                </div>
                <div
                  class="step-line"
                  :class="{ active: currentStep >= 2 }"
                ></div>
                <div class="step" :class="{ active: currentStep >= 2 }">
                  <div class="step-number">2</div>
                  <span>Detalhes</span>
                </div>
                <div
                  class="step-line"
                  :class="{ active: currentStep >= 3 }"
                ></div>
                <div class="step" :class="{ active: currentStep >= 3 }">
                  <div class="step-number">3</div>
                  <span>Galeria</span>
                </div>
              </div>

              <!-- Step 1: Imagem Principal -->
              <div v-show="currentStep === 1" class="form-step">
                <h3>Imagem Principal do Evento</h3>
                <p class="step-description">
                  Escolha uma imagem que represente seu evento
                </p>

                <div class="image-upload-new">
                  <div v-if="formData.image" class="image-preview-new">
                    <img :src="formData.image" alt="Preview" />
                    <button
                      type="button"
                      class="btn-remove-image-new"
                      @click="removeMainImage"
                    >
                      <i class="fas fa-times"></i>
                    </button>
                  </div>
                  <div v-else class="upload-placeholder-new">
                    <i class="fas fa-cloud-upload-alt"></i>
                    <h4>Adicionar Imagem</h4>
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
                          @change="handleMainImageUpload"
                          hidden
                        />
                      </label>
                    </div>
                    <div class="upload-divider">ou</div>
                    <div class="upload-option">
                      <input
                        type="url"
                        v-model="imageUrl"
                        placeholder="Cole a URL da imagem"
                        class="url-input"
                      />
                      <button
                        type="button"
                        class="btn-add-url"
                        @click="addImageFromUrl"
                        :disabled="!imageUrl"
                      >
                        <i class="fas fa-link"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Step 2: Detalhes do Evento -->
              <div v-show="currentStep === 2" class="form-step">
                <h3>Detalhes do Evento</h3>
                <p class="step-description">
                  Informações sobre data, horário e local
                </p>

                <div class="form-grid">
                  <div class="form-group-new">
                    <label for="eventTitle">
                      <i class="fas fa-heading"></i>
                      Título do Evento *
                    </label>
                    <input
                      id="eventTitle"
                      type="text"
                      v-model="formData.title"
                      placeholder="Ex: Workshop de React Native"
                      required
                    />
                  </div>

                  <div class="form-group-new">
                    <label for="eventDate">
                      <i class="fas fa-calendar"></i>
                      Data do Evento *
                    </label>
                    <input
                      id="eventDate"
                      type="date"
                      v-model="formData.date"
                      required
                      @change="updateDateDisplay"
                    />
                  </div>

                  <div class="form-group-new">
                    <label for="eventTime">
                      <i class="fas fa-clock"></i>
                      Horário *
                    </label>
                    <input
                      id="eventTime"
                      type="text"
                      v-model="formData.time"
                      placeholder="Ex: 09:00 - 18:00"
                      required
                    />
                  </div>

                  <div class="form-group-new">
                    <label for="eventLocation">
                      <i class="fas fa-map-marker-alt"></i>
                      Local *
                    </label>
                    <input
                      id="eventLocation"
                      type="text"
                      v-model="formData.location"
                      placeholder="Ex: São Paulo, SP"
                      required
                    />
                  </div>

                  <div class="form-group-new full-width">
                    <label for="eventDescription">
                      <i class="fas fa-align-left"></i>
                      Descrição Curta *
                      <span class="char-counter"
                        >{{ formData.description.length }}/150</span
                      >
                    </label>
                    <textarea
                      id="eventDescription"
                      v-model="formData.description"
                      placeholder="Descrição que aparece no card do evento"
                      rows="3"
                      maxlength="150"
                      required
                    ></textarea>
                  </div>

                  <div class="form-group-new full-width">
                    <label for="eventFullDescription">
                      <i class="fas fa-file-alt"></i>
                      Descrição Completa
                    </label>
                    <textarea
                      id="eventFullDescription"
                      v-model="formData.fullDescription"
                      placeholder="Descrição detalhada que aparece ao visualizar o evento"
                      rows="5"
                    ></textarea>
                  </div>

                  <div class="form-group-new">
                    <label for="eventStatus">
                      <i class="fas fa-flag"></i>
                      Status
                    </label>
                    <select id="eventStatus" v-model="formData.status">
                      <option value="planejado">Planejado</option>
                      <option value="confirmado">Confirmado</option>
                      <option value="cancelado">Cancelado</option>
                      <option value="realizado">Realizado</option>
                    </select>
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

              <!-- Step 3: Galeria -->
              <div v-show="currentStep === 3" class="form-step">
                <h3>Galeria de Imagens</h3>
                <p class="step-description">
                  Adicione até 3 imagens para a galeria ({{
                    formData.gallery.length
                  }}/3)
                </p>

                <div class="gallery-grid-new">
                  <div
                    v-for="(image, index) in formData.gallery"
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

                  <!-- Add Gallery Image Button -->
                  <div
                    v-if="formData.gallery.length < 3"
                    class="gallery-add-new"
                    @click="openGalleryUpload"
                  >
                    <i class="fas fa-plus"></i>
                    <p>Adicionar Imagem</p>
                  </div>
                </div>

                <!-- Gallery Upload Options (Hidden until triggered) -->
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
                        !galleryImageUrl || formData.gallery.length >= 3
                      "
                    >
                      <i class="fas fa-link"></i>
                    </button>
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
                    isSaving ? "Salvando..." : isEditing ? "Atualizar" : "Criar"
                  }}
                  Evento
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </transition>

    <!-- Modal de Visualização do Evento -->
    <div
      v-if="selectedEvent"
      class="event-modal-overlay"
      @click="closeEventModal"
    >
      <div class="event-modal-content" @click.stop>
        <button class="close-event-modal" @click="closeEventModal">
          <i class="fas fa-times"></i>
        </button>

        <div class="event-modal-header">
          <img :src="selectedEvent.image" :alt="selectedEvent.title" />
          <div class="event-modal-date">
            <span class="day">{{ selectedEvent.day }}</span>
            <span class="month">{{ selectedEvent.month }}</span>
          </div>
        </div>

        <div class="event-modal-body">
          <h2>{{ selectedEvent.title }}</h2>

          <div class="event-modal-details">
            <div class="detail">
              <i class="fas fa-clock"></i>
              <span>{{ selectedEvent.time }}</span>
            </div>
            <div class="detail">
              <i class="fas fa-map-marker-alt"></i>
              <span>{{ selectedEvent.location }}</span>
            </div>
            <div class="detail">
              <i class="fas fa-calendar"></i>
              <span>{{ selectedEvent.fullDate }}</span>
            </div>
            <div class="detail">
              <i class="fas fa-info-circle"></i>
              <span
                class="status-badge"
                :class="`status-${selectedEvent.status}`"
              >
                {{ getStatusLabel(selectedEvent.status) }}
              </span>
            </div>
          </div>

          <div class="event-modal-description">
            <h4>Descrição do Evento</h4>
            <p>
              {{ selectedEvent.fullDescription || selectedEvent.description }}
            </p>
          </div>

          <div
            v-if="selectedEvent.gallery && selectedEvent.gallery.length > 0"
            class="event-modal-gallery"
          >
            <h4>Galeria</h4>
            <div class="gallery-grid">
              <img
                v-for="(image, index) in selectedEvent.gallery"
                :key="index"
                :src="image"
                :alt="`${selectedEvent.title} - Imagem ${index + 1}`"
              />
            </div>
          </div>

          <div class="event-modal-actions">
            <button class="btn-edit" @click="editEvent(selectedEvent)">
              <i class="fas fa-edit"></i> Editar Evento
            </button>
            <button class="btn-delete" @click="deleteEvent(selectedEvent._id)">
              <i class="fas fa-trash"></i> Excluir Evento
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
            Tem certeza que deseja excluir o evento "<strong>{{
              eventToDelete?.title
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
import { useEventStore } from "@/stores/eventStore";

export default defineComponent({
  name: "EventsManagement",

  data() {
    return {
      eventStore: useEventStore(),
      showModal: false,
      showDeleteModal: false,
      isEditing: false,
      isSaving: false,
      isDeleting: false,
      selectedEvent: null,
      eventToDelete: null,
      currentStep: 1,
      imageUrl: "",
      galleryImageUrl: "",
      showGalleryUpload: false,
      formData: {
        title: "",
        description: "",
        fullDescription: "",
        date: "",
        day: "",
        month: "",
        fullDate: "",
        time: "",
        location: "",
        image: "",
        gallery: [],
        status: "planejado",
        published: false,
      },
      months: [
        "JAN",
        "FEV",
        "MAR",
        "ABR",
        "MAI",
        "JUN",
        "JUL",
        "AGO",
        "SET",
        "OUT",
        "NOV",
        "DEZ",
      ],
      monthNames: [
        "Janeiro",
        "Fevereiro",
        "Março",
        "Abril",
        "Maio",
        "Junho",
        "Julho",
        "Agosto",
        "Setembro",
        "Outubro",
        "Novembro",
        "Dezembro",
      ],
    };
  },

  computed: {
    canProceedToNextStep() {
      if (this.currentStep === 1) {
        return !!this.formData.image;
      }
      if (this.currentStep === 2) {
        return !!(
          this.formData.title &&
          this.formData.date &&
          this.formData.time &&
          this.formData.location &&
          this.formData.description
        );
      }
      return true;
    },
  },

  mounted() {
    // Carregar eventos ao montar o componente
    this.eventStore.fetchAllEvents();
  },

  methods: {
    getStatusLabel(status) {
      const labels = {
        planejado: "Planejado",
        confirmado: "Confirmado",
        cancelado: "Cancelado",
        realizado: "Realizado",
      };
      return labels[status] || status;
    },

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

    // Image Upload Handlers
    handleMainImageUpload(event) {
      const target = event.target;
      const file = target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.formData.image = e.target?.result;
        };
        reader.readAsDataURL(file);
      }
    },

    addImageFromUrl() {
      if (this.imageUrl) {
        this.formData.image = this.imageUrl;
        this.imageUrl = "";
      }
    },

    removeMainImage() {
      this.formData.image = "";
    },

    handleGalleryImageUpload(event) {
      const target = event.target;
      const file = target.files?.[0];
      if (file && this.formData.gallery.length < 3) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.formData.gallery.push(e.target?.result);
          this.showGalleryUpload = false;
        };
        reader.readAsDataURL(file);
      }
    },

    openGalleryUpload() {
      this.showGalleryUpload = true;
    },

    addGalleryImageFromUrl() {
      if (this.galleryImageUrl && this.formData.gallery.length < 3) {
        this.formData.gallery.push(this.galleryImageUrl);
        this.galleryImageUrl = "";
        this.showGalleryUpload = false;
      }
    },

    removeGalleryImage(index) {
      this.formData.gallery.splice(index, 1);
    },

    openCreateModal() {
      this.isEditing = false;
      this.currentStep = 1;
      this.formData = {
        title: "",
        description: "",
        fullDescription: "",
        date: new Date().toISOString().split("T")[0],
        day: "",
        month: "",
        fullDate: "",
        time: "",
        location: "",
        image: "",
        gallery: [],
        status: "planejado",
        published: false,
      };
      this.updateDateDisplay();
      this.showModal = true;
    },

    editEvent(event) {
      this.isEditing = true;
      this.currentStep = 1;
      this.formData = {
        _id: event._id,
        title: event.title,
        description: event.description,
        fullDescription: event.fullDescription || "",
        date: event.date.split("T")[0],
        day: event.day,
        month: event.month,
        fullDate: event.fullDate,
        time: event.time,
        location: event.location,
        image: event.image,
        gallery: [...event.gallery],
        status: event.status,
        published: event.published,
      };
      this.closeEventModal();
      this.showModal = true;
    },

    async saveEvent() {
      if (this.isSaving) return;

      this.updateDateDisplay();
      this.isSaving = true;

      try {
        if (this.isEditing && this.formData._id) {
          await this.eventStore.updateEvent(this.formData._id, this.formData);
        } else {
          const { _id, ...eventData } = this.formData;
          await this.eventStore.createEvent(eventData);
        }

        this.closeModal();
        console.log(
          `Evento ${this.isEditing ? "atualizado" : "criado"} com sucesso!`
        );
      } catch (error) {
        console.error("Erro ao salvar evento:", error);
      } finally {
        this.isSaving = false;
      }
    },

    updateDateDisplay() {
      if (this.formData.date) {
        const date = new Date(this.formData.date + "T00:00:00");
        this.formData.day = date.getDate().toString().padStart(2, "0");
        this.formData.month = this.months[date.getMonth()];
        this.formData.fullDate = `${date.getDate()} de ${
          this.monthNames[date.getMonth()]
        } de ${date.getFullYear()}`;
      }
    },

    openEventModal(event) {
      this.selectedEvent = event;
    },

    closeEventModal() {
      this.selectedEvent = null;
    },

    deleteEvent(eventId) {
      const event = this.eventStore.events.find((e) => e._id === eventId);
      if (event) {
        this.eventToDelete = event;
        this.showDeleteModal = true;
      }
    },

    async confirmDelete() {
      if (!this.eventToDelete || this.isDeleting) return;

      this.isDeleting = true;

      try {
        await this.eventStore.deleteEvent(this.eventToDelete._id);
        this.closeDeleteModal();
        this.closeEventModal();
        console.log("Evento excluído com sucesso!");
      } catch (error) {
        console.error("Erro ao excluir evento:", error);
      } finally {
        this.isDeleting = false;
      }
    },

    async togglePublish(eventId) {
      try {
        await this.eventStore.togglePublish(eventId);
        console.log("Status de publicação alterado com sucesso!");
      } catch (error) {
        console.error("Erro ao alternar publicação:", error);
      }
    },

    closeModal() {
      this.showModal = false;
      this.currentStep = 1;
      this.imageUrl = "";
      this.galleryImageUrl = "";
      this.showGalleryUpload = false;
      this.formData = {
        title: "",
        description: "",
        fullDescription: "",
        date: "",
        day: "",
        month: "",
        fullDate: "",
        time: "",
        location: "",
        image: "",
        gallery: [],
        status: "planejado",
        published: false,
      };
    },

    closeDeleteModal() {
      this.showDeleteModal = false;
      this.eventToDelete = null;
    },
  },
});
</script>

<style scoped>
.events-management {
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

/* New Button Style */
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

/* New Modal Design */
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

/* Image Upload - New Design */
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

.char-counter {
  margin-left: auto;
  color: #9ca3af;
  font-size: 0.85rem;
  font-weight: 400;
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

/* Form Navigation */
.form-navigation {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  margin-top: 32px;
  padding-top: 24px;
  border-top: 1px solid #e5e7eb;
}

/* Loading & Error States */
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

/* Status Badge */
.event-status-badge {
  position: absolute;
  top: 12px;
  left: 12px;
  padding: 4px 12px;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  background: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.status-planejado {
  color: #3b82f6;
  border: 1px solid #3b82f6;
}

.status-confirmado {
  color: #10b981;
  border: 1px solid #10b981;
}

.status-cancelado {
  color: #ef4444;
  border: 1px solid #ef4444;
}

.status-realizado {
  color: #6b7280;
  border: 1px solid #6b7280;
}

.status-badge {
  display: inline-block;
  padding: 4px 12px;
  border-radius: 4px;
  font-size: 0.85rem;
  font-weight: 600;
}

.warning-text {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #f59e0b;
  font-size: 0.9rem;
  margin-top: 12px;
}

/* Grid de Eventos no Dashboard */
.events-grid-dashboard {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 24px;
  margin-top: 24px;
}

.event-card-dashboard {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid var(--gray-200);
}

.event-card-dashboard:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.event-image-dashboard {
  position: relative;
  height: 200px;
  overflow: hidden;
}

.event-image-dashboard img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.event-card-dashboard:hover .event-image-dashboard img {
  transform: scale(1.05);
}

.event-date-dashboard {
  position: absolute;
  top: 12px;
  right: 12px;
  background: var(--primary);
  color: white;
  padding: 8px 12px;
  border-radius: 8px;
  text-align: center;
  min-width: 60px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
}

.event-date-dashboard .day {
  display: block;
  font-size: 1.5rem;
  font-weight: 700;
  line-height: 1;
}

.event-date-dashboard .month {
  display: block;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  margin-top: 2px;
}

.event-content-dashboard {
  padding: 20px;
}

.event-content-dashboard h3 {
  margin-bottom: 8px;
  font-weight: 600;
  color: var(--gray-900);
  font-size: 1.2rem;
  line-height: 1.3;
}

.event-description-dashboard {
  color: var(--gray-600);
  margin-bottom: 16px;
  line-height: 1.5;
  font-size: 0.95rem;
}

.event-details-dashboard {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 16px;
}

.event-details-dashboard .detail {
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--gray-600);
  font-size: 0.9rem;
}

.event-details-dashboard .detail i {
  width: 16px;
  color: var(--primary);
}

.event-actions-dashboard {
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

/* Modal de Visualização do Evento */
.event-modal-overlay {
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

.event-modal-content {
  background: white;
  border-radius: 12px;
  max-width: 600px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.3);
}

.close-event-modal {
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

.close-event-modal:hover {
  background: rgba(0, 0, 0, 0.9);
}

.event-modal-header {
  position: relative;
  height: 300px;
}

.event-modal-header img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.event-modal-date {
  position: absolute;
  top: 20px;
  right: 20px;
  background: var(--primary);
  color: white;
  padding: 12px 16px;
  border-radius: 8px;
  text-align: center;
  min-width: 70px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.event-modal-date .day {
  display: block;
  font-size: 1.8rem;
  font-weight: 700;
  line-height: 1;
}

.event-modal-date .month {
  display: block;
  font-size: 0.9rem;
  font-weight: 600;
  text-transform: uppercase;
  margin-top: 4px;
}

.event-modal-body {
  padding: 24px;
}

.event-modal-body h2 {
  margin-bottom: 16px;
  color: var(--gray-900);
  font-size: 1.8rem;
}

.event-modal-details {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 24px;
  padding: 16px;
  background: var(--gray-50);
  border-radius: 8px;
}

.event-modal-details .detail {
  display: flex;
  align-items: center;
  gap: 12px;
  color: var(--gray-700);
  font-size: 1rem;
}

.event-modal-details .detail i {
  width: 20px;
  color: var(--primary);
}

.event-modal-description {
  margin-bottom: 24px;
}

.event-modal-description h4 {
  margin-bottom: 8px;
  color: var(--gray-800);
}

.event-modal-description p {
  line-height: 1.6;
  color: var(--gray-700);
}

.event-modal-gallery h4 {
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

.event-modal-actions {
  display: flex;
  gap: 12px;
  margin-top: 24px;
  padding-top: 20px;
  border-top: 1px solid var(--gray-200);
}

.event-modal-actions .btn-edit,
.event-modal-actions .btn-delete {
  flex: 1;
  padding: 12px;
  font-size: 0.9rem;
}

/* Responsive */
@media (max-width: 768px) {
  .section-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }

  .events-grid-dashboard {
    grid-template-columns: 1fr;
  }

  .event-actions-dashboard {
    flex-direction: column;
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
