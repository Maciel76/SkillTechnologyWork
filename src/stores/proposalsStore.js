import { defineStore } from 'pinia';
import serviceRequestService from '@/services/serviceRequestService';

export const useProposalsStore = defineStore('proposals', {
  state: () => ({
    stats: {
      total: 0,
      pendentes: 0,
      emAnalise: 0,
      aprovados: 0,
      recusados: 0,
      concluidos: 0,
      naoLidos: 0,
      naoRespondidos: 0,
      porServico: [],
    },
    loading: false,
    error: null,
  }),

  getters: {
    engagementRate: (state) => {
      if (state.stats.total === 0) return 0;
      return ((state.stats.aprovados / state.stats.total) * 100).toFixed(1);
    },
    leadsCount: (state) => state.stats.pendentes,
    proposalsCount: (state) => state.stats.total,
  },

  actions: {
    async fetchStats() {
      try {
        this.loading = true;
        this.error = null;
        
        const data = await serviceRequestService.getStats();
        
        // Update the stats in the store
        this.stats = {
          total: data.total || 0,
          pendentes: data.porStatus?.pendentes || 0,
          emAnalise: data.porStatus?.emAnalise || 0,
          aprovados: data.porStatus?.aprovados || 0,
          recusados: data.porStatus?.recusados || 0,
          concluidos: data.porStatus?.concluidos || 0,
          naoLidos: data.naoLidos || 0,
          naoRespondidos: data.naoRespondidos || 0,
          porServico: data.porServico || [],
        };
      } catch (error) {
        console.error('Erro ao buscar estatísticas de propostas:', error);
        this.error = error.message || 'Erro ao buscar estatísticas';
        // Reset stats to zero in case of error
        this.stats = {
          total: 0,
          pendentes: 0,
          emAnalise: 0,
          aprovados: 0,
          recusados: 0,
          concluidos: 0,
          naoLidos: 0,
          naoRespondidos: 0,
          porServico: [],
        };
      } finally {
        this.loading = false;
      }
    },
    
    // Method to update a single proposal status and refresh stats
    async updateProposalStatus(proposalId, newStatus, observacoes = '') {
      try {
        await serviceRequestService.updateStatus(proposalId, newStatus, observacoes);
        // Refresh stats after updating
        await this.fetchStats();
      } catch (error) {
        console.error('Erro ao atualizar status da proposta:', error);
        throw error;
      }
    },
  },
});