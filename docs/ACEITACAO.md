# Critérios do modelo Vértice

Derivados da demonstração pública antes da implementação independente. Os testes verificam DOM simulado; isso não equivale a QA visual em navegador.

- **vertice-01** — Clicar no button “Negócios” da barra lateral.
  Resultado: O button fica aria-pressed=true, o breadcrumb passa a Workspace / Negócios, e o pipeline continua visível. O bloco MOVIMENTO DO PIPELINE, exclusivo de Visão geral, sai do DOM.
- **vertice-02** — Preencher input[aria-label="Buscar negócio de exemplo"] com “norte”; depois substituir por “zzzz”.
  Resultado: Com norte, somente o card Estúdio Norte aparece no pipeline. Com zzzz, role=status mostra “Nenhum negócio de exemplo encontrado. Tente “Norte”.”. Os contadores das colunas são calculados antes do filtro de busca.
- **vertice-03** — Limpar a busca. No card Estúdio Norte, clicar “Avançar etapa”; depois clicar “Voltar à proposta”.
  Resultado: O card passa de Propostas para Próximo passo e o button muda para Voltar à proposta. Os contadores das duas colunas passam de 1/1 para 0/2. O segundo clique devolve o card a Propostas.
- **vertice-04** — Clicar no button “Equipe” da barra lateral.
  Resultado: O h1 passa a “Grandes ideias. Mesma direção.”. Cards Produto, Comercial e Operações mostram 2, 3 e 4 participantes fictícios. O pipeline sai do DOM.

Além dos fluxos, a suíte confere conteúdo inicial publicado, controles, imagens, âncoras, ausência de configuração privada e reinício do estado.
