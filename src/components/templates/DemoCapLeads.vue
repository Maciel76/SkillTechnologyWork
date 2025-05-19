<template>
  <div class="landing-page">
    <!-- Header/Navbar -->
    <header class="header">
      <div class="container">
        <div class="logo">
          <iconify-icon
            icon="heroicons:building-office-2"
            width="40"
            height="40"
          />
          <span class="logo-text">Skyline Residences</span>
        </div>
        <nav class="nav">
          <PrimeButton
            label="Plantas"
            class="p-button-text"
            @click="scrollTo('floor-plans')"
          />
          <Button
            label="Localização"
            class="p-button-text"
            @click="scrollTo('location')"
          />
          <Button
            label="Tour Virtual"
            class="p-button-text"
            @click="scrollTo('virtual-tour')"
          />
          <Button
            label="Financiamento"
            class="p-button-text"
            @click="scrollTo('financing')"
          />
          <Button
            label="Agendar Visita"
            class="p-button-rounded p-button-raised"
            @click="showLeadForm = true"
          />
        </nav>
      </div>
    </header>

    <!-- Hero Section -->
    <section class="hero">
      <div class="hero-content">
        <h1 class="hero-title">Viva no alto padrão que você merece</h1>
        <p class="hero-subtitle">
          Apartamentos de 2 a 4 quartos com vista para o mar na região mais
          nobre da cidade
        </p>
        <div class="hero-buttons">
          <Button
            label="Ver Disponíveis"
            class="p-button-rounded"
            @click="scrollTo('units')"
          />
          <Button
            label="Tour Virtual"
            icon="pi pi-video"
            class="p-button-rounded p-button-outlined"
            @click="scrollTo('virtual-tour')"
          />
        </div>
      </div>
      <div class="hero-image">
        <iconify-icon
          icon="heroicons:building-office"
          width="400"
          height="400"
        />
      </div>
    </section>

    <!-- Features Section -->
    <section class="features">
      <div class="container">
        <h2 class="section-title">Descubra o Skyline Residences</h2>
        <p class="section-subtitle">
          Um conceito exclusivo de moradia com alto padrão de acabamento e lazer
          completo
        </p>

        <div class="feature-cards">
          <Card
            class="feature-card"
            v-for="(feature, index) in features"
            :key="index"
          >
            <template #header>
              <div class="feature-icon">
                <iconify-icon :icon="feature.icon" width="40" height="40" />
              </div>
            </template>
            <template #title>
              {{ feature.title }}
            </template>
            <template #content>
              <p>{{ feature.description }}</p>
            </template>
          </Card>
        </div>
      </div>
    </section>

    <!-- Virtual Tour Section -->
    <section class="virtual-tour" id="virtual-tour">
      <div class="container">
        <h2 class="section-title">Tour Virtual 360°</h2>
        <p class="section-subtitle">
          Explore nosso empreendimento sem sair de casa
        </p>

        <div class="tour-container">
          <div class="tour-viewer">
            <div class="tour-placeholder">
              <iconify-icon
                icon="heroicons:video-camera"
                width="60"
                height="60"
              />
              <p>Clique para iniciar o tour virtual</p>
            </div>
          </div>
          <div class="tour-options">
            <div
              class="tour-option"
              v-for="(tour, index) in tours"
              :key="index"
              @click="selectTour(tour)"
            >
              <iconify-icon :icon="tour.icon" width="100%" height="100%" />
              <span>{{ tour.name }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Floor Plans Section -->
    <section class="floor-plans" id="floor-plans">
      <div class="container">
        <h2 class="section-title">Plantas Personalizadas</h2>
        <p class="section-subtitle">
          Escolha o layout perfeito para seu novo lar
        </p>

        <TabView class="floor-tabs">
          <TabPanel
            v-for="(plan, index) in floorPlans"
            :key="index"
            :header="plan.type"
          >
            <div class="plan-container">
              <div class="plan-image">
                <iconify-icon :icon="plan.icon" width="100%" height="300" />
              </div>
              <div class="plan-details">
                <h3>{{ plan.type }}</h3>
                <p class="plan-description">{{ plan.description }}</p>
                <div class="plan-specs">
                  <div
                    class="spec"
                    v-for="(spec, specIndex) in plan.specs"
                    :key="specIndex"
                  >
                    <iconify-icon :icon="spec.icon" width="20" height="20" />
                    <span>{{ spec.value }}</span>
                    <small>{{ spec.label }}</small>
                  </div>
                </div>
                <div class="plan-actions">
                  <Button
                    label="Ver Disponibilidade"
                    class="p-button-rounded"
                    @click="showUnits(plan.type)"
                  />
                  <Button
                    label="Simular Financiamento"
                    class="p-button-rounded p-button-outlined"
                    @click="showFinancingCalculator(plan)"
                  />
                </div>
              </div>
            </div>
          </TabPanel>
        </TabView>
      </div>
    </section>

    <!-- Available Units Section -->
    <section class="available-units" id="units" v-if="selectedPlanType">
      <div class="container">
        <h2 class="section-title">
          Unidades Disponíveis - {{ selectedPlanType }}
        </h2>
        <p class="section-subtitle">Confira as opções e reserve a sua</p>

        <DataTable
          :value="filteredUnits"
          responsiveLayout="scroll"
          class="units-table"
        >
          <Column field="unit" header="Unidade"></Column>
          <Column field="floor" header="Andar"></Column>
          <Column field="area" header="Área (m²)"></Column>
          <Column field="price" header="Preço">
            <template #body="slotProps">
              {{ formatCurrency(slotProps.data.price) }}
            </template>
          </Column>
          <Column header="Ações">
            <template #body="slotProps">
              <Button
                icon="pi pi-eye"
                class="p-button-rounded p-button-text"
                @click="viewUnitDetails(slotProps.data)"
              />
              <Button
                label="Reservar"
                class="p-button-rounded p-button-sm"
                @click="reserveUnit(slotProps.data)"
              />
            </template>
          </Column>
        </DataTable>
      </div>
    </section>

    <!-- Financing Calculator -->
    <section class="financing" id="financing">
      <div class="container">
        <h2 class="section-title">Simulador de Financiamento</h2>
        <p class="section-subtitle">
          Calcule suas parcelas e condições de pagamento
        </p>

        <div class="calculator-container">
          <div class="calculator-form">
            <div class="p-fluid">
              <div class="p-field">
                <label for="propertyValue">Valor do Imóvel</label>
                <InputNumber
                  id="propertyValue"
                  v-model="financing.propertyValue"
                  mode="currency"
                  currency="BRL"
                  locale="pt-BR"
                />
              </div>
              <div class="p-field">
                <label for="downPayment">Entrada</label>
                <InputNumber
                  id="downPayment"
                  v-model="financing.downPayment"
                  mode="currency"
                  currency="BRL"
                  locale="pt-BR"
                />
              </div>
              <div class="p-field">
                <label for="term">Prazo (anos)</label>
                <InputNumber
                  id="term"
                  v-model="financing.term"
                  :min="5"
                  :max="35"
                />
              </div>
              <div class="p-field">
                <label for="interestRate">Taxa de Juros (% a.a.)</label>
                <InputNumber
                  id="interestRate"
                  v-model="financing.interestRate"
                  :min="5"
                  :max="15"
                  :step="0.5"
                  suffix="%"
                />
              </div>
              <Button
                label="Calcular"
                class="p-button-rounded"
                @click="calculateFinancing"
              />
            </div>
          </div>
          <div class="calculator-results" v-if="financingResults">
            <div class="result-card">
              <h3>Resultado da Simulação</h3>
              <div class="result-item">
                <span>Valor Financiado</span>
                <strong>{{
                  formatCurrency(financingResults.financedAmount)
                }}</strong>
              </div>
              <div class="result-item">
                <span>Parcela Mensal</span>
                <strong>{{
                  formatCurrency(financingResults.monthlyPayment)
                }}</strong>
              </div>
              <div class="result-item">
                <span>Total a Pagar</span>
                <strong>{{
                  formatCurrency(financingResults.totalAmount)
                }}</strong>
              </div>
              <div class="result-item">
                <span>Total de Juros</span>
                <strong>{{
                  formatCurrency(financingResults.totalInterest)
                }}</strong>
              </div>
            </div>
            <div class="result-actions">
              <Button
                label="Salvar Simulação"
                class="p-button-rounded p-button-outlined"
              />
              <Button
                label="Falar com Corretor"
                class="p-button-rounded"
                @click="showLeadForm = true"
              />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Location Map -->
    <section class="location" id="location">
      <div class="container">
        <h2 class="section-title">Localização Privilegiada</h2>
        <p class="section-subtitle">
          No coração da cidade, com fácil acesso a tudo
        </p>

        <div class="map-container">
          <div class="map-placeholder">
            <iconify-icon icon="heroicons:map" width="60" height="60" />
            <p>Mapa interativo da localização</p>
          </div>
          <div class="location-features">
            <div
              class="location-feature"
              v-for="(item, index) in locationFeatures"
              :key="index"
            >
              <iconify-icon :icon="item.icon" width="24" height="24" />
              <div>
                <h4>{{ item.title }}</h4>
                <p>{{ item.description }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Testimonials -->
    <section class="testimonials">
      <div class="container">
        <h2 class="section-title">O que dizem nossos clientes</h2>
        <p class="section-subtitle">
          Depoimentos de quem já escolheu o Skyline Residences
        </p>

        <Carousel
          :value="testimonials"
          :numVisible="3"
          :numScroll="1"
          :responsiveOptions="carouselResponsiveOptions"
          circular
        >
          <template #item="slotProps">
            <div class="testimonial-card">
              <div class="testimonial-content">
                <div class="testimonial-rating">
                  <iconify-icon
                    icon="heroicons:star"
                    width="16"
                    height="16"
                    v-for="n in 5"
                    :key="n"
                  />
                </div>
                <p>{{ slotProps.data.text }}</p>
              </div>
              <div class="testimonial-author">
                <iconify-icon
                  icon="heroicons:user-circle"
                  width="50"
                  height="50"
                />
                <div class="author-info">
                  <strong>{{ slotProps.data.name }}</strong>
                  <span>{{ slotProps.data.role }}</span>
                </div>
              </div>
            </div>
          </template>
        </Carousel>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="cta">
      <div class="container">
        <div class="cta-content">
          <h2 class="cta-title">Pronto para morar no Skyline Residences?</h2>
          <p class="cta-subtitle">
            Agende uma visita ou fale com um de nossos corretores
          </p>
          <div class="cta-buttons">
            <Button
              label="Agendar Visita"
              class="p-button-rounded p-button-raised"
              @click="showLeadForm = true"
            />
            <Button
              label="Ligar Agora"
              icon="pi pi-phone"
              class="p-button-rounded p-button-outlined"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="footer">
      <div class="container">
        <div class="footer-content">
          <div class="footer-logo">
            <iconify-icon
              icon="heroicons:building-office-2"
              width="30"
              height="30"
            />
            <span class="logo-text">Skyline Residences</span>
          </div>
          <div class="footer-links">
            <div class="link-group">
              <h4>Empreendimento</h4>
              <a href="#">Sobre o Skyline</a>
              <a href="#">Plantas</a>
              <a href="#">Localização</a>
              <a href="#">Tour Virtual</a>
            </div>
            <div class="link-group">
              <h4>Contato</h4>
              <a href="#">Fale Conosco</a>
              <a href="#">Trabalhe Conosco</a>
              <a href="#">Seja um Corretor</a>
            </div>
            <div class="link-group">
              <h4>Legal</h4>
              <a href="#">Termos de Uso</a>
              <a href="#">Política de Privacidade</a>
            </div>
          </div>
          <div class="footer-social">
            <h4>Siga-nos</h4>
            <div class="social-icons">
              <Button
                icon="pi pi-facebook"
                class="p-button-rounded p-button-text"
              />
              <Button
                icon="pi pi-instagram"
                class="p-button-rounded p-button-text"
              />
              <Button
                icon="pi pi-youtube"
                class="p-button-rounded p-button-text"
              />
              <Button
                icon="pi pi-linkedin"
                class="p-button-rounded p-button-text"
              />
            </div>
            <div class="footer-contact">
              <p>
                <iconify-icon icon="heroicons:phone" width="16" height="16" />
                (11) 99999-9999
              </p>
              <p>
                <iconify-icon
                  icon="heroicons:envelope"
                  width="16"
                  height="16"
                />
                contato@skyline.com.br
              </p>
            </div>
          </div>
        </div>
        <div class="footer-bottom">
          <p>© 2023 Skyline Residences. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>

    <!-- Lead Capture Dialog -->
    <CustomDialog
      v-model:visible="showLeadForm"
      modal
      header="Agendar Visita"
      :style="{ width: '50vw' }"
    >
      <div class="lead-form">
        <Steps :model="leadSteps" :readonly="false" />

        <div class="step-content">
          <!-- Step 1: Personal Info -->
          <div v-if="currentLeadStep === 0" class="step-personal">
            <div class="p-fluid">
              <div class="p-field">
                <label for="leadName">Nome Completo*</label>
                <InputText id="leadName" v-model="lead.name" required />
              </div>
              <div class="p-field">
                <label for="leadEmail">E-mail*</label>
                <InputText
                  id="leadEmail"
                  v-model="lead.email"
                  required
                  type="email"
                />
              </div>
              <div class="p-field">
                <label for="leadPhone">Telefone*</label>
                <InputMask
                  id="leadPhone"
                  v-model="lead.phone"
                  mask="(99) 99999-9999"
                  required
                />
              </div>
            </div>
          </div>

          <!-- Step 2: Interest Info -->
          <div v-if="currentLeadStep === 1" class="step-interest">
            <div class="p-fluid">
              <div class="p-field">
                <label for="leadInterest">Tipo de Imóvel de Interesse</label>
                <Dropdown
                  id="leadInterest"
                  v-model="lead.interest"
                  :options="propertyTypes"
                  optionLabel="name"
                  placeholder="Selecione"
                />
              </div>
              <div class="p-field">
                <label for="leadBudget">Faixa de Valor</label>
                <Dropdown
                  id="leadBudget"
                  v-model="lead.budget"
                  :options="budgetRanges"
                  optionLabel="name"
                  placeholder="Selecione"
                />
              </div>
              <div class="p-field">
                <label for="leadTimeframe">Quando pretende comprar?</label>
                <Dropdown
                  id="leadTimeframe"
                  v-model="lead.timeframe"
                  :options="timeframes"
                  optionLabel="name"
                  placeholder="Selecione"
                />
              </div>
            </div>
          </div>

          <!-- Step 3: Visit Info -->
          <div v-if="currentLeadStep === 2" class="step-visit">
            <div class="p-fluid">
              <div class="p-field">
                <label for="leadDate">Data da Visita*</label>
                <Calendar
                  id="leadDate"
                  v-model="lead.visitDate"
                  :minDate="minVisitDate"
                  required
                />
              </div>
              <div class="p-field">
                <label for="leadTime">Horário Preferencial*</label>
                <Dropdown
                  id="leadTime"
                  v-model="lead.visitTime"
                  :options="visitTimes"
                  required
                />
              </div>
              <div class="p-field">
                <label for="leadMessage">Mensagem ou Observações</label>
                <PrimeTextarea
                  id="leadMessage"
                  v-model="lead.message"
                  rows="3"
                />
              </div>
            </div>
          </div>
        </div>

        <div class="step-actions">
          <Button
            label="Voltar"
            class="p-button-text"
            @click="prevLeadStep"
            :disabled="currentLeadStep === 0"
          />
          <Button
            v-if="currentLeadStep < leadSteps.length - 1"
            label="Próximo"
            class="p-button-rounded"
            @click="nextLeadStep"
          />
          <Button
            v-else
            label="Enviar"
            class="p-button-rounded"
            @click="submitLeadForm"
          />
        </div>
      </div>
    </CustomDialog>

    <!-- Unit Details Dialog -->
    <CustomDialog
      v-model:visible="showUnitDetails"
      modal
      header="Detalhes da Unidade"
      :style="{ width: '60vw' }"
    >
      <div class="unit-details" v-if="selectedUnit">
        <div class="unit-gallery">
          <Galleria
            :value="selectedUnit.images"
            :responsiveOptions="galleriaResponsiveOptions"
            :numVisible="5"
            containerStyle="max-width: 100%"
          >
            <template #item>
              <iconify-icon icon="heroicons:photo" width="100%" height="300" />
            </template>
            <template #thumbnail>
              <iconify-icon icon="heroicons:photo" width="50" height="50" />
            </template>
          </Galleria>
        </div>
        <div class="unit-info">
          <h3>{{ selectedUnit.unit }}</h3>
          <div class="unit-specs">
            <div class="spec">
              <iconify-icon
                icon="heroicons:building-office"
                width="20"
                height="20"
              />
              <span>Torre {{ selectedUnit.tower }}</span>
            </div>
            <div class="spec">
              <iconify-icon icon="heroicons:map-pin" width="20" height="20" />
              <span>Andar {{ selectedUnit.floor }}</span>
            </div>
            <div class="spec">
              <iconify-icon icon="heroicons:ruler" width="20" height="20" />
              <span>{{ selectedUnit.area }} m²</span>
            </div>
            <div class="spec">
              <iconify-icon icon="heroicons:home" width="20" height="20" />
              <span>{{ selectedUnit.bedrooms }} quartos</span>
            </div>
            <div class="spec">
              <iconify-icon
                icon="heroicons:currency-dollar"
                width="20"
                height="20"
              />
              <span>{{ formatCurrency(selectedUnit.price) }}</span>
            </div>
          </div>
          <div class="unit-description">
            <p>{{ selectedUnit.description }}</p>
          </div>
          <div class="unit-actions">
            <Button
              label="Reservar Unidade"
              class="p-button-rounded"
              @click="reserveUnit(selectedUnit)"
            />
            <Button
              label="Simular Financiamento"
              class="p-button-rounded p-button-outlined"
              @click="showFinancingCalculatorForUnit(selectedUnit)"
            />
          </div>
        </div>
      </div>
    </CustomDialog>
    <!-- Removed invalid closing tag -->

    <!-- Floating WhatsApp Button -->
    <div class="whatsapp-float">
      <Button
        icon="pi pi-whatsapp"
        class="p-button-rounded p-button-success"
        @click="openWhatsApp"
      />
    </div>
  </div>
</template>
<script>
import { ref, computed } from "vue";

export default {
  components: {
    PrimeButton,
    Card,
    TabView,
    TabPanel,
    DataTable,
    Column,
    InputNumber,
    CustomDialog,
    Steps,
    InputText,
    InputMask,
    Dropdown,
    Calendar,
    PrimeTextarea,
    Carousel,
    Galleria,
  },
  setup() {
    // Dados das features (atualizado com ícones Heroicons)
    const features = ref([
      {
        icon: "heroicons:star",
        title: "Acabamento Premium",
        description:
          "Materiais de primeira qualidade e design exclusivo em todos os ambientes",
      },
      {
        icon: "heroicons:shield-check",
        title: "Segurança 24h",
        description:
          "Sistema de segurança completo com monitoramento e controle de acesso",
      },
      {
        icon: "heroicons:heart",
        title: "Áreas de Lazer",
        description:
          "Piscina, academia, salão de festas, playground e muito mais",
      },
      {
        icon: "heroicons:truck",
        title: "Vagas Garantidas",
        description:
          "Vagas de garagem cobertas e demarcadas para todos os apartamentos",
      },
    ]);

    // Tours virtuais (atualizado com ícones Heroicons)
    const tours = ref([
      {
        id: 1,
        name: "Hall de Entrada",
        icon: "heroicons:building-office",
      },
      {
        id: 2,
        name: "Área de Lazer",
        icon: "heroicons:sparkles",
      },
      {
        id: 3,
        name: "Apartamento Modelo",
        icon: "heroicons:home-modern",
      },
      {
        id: 4,
        name: "Vizinhança",
        icon: "heroicons:map",
      },
    ]);

    // Plantas disponíveis (atualizado com ícones Heroicons)
    const floorPlans = ref([
      {
        type: "2 Quartos",
        icon: "heroicons:home",
        description:
          "Apartamentos de 2 quartos com 72m², sendo 1 suíte, varanda gourmet e espaço home office integrado.",
        specs: [
          { icon: "heroicons:ruler", value: "72", label: "m²" },
          { icon: "heroicons:home", value: "2", label: "quartos" },
          { icon: "heroicons:sparkles", value: "2", label: "banheiros" },
          { icon: "heroicons:truck", value: "1", label: "vaga" },
        ],
        basePrice: 850000,
      },
      {
        type: "3 Quartos",
        icon: "heroicons:home-modern",
        description:
          "Apartamentos de 3 quartos com 98m², sendo 2 suítes, varanda gourmet e lavabo.",
        specs: [
          { icon: "heroicons:ruler", value: "98", label: "m²" },
          { icon: "heroicons:home", value: "3", label: "quartos" },
          { icon: "heroicons:sparkles", value: "3", label: "banheiros" },
          { icon: "heroicons:truck", value: "2", label: "vagas" },
        ],
        basePrice: 1200000,
      },
      {
        type: "4 Quartos",
        icon: "heroicons:building-office",
        description:
          "Apartamentos de 4 quartos com 135m², sendo 3 suítes, varanda gourmet, lavabo e dependência completa.",
        specs: [
          { icon: "heroicons:ruler", value: "135", label: "m²" },
          { icon: "heroicons:home", value: "4", label: "quartos" },
          { icon: "heroicons:sparkles", value: "5", label: "banheiros" },
          { icon: "heroicons:truck", value: "3", label: "vagas" },
        ],
        basePrice: 1850000,
      },
    ]);

    // Unidades disponíveis (removidas referências a imagens)
    const units = ref([
      {
        id: 201,
        unit: "201A",
        tower: "A",
        floor: "2",
        type: "2 Quartos",
        area: 72,
        bedrooms: 2,
        bathrooms: 2,
        parking: 1,
        price: 850000,
        status: "available",
        description: "Apartamento ensolarado com vista para o jardim interno.",
      },
      {
        id: 302,
        unit: "302B",
        tower: "B",
        floor: "3",
        type: "2 Quartos",
        area: 72,
        bedrooms: 2,
        bathrooms: 2,
        parking: 1,
        price: 870000,
        status: "available",
        description: "Excelente insolação com varanda ampla.",
      },
      {
        id: 405,
        unit: "405A",
        tower: "A",
        floor: "4",
        type: "2 Quartos",
        area: 72,
        bedrooms: 2,
        bathrooms: 2,
        parking: 1,
        price: 890000,
        status: "reserved",
        description: "Vista parcial para o mar e sacada gourmet.",
      },
      {
        id: 501,
        unit: "501B",
        tower: "B",
        floor: "5",
        type: "3 Quartos",
        area: 98,
        bedrooms: 3,
        bathrooms: 3,
        parking: 2,
        price: 1200000,
        status: "available",
        description: "Amplo apartamento com suíte master com closet.",
      },
      {
        id: 603,
        unit: "603A",
        tower: "A",
        floor: "6",
        type: "3 Quartos",
        area: 98,
        bedrooms: 3,
        bathrooms: 3,
        parking: 2,
        price: 1250000,
        status: "available",
        description: "Vista panorâmica e acabamentos premium.",
      },
      {
        id: 704,
        unit: "704B",
        tower: "B",
        floor: "7",
        type: "3 Quartos",
        area: 98,
        bedrooms: 3,
        bathrooms: 3,
        parking: 2,
        price: 1280000,
        status: "available",
        description: "Andar alto com excelente privacidade.",
      },
      {
        id: 801,
        unit: "801A",
        tower: "A",
        floor: "8",
        type: "4 Quartos",
        area: 135,
        bedrooms: 4,
        bathrooms: 5,
        parking: 3,
        price: 1850000,
        status: "available",
        description: "Cobertura linha premium com terraço privativo.",
      },
      {
        id: 902,
        unit: "902B",
        tower: "B",
        floor: "9",
        type: "4 Quartos",
        area: 135,
        bedrooms: 4,
        bathrooms: 5,
        parking: 3,
        price: 1900000,
        status: "available",
        description: "Vista para o mar e amplos espaços de convivência.",
      },
    ]);

    // Características da localização (atualizado com ícones Heroicons)
    const locationFeatures = ref([
      {
        icon: "heroicons:bus",
        title: "Transporte Público",
        description: "Parada de ônibus a 100m e estação de metrô a 800m",
      },
      {
        icon: "heroicons:shopping-bag",
        title: "Comércio",
        description: "Shopping center a 1km e mercados próximos",
      },
      {
        icon: "heroicons:academic-cap",
        title: "Educação",
        description: "Escolas e universidades nas proximidades",
      },
      {
        icon: "heroicons:heart",
        title: "Saúde",
        description: "Hospitais e clínicas a menos de 3km",
      },
    ]);

    // Depoimentos (removidas referências a avatares)
    const testimonials = ref([
      {
        name: "Carlos Silva",
        role: "Comprador - Torre A",
        text: "Encontrei no Skyline Residences tudo que procurava: qualidade, localização e um ótimo custo-benefício. A equipe foi extremamente atenciosa em todo o processo.",
        rating: 5,
      },
      {
        name: "Ana Paula Oliveira",
        role: "Investidora",
        text: "Como investidora, reconheço o potencial de valorização deste empreendimento. A construtora tem ótimo histórico e o projeto é realmente diferenciado.",
        rating: 5,
      },
      {
        name: "Roberto Mendes",
        role: "Comprador - Torre B",
        text: "A qualidade dos acabamentos me surpreendeu positivamente. As áreas comuns são amplas e bem cuidadas, e a localização é perfeita para minha família.",
        rating: 5,
      },
      {
        name: "Fernanda Costa",
        role: "Arquiteta",
        text: "Como profissional da área, posso afirmar que o projeto arquitetônico e a execução são de alto padrão. Detalhes que fazem toda a diferença.",
        rating: 5,
      },
    ]);

    // Configurações responsivas
    const carouselResponsiveOptions = ref([
      {
        breakpoint: "1024px",
        numVisible: 3,
        numScroll: 1,
      },
      {
        breakpoint: "768px",
        numVisible: 2,
        numScroll: 1,
      },
      {
        breakpoint: "560px",
        numVisible: 1,
        numScroll: 1,
      },
    ]);

    const galleriaResponsiveOptions = ref([
      {
        breakpoint: "1024px",
        numVisible: 5,
      },
      {
        breakpoint: "768px",
        numVisible: 3,
      },
      {
        breakpoint: "560px",
        numVisible: 1,
      },
    ]);

    // Financiamento
    const financing = ref({
      propertyValue: 850000,
      downPayment: 170000,
      term: 30,
      interestRate: 8.5,
    });

    const financingResults = ref(null);

    // Lead capture
    const showLeadForm = ref(false);
    const currentLeadStep = ref(0);
    const lead = ref({
      name: "",
      email: "",
      phone: "",
      interest: null,
      budget: null,
      timeframe: null,
      visitDate: null,
      visitTime: null,
      message: "",
    });

    const leadSteps = ref([
      { label: "Dados Pessoais" },
      { label: "Interesse" },
      { label: "Agendamento" },
    ]);

    const propertyTypes = ref([
      { name: "2 Quartos", value: "2q" },
      { name: "3 Quartos", value: "3q" },
      { name: "4 Quartos", value: "4q" },
      { name: "Cobertura", value: "cobertura" },
      { name: "Ainda não sei", value: "unknown" },
    ]);

    const budgetRanges = ref([
      { name: "Até R$ 800.000", value: "0-800" },
      { name: "R$ 800.000 - R$ 1.200.000", value: "800-1200" },
      { name: "R$ 1.200.000 - R$ 1.800.000", value: "1200-1800" },
      { name: "Acima de R$ 1.800.000", value: "1800+" },
    ]);

    const timeframes = ref([
      { name: "Imediato", value: "now" },
      { name: "3 a 6 meses", value: "3-6" },
      { name: "6 a 12 meses", value: "6-12" },
      { name: "Apenas pesquisando", value: "research" },
    ]);

    const visitTimes = ref([
      "09:00",
      "10:00",
      "11:00",
      "14:00",
      "15:00",
      "16:00",
      "17:00",
    ]);

    const minVisitDate = ref(new Date());

    // Unidade selecionada
    const selectedPlanType = ref(null);
    const selectedUnit = ref(null);
    const showUnitDetails = ref(false);

    // Computed properties
    const filteredUnits = computed(() => {
      if (!selectedPlanType.value) return [];
      return units.value.filter(
        (unit) =>
          unit.type === selectedPlanType.value && unit.status === "available"
      );
    });

    // Methods
    const scrollTo = (id) => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    };

    const formatCurrency = (value) => {
      return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(value);
    };

    const showUnits = (planType) => {
      selectedPlanType.value = planType;
      scrollTo("units");
    };

    const viewUnitDetails = (unit) => {
      selectedUnit.value = unit;
      showUnitDetails.value = true;
    };

    const reserveUnit = (unit) => {
      showUnitDetails.value = false;
      lead.value.interest =
        propertyTypes.value.find((type) => unit.type.includes(type.name)) ||
        null;
      lead.value.budget =
        budgetRanges.value.find((range) => {
          const max = parseInt(range.value.split("-")[1] || "999999999");
          return unit.price <= max * 1000;
        }) || null;
      showLeadForm.value = true;
      currentLeadStep.value = 0;
    };

    const calculateFinancing = () => {
      const principal =
        financing.value.propertyValue - financing.value.downPayment;
      const monthlyRate = financing.value.interestRate / 100 / 12;
      const numberOfPayments = financing.value.term * 12;

      // Cálculo da parcela (PMT)
      const monthlyPayment =
        (principal *
          (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments))) /
        (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

      const totalAmount = monthlyPayment * numberOfPayments;
      const totalInterest = totalAmount - principal;

      financingResults.value = {
        financedAmount: principal,
        monthlyPayment: monthlyPayment,
        totalAmount: totalAmount,
        totalInterest: totalInterest,
      };
    };

    const showFinancingCalculator = (plan) => {
      financing.value.propertyValue = plan.basePrice;
      financing.value.downPayment = Math.round(plan.basePrice * 0.2);
      scrollTo("financing");
    };

    const showFinancingCalculatorForUnit = (unit) => {
      financing.value.propertyValue = unit.price;
      financing.value.downPayment = Math.round(unit.price * 0.2);
      showUnitDetails.value = false;
      scrollTo("financing");
    };

    const nextLeadStep = () => {
      if (currentLeadStep.value < leadSteps.value.length - 1) {
        currentLeadStep.value++;
      }
    };

    const prevLeadStep = () => {
      if (currentLeadStep.value > 0) {
        currentLeadStep.value--;
      }
    };

    const submitLeadForm = () => {
      // Aqui você faria a chamada para sua API/backend
      console.log("Lead enviado:", lead.value);

      // Simulação de envio bem-sucedido
      showLeadForm.value = false;

      // Reset do formulário
      lead.value = {
        name: "",
        email: "",
        phone: "",
        interest: null,
        budget: null,
        timeframe: null,
        visitDate: null,
        visitTime: null,
        message: "",
      };
      currentLeadStep.value = 0;
    };

    const selectTour = (tour) => {
      console.log("Tour selecionado:", tour);
      // Aqui você implementaria a lógica para carregar o tour 360°
    };

    const openWhatsApp = () => {
      const phone = "5511999999999";
      const message =
        "Olá, gostaria de mais informações sobre o Skyline Residences.";
      window.open(
        `https://wa.me/${phone}?text=${encodeURIComponent(message)}`,
        "_blank"
      );
    };

    return {
      features,
      tours,
      floorPlans,
      units,
      locationFeatures,
      testimonials,
      carouselResponsiveOptions,
      galleriaResponsiveOptions,
      financing,
      financingResults,
      showLeadForm,
      currentLeadStep,
      lead,
      leadSteps,
      propertyTypes,
      budgetRanges,
      timeframes,
      visitTimes,
      minVisitDate,
      selectedPlanType,
      selectedUnit,
      showUnitDetails,
      filteredUnits,
      scrollTo,
      formatCurrency,
      showUnits,
      viewUnitDetails,
      reserveUnit,
      calculateFinancing,
      showFinancingCalculator,
      showFinancingCalculatorForUnit,
      nextLeadStep,
      prevLeadStep,
      submitLeadForm,
      selectTour,
      openWhatsApp,
    };
  },
};
</script>
<style scoped>
/* Fontes e variáveis de cores */
@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&display=swap");

:root {
  --primary: #2c3e50;
  --primary-dark: #1a252f;
  --secondary: #e74c3c;
  --secondary-light: #ff6b5b;
  --accent: #3498db;
  --light: #ecf0f1;
  --dark: #2c3e50;
  --gray: #95a5a6;
  --gray-light: #bdc3c7;
  --white: #ffffff;
  --black: #000000;
  --shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  --transition: all 0.3s ease;
}

/* Reset e estilos base */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: "Montserrat", sans-serif;
  color: var(--dark);
  line-height: 1.6;
  overflow-x: hidden;
}

