// src/composables/useAvaliacao.js
import { ref } from 'vue';

export function useAvaliacao() {
  const nome = ref('');
  const empresa = ref('');
  const avaliacao = ref('');
  const foto = ref(null);
  const isSubmitting = ref(false);

  const submitAvaliacao = (e) => {
    e.preventDefault();

    // Validação básica
    if (!nome.value || !empresa.value || !avaliacao.value) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    isSubmitting.value = true;

    // Simulação de envio para o servidor
    console.log({
      nome: nome.value,
      empresa: empresa.value,
      avaliacao: avaliacao.value,
      foto: foto.value,
    });

    // Simulação de resposta do servidor
    setTimeout(() => {
      alert('Avaliação enviada com sucesso!');
      resetForm();
      isSubmitting.value = false;
    }, 1000);
  };

  const resetForm = () => {
    nome.value = '';
    empresa.value = '';
    avaliacao.value = '';
    foto.value = null;
  };

  return {
    nome,
    empresa,
    avaliacao,
    foto,
    isSubmitting,
    submitAvaliacao,
  };
}