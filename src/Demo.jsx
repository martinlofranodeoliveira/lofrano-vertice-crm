import React from "react";
import {
  ArrowUpRight,
  LayoutDashboard,
  TrendingUp,
  Users,
  ChevronDown,
  Search,
  ArrowRight,
} from "./Icons.jsx";

function VerticeDemo() {
  let [activeView, setActiveView] = React.useState(`Visão geral`),
    [search, setSearch] = React.useState(``),
    [advancedDeal, setAdvancedDeal] = React.useState(!1),
    l = [
      {
        name: `Projeto Horizonte`,
        type: `Consultoria · exemplo`,
        value: `R$ 18.500`,
        stage: 0,
      },
      {
        name: `Estúdio Norte`,
        type: `Serviços · exemplo`,
        value: `R$ 32.000`,
        stage: advancedDeal ? 2 : 1,
      },
      {
        name: `Casa Movimento`,
        type: `Parceria · exemplo`,
        value: `R$ 24.750`,
        stage: 2,
      },
    ];
  return (
    <div className={`dm-vertice`} id={`demo-top`}>
      <aside className={`vt-sidebar`}>
        <a className={`dm-brand`} href={`#demo-top`}>
          vértice
          <span>
            <ArrowUpRight size={20} />
          </span>
        </a>
        <small>SEU ESPAÇO DE TRABALHO</small>
        {[`Visão geral`, `Negócios`, `Equipe`].map((n, r) => (
          <button
            key={n}
            aria-pressed={activeView === n}
            onClick={() => setActiveView(n)}
          >
            {r === 0 ? (
              <LayoutDashboard size={17} />
            ) : r === 1 ? (
              <TrendingUp size={17} />
            ) : (
              <Users size={17} />
            )}
            {` `}
            {n}
          </button>
        ))}
        <div className={`vt-sidebar-bottom`}>
          <span className={`vt-avatar`}>L</span>
          <div>
            Equipe LOFRANO<small>Workspace demonstrativo</small>
          </div>
        </div>
      </aside>
      <section className={`vt-main`}>
        <div className={`vt-top`}>
          <span>
            {`Workspace `}
            <span>/</span>
            {` `}
            {activeView}
          </span>
          <span className={`vt-live`}>
            <i />
            Dados de exemplo
          </span>
        </div>
        <header className={`vt-heading`}>
          <div>
            <p className={`dm-overline`}>UMA BOA VISÃO MUDA TUDO</p>
            <h1>
              {activeView === `Equipe`
                ? `Grandes ideias. Mesma direção.`
                : `Seu próximo movimento, claro.`}
            </h1>
            <p>Menos planilhas abertas. Mais espaço para bons negócios.</p>
          </div>
          <span className={`vt-date`}>
            {`Outubro, 2026 `}
            <ChevronDown size={16} />
          </span>
        </header>
        {activeView === `Equipe` ? (
          <div className={`vt-team`}>
            {[`Produto`, `Comercial`, `Operações`].map((e, t) => (
              <article key={e}>
                <span className={`vt-avatar`}>{e[0]}</span>
                <h2>{e}</h2>
                <p>
                  {`Equipe de exemplo · `}
                  {t + 2}
                  {` participantes fictícios`}
                </p>
                <span className={`vt-live`}>
                  <i />
                  Visão compartilhada
                </span>
              </article>
            ))}
          </div>
        ) : (
          <React.Fragment>
            <div className={`vt-metrics`}>
              {[
                [`Valor no pipeline`, `R$ 84.250`, `Dados ilustrativos`],
                [`Negócios ativos`, `12`, `Carteira de exemplo`],
                [`Próximos encontros`, `04`, `Agenda demonstrativa`],
              ].map((e, t) => (
                <article key={e[0]}>
                  <span>
                    {e[0]}
                    <ArrowUpRight size={16} />
                  </span>
                  <strong>{e[1]}</strong>
                  <small>
                    {t === 0 ? (
                      <span className={`vt-green`}>Perspectiva comercial</span>
                    ) : (
                      e[2]
                    )}
                  </small>
                </article>
              ))}
            </div>
            {activeView === `Visão geral` && (
              <div className={`vt-insight`}>
                <div>
                  <p className={`dm-overline`}>MOVIMENTO DO PIPELINE</p>
                  <h2>
                    Cada conversa,
                    <br />
                    uma possibilidade.
                  </h2>
                  <small>Volume ilustrativo · sem dados reais</small>
                </div>
                <div className={`vt-chart`}>
                  {[25, 36, 28, 55, 41, 73, 60, 85, 72, 96, 80, 100].map(
                    (e, t) => (
                      <div key={t}>
                        <i
                          style={{
                            height: e + `%`,
                          }}
                        />
                        <span>{t % 3 == 0 ? `S` + (t / 3 + 1) : ``}</span>
                      </div>
                    ),
                  )}
                </div>
              </div>
            )}
            <div className={`vt-pipeline-heading`}>
              <h2>Seu pipeline</h2>
              <label>
                <Search size={16} />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder={`Buscar negócio`}
                  aria-label={`Buscar negócio de exemplo`}
                />
              </label>
            </div>
            <div className={`vt-pipeline`}>
              {[`Conversas`, `Propostas`, `Próximo passo`].map((e, t) => (
                <div key={e}>
                  <h3>
                    <i />
                    {e}
                    <span>{l.filter((e) => e.stage === t).length}</span>
                  </h3>
                  {l
                    .filter(
                      (e) =>
                        e.stage === t &&
                        e.name.toLowerCase().includes(search.toLowerCase()),
                    )
                    .map((e) => (
                      <article key={e.name}>
                        <span className={`vt-deal-icon`}>{e.name[0]}</span>
                        <h4>{e.name}</h4>
                        <p>{e.type}</p>
                        <strong>{e.value}</strong>
                        {e.name === `Estúdio Norte` && (
                          <button
                            onClick={() => setAdvancedDeal(!advancedDeal)}
                          >
                            {advancedDeal
                              ? `Voltar à proposta`
                              : `Avançar etapa`}
                            {` `}
                            <ArrowRight size={14} />
                          </button>
                        )}
                      </article>
                    ))}
                </div>
              ))}
            </div>
            {search &&
              !l.some((e) =>
                e.name.toLowerCase().includes(search.toLowerCase()),
              ) && (
                <p className={`dm-feedback`} role={`status`}>
                  Nenhum negócio de exemplo encontrado. Tente “Norte”.
                </p>
              )}
          </React.Fragment>
        )}
        <p className={`dm-local-note`}>
          Dashboard conceitual. Valores e empresas fictícios; mudanças ficam
          apenas nesta tela.
        </p>
      </section>
    </div>
  );
}

export default VerticeDemo;