.landing-page {
  position: relative;
  overflow: hidden;
}

.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

/* Header */
.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.95);
  box-shadow: var(--shadow);
  z-index: 1000;
  transition: var(--transition);
}

.header.scrolled {
  background-color: var(--white);
  padding: 10px 0;
}

.header .container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
}

.logo {
  display: flex;
  align-items: center;
  gap: 10px;
}

.logo-img {
  height: 40px;
  transition: var(--transition);
}

.logo-text {
  font-weight: 700;
  font-size: 1.2rem;
  color: var(--primary);
}

.nav {
  display: flex;
  align-items: center;
  gap: 15px;
}

/* Hero Section */
.hero {
  display: flex;
  min-height: 100vh;
  padding-top: 80px;
  position: relative;
  overflow: hidden;
}

.hero::before {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  width: 50%;
  height: 100%;
  background: linear-gradient(135deg, var(--primary), var(--primary-dark));
  z-index: -1;
  clip-path: polygon(0 0, 100% 0, 100% 100%, 20% 100%);
}

.hero-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 60px 0;
  animation: fadeInLeft 1s ease;
}

.hero-title {
  font-size: 3.5rem;
  font-weight: 700;
  margin-bottom: 20px;
  color: var(--primary);
  line-height: 1.2;
}

.hero-subtitle {
  font-size: 1.2rem;
  margin-bottom: 30px;
  max-width: 500px;
  color: var(--gray);
}

