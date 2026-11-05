---
name: "Vértice"
description: "Sistema visual implementado — SaaS & CRM"
colors:
  primary: "#cce594"
  background: "#11151c"
  text: "#e2e7ee"
  surface: "#1a2028"
  card: "#202832"
  selected: "#2b3337"
  frame-background: "#09090b"
  frame-text: "#f5f5f7"
  focus: "#ff2d60"
typography:
  display:
    fontFamily: "Manrope, Arial, sans-serif"
    fontSize: "clamp(27px, 3vw, 42px)"
    fontWeight: 500
    letterSpacing: "-1.5px"
  body:
    fontFamily: "DM Sans, Arial, sans-serif"
---

# Design System: Vértice

## Overview

Dashboard denso, escuro e operacional. Acentos vegetais orientam números, gráfico e progressão de negócios; a organização em painéis preserva a identidade do CRM conceitual.

Registro descritivo do código atual, com autoridade de preservação da [referência pública](https://lofranotecnologia.com.br/modelos/vertice). Fontes normativas: [estilos do modelo](../src/demo.css), [base compartilhada](../src/base.css), [componentes da demonstração](../src/Demo.jsx) e [moldura de distribuição](../src/App.jsx). Layout, contraste e overflow visual permanecem não verificados em navegador; valores abaixo são declarações de fonte, não medições de renderização.

## Colors

O acento claro marca as barras principais; fundo, superfície e cartão formam níveis tonais. A seleção da navegação usa superfície própria, sem converter todo o painel para a cor de destaque. O frontmatter registra cores principais por papel; variações locais permanecem no CSS. A moldura LOFRANO conserva fundo escuro, texto claro e foco rosa. Paleta fixa, sem alternância de tema.

## Typography

O título usa a família display compartilhada; números das métricas têm (32px) e peso (500). Rótulos e metadados são compactos. Até (760px), o título principal passa a (30px). Manrope e DM Sans são fontes locais de [`assets/`](../assets/); Georgia, Arial e Helvetica dependem das alternativas do sistema. O token display descreve o título principal em desktop. A base define h2 móvel (34px), com espaçamento de letras (-1.3px), até (760px); regras mais específicas do modelo prevalecem.

## Layout

Barra lateral de (215px) e área principal flexível; métricas, pipeline e equipe usam três colunas. Até (1050px), a lateral cai para (175px). Até (760px), a lateral vira navegação horizontal, pipeline/equipe ficam em uma coluna e as métricas usam duas, com a última ocupando a largura. A partir de (1400px), o dashboard tem máximo de (1600px).

A moldura organiza autoria e links acima da demonstração, guia abaixo e rodapé final. Cabeçalho e rodapé permitem quebra; até (600px), o guia reduz o padding para (40px 20px).

## Elevation & Depth

A profundidade vem de fundos sucessivos e bordas translúcidas; os painéis do dashboard não recebem sombras.

## Shapes

Painéis e equipe têm cantos (8px), colunas do pipeline (6px) e cartões de negócio (5px). Avatares e marcadores de status são circulares. O modelo não usa fotografia; avatares, barras e ícones são elementos locais.

## Components

- Navegação: Visão geral, Negócios e Equipe indicam seleção com `aria-pressed`; Equipe substitui o conteúdo e Negócios omite o gráfico.
- Pipeline: a busca filtra nomes; ausência de correspondência revela mensagem de status. Um negócio alterna entre proposta e próximo passo.
- Gráfico: barras ilustrativas alternam tons e não representam série obtida de serviço. Campo de busca tem fundo transparente e borda inferior.
- Estados compartilhados: Controles da demonstração usam o foco global rosa (3px), afastado (5px). A moldura inverte o botão de reinício para fundo branco no hover. As interações do modelo usam os estados descritos acima; não há variante de hover adicional declarada para elas. Reiniciar remonta a demonstração e restaura o estado local.
- Movimento: a base usa rolagem suave; a preferência por movimento reduzido troca a rolagem CSS para automática e reduz durações de animação/transição para (0.01ms).

## Do's and Don'ts

- **Do:** Conservar a hierarquia de superfícies, a barra lateral e o pipeline em colunas no desktop.
- **Do:** manter avisos de conceito fictício, foco visível e estados de seleção coerentes com os controles.
- **Don't:** Transformar o dashboard em uma landing page ou tratar métricas fictícias como dados reais.
- **Don't:** interpretar a moldura compartilhada como autorização para substituir a identidade visual do modelo.