.hero-buttons {
  display: flex;
  gap: 15px;
}

.hero-image {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.building-img {
  max-width: 100%;
  height: auto;
  max-height: 80vh;
  animation: float 6s ease-in-out infinite;
}

/* Features Section */
.features {
  padding: 100px 0;
  background-color: var(--light);
}

.section-title {
  font-size: 2.5rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 15px;
  color: var(--primary);
}

.section-subtitle {
  font-size: 1.1rem;
  text-align: center;
  margin-bottom: 50px;
  color: var(--gray);
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
}

.feature-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 30px;
}

.feature-card {
  background: var(--white);
  border-radius: 10px;
  overflow: hidden;
  box-shadow: var(--shadow);
  transition: var(--transition);
  text-align: center;
  padding: 30px 20px;
}

.feature-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
}

.feature-icon {
  font-size: 2.5rem;
  color: var(--secondary);
  margin-bottom: 20px;
}

/* Virtual Tour Section */
.virtual-tour {
  padding: 100px 0;
  background-color: var(--white);
}

.tour-container {
  display: flex;
  gap: 30px;
  margin-top: 40px;
}

.tour-viewer {
  flex: 2;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: var(--shadow);
  height: 500px;
  background-color: var(--primary);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--white);
  position: relative;
}

.tour-placeholder {
  text-align: center;
  cursor: pointer;
  transition: var(--transition);
}

.tour-placeholder i {
  font-size: 4rem;
  margin-bottom: 20px;
}

.tour-placeholder:hover {
  opacity: 0.8;
}

.tour-options {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.tour-option {
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  transition: var(--transition);
  position: relative;
  height: 100px;
}

.tour-option:hover {
  transform: translateX(5px);
}

.tour-option img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.tour-option span {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 10px;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.7));
  color: var(--white);
  font-weight: 500;
}

/* Floor Plans Section */
.floor-plans {
  padding: 100px 0;
  background-color: var(--light);
}

.floor-tabs {
  margin-top: 40px;
}

.plan-container {
  display: flex;
  gap: 40px;
  padding: 20px 0;
}

.plan-image {
  flex: 1;
}

.plan-img {
  width: 100%;
  border-radius: 10px;
  box-shadow: var(--shadow);
}

.plan-details {
  flex: 1;
}

.plan-details h3 {
  font-size: 1.8rem;
  margin-bottom: 15px;
  color: var(--primary);
}

.plan-description {
  margin-bottom: 25px;
  color: var(--gray);
}

.plan-specs {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  margin-bottom: 30px;
}

.spec {
  display: flex;
  align-items: center;
  gap: 10px;
}

.spec i {
  font-size: 1.2rem;
  color: var(--secondary);
}

.spec span {
  font-weight: 600;
  font-size: 1.1rem;
}

.spec small {
  color: var(--gray);
  font-size: 0.9rem;
}

.plan-actions {
  display: flex;
  gap: 15px;
}

/* Available Units */
.available-units {
  padding: 80px 0;
  background-color: var(--white);
}

.units-table {
  margin-top: 30px;
  box-shadow: var(--shadow);
  border-radius: 10px;
  overflow: hidden;
}

/* Financing Calculator */
.financing {
  padding: 100px 0;
  background-color: var(--light);
}

.calculator-container {
  display: flex;
  gap: 40px;
  margin-top: 40px;
}

.calculator-form {
  flex: 1;
  background: var(--white);
  padding: 30px;
  border-radius: 10px;
  box-shadow: var(--shadow);
}

.calculator-results {
  flex: 1;
}

.result-card {
  background: var(--primary);
  color: var(--white);
  padding: 30px;
  border-radius: 10px;
  box-shadow: var(--shadow);
}

.result-card h3 {
  font-size: 1.5rem;
  margin-bottom: 25px;
  text-align: center;
}

.result-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
  padding-bottom: 15px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
}

.result-actions {
  display: flex;
  gap: 15px;
  margin-top: 30px;
}

/* Location Map */
.location {
  padding: 100px 0;
  background-color: var(--white);
}

.map-container {
  display: flex;
  gap: 40px;
  margin-top: 40px;
}

.map-placeholder {
  flex: 2;
  height: 500px;
  background-color: var(--light);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: var(--gray);
  box-shadow: var(--shadow);
}

.map-placeholder i {
  font-size: 4rem;
  margin-bottom: 20px;
}

.location-features {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.location-feature {
  display: flex;
  gap: 15px;
  background: var(--light);
  padding: 20px;
  border-radius: 10px;
  transition: var(--transition);
}

.location-feature:hover {
  transform: translateX(5px);
}

.location-feature i {
  font-size: 1.5rem;
  color: var(--secondary);
}

.location-feature h4 {
  margin-bottom: 5px;
  color: var(--primary);
}

/* Testimonials */
.testimonials {
  padding: 100px 0;
  background-color: var(--light);
}

.testimonial-card {
  background: var(--white);
  border-radius: 10px;
  overflow: hidden;
  box-shadow: var(--shadow);
  height: 100%;
  display: flex;
  flex-direction: column;
  margin: 10px;
  transition: var(--transition);
}

.testimonial-card:hover {
  transform: translateY(-5px);
}

.testimonial-content {
  padding: 25px;
  flex: 1;
}

.testimonial-rating {
  color: #f1c40f;
  margin-bottom: 15px;
}

.testimonial-author {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 15px 25px;
  background-color: var(--primary);
  color: var(--white);
}

.author-avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
}

.author-info {
  display: flex;
  flex-direction: column;
}

.author-info span {
  font-size: 0.9rem;
  opacity: 0.8;
}

/* CTA Section */
.cta {
  padding: 100px 0;
  background: linear-gradient(135deg, var(--primary), var(--primary-dark));
  color: var(--white);
  text-align: center;
}

.cta-title {
  font-size: 2.5rem;
  margin-bottom: 15px;
}

.cta-subtitle {
  font-size: 1.2rem;
  margin-bottom: 30px;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  opacity: 0.9;
}

.cta-buttons {
  display: flex;
  justify-content: center;
  gap: 20px;
}

/* Footer */
.footer {
  background-color: var(--primary-dark);
  color: var(--white);
  padding: 60px 0 0;
}

.footer-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 40px;
  margin-bottom: 40px;
}

.footer-logo {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
}

.footer-logo .logo-img {
  height: 30px;
}

.footer-logo .logo-text {
  color: var(--white);
}

.footer-links {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 30px;
}

.link-group {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.link-group h4 {
  font-size: 1.1rem;
  margin-bottom: 10px;
  color: var(--white);
}

.link-group a {
  color: var(--gray-light);
  text-decoration: none;
  transition: var(--transition);
}

.link-group a:hover {
  color: var(--white);
}

.footer-social h4 {
  font-size: 1.1rem;
  margin-bottom: 15px;
}

.social-icons {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.footer-contact p {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
  font-size: 0.9rem;
}

.footer-contact i {
  font-size: 1rem;
}

.footer-bottom {
  padding: 20px 0;
  text-align: center;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  font-size: 0.9rem;
  color: var(--gray-light);
}

/* Lead Form */
.lead-form {
  padding: 20px 0;
}

.step-content {
  padding: 30px 0;
  min-height: 300px;
}

.step-actions {
  display: flex;
  justify-content: space-between;
  padding-top: 20px;
  border-top: 1px solid var(--gray-light);
}

.p-field {
  margin-bottom: 20px;
}

/* Unit Details */
.unit-details {
  display: flex;
  gap: 30px;
}

.unit-gallery {
  flex: 1;
}

.unit-info {
  flex: 1;
}

.unit-specs {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
  margin: 20px 0;
}

.unit-actions {
  display: flex;
  gap: 15px;
  margin-top: 30px;
}

/* WhatsApp Float */
.whatsapp-float {
  position: fixed;
  bottom: 30px;
  right: 30px;
  z-index: 100;
}

.whatsapp-float button {
  width: 60px;
  height: 60px;
  font-size: 1.5rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
}

/* Animações */
@keyframes fadeInLeft {
  from {
    opacity: 0;
    transform: translateX(-50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes float {
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-20px);
  }
  100% {
    transform: translateY(0px);
  }
}

@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
}

/* Responsividade */
@media (max-width: 992px) {
  .hero {
    flex-direction: column;
    padding-top: 100px;
  }

  .hero::before {
    width: 100%;
    height: 50%;
    clip-path: polygon(0 0, 100% 0, 100% 100%, 0 80%);
  }

  .hero-content {
    padding: 40px 0;
  }

  .hero-title {
    font-size: 2.5rem;
  }

  .hero-image {
    padding: 40px 0;
  }

  .tour-container,
  .plan-container,
  .calculator-container,
  .map-container,
  .unit-details {
    flex-direction: column;
  }

  .tour-viewer {
    height: 400px;
  }
}

@media (max-width: 768px) {
  .header .container {
    flex-direction: column;
    padding: 15px;
  }

  .nav {
    margin-top: 15px;
    flex-wrap: wrap;
    justify-content: center;
  }

  .hero-title {
    font-size: 2rem;
  }

  .section-title {
    font-size: 2rem;
  }

  .feature-cards {
    grid-template-columns: 1fr;
  }

  .plan-specs,
  .unit-specs {
    grid-template-columns: 1fr;
  }

  .cta-buttons,
  .plan-actions,
  .unit-actions {
    flex-direction: column;
  }

  .footer-content {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 576px) {
  .hero-title {
    font-size: 1.8rem;
  }

  .hero-buttons {
    flex-direction: column;
  }

  .section-title {
    font-size: 1.8rem;
  }
}
</style>
