const text = (element) => element.textContent.replace(/\s+/gu, " ").trim();

export default [
  {
    name: "vertice-01 — troca a visão para Negócios",
    run: async ({ ui, user, assert }) => {
      await user.click(
        ui.getByRole("button", { name: "Negócios", exact: true }),
      );
      assert.equal(
        ui
          .getByRole("button", { name: "Negócios", exact: true })
          .getAttribute("aria-pressed"),
        "true",
      );
      assert.ok(
        ui.getByText(
          (_, element) =>
            element.tagName === "SPAN" &&
            text(element) === "Workspace / Negócios",
        ),
      );
      assert.ok(ui.getByRole("heading", { name: "Seu pipeline", exact: true }));
      assert.equal(
        ui.queryByText("MOVIMENTO DO PIPELINE", { exact: true }),
        null,
      );
    },
  },
  {
    name: "vertice-02 — busca negócios e apresenta ausência de resultados",
    run: async ({ ui, user, assert }) => {
      const search = ui.getByRole("textbox", {
        name: "Buscar negócio de exemplo",
      });
      await user.type(search, "norte");
      assert.ok(
        ui.getByRole("heading", { name: "Estúdio Norte", exact: true }),
      );
      assert.equal(
        ui.queryByRole("heading", { name: "Projeto Horizonte", exact: true }),
        null,
      );
      assert.equal(
        ui.queryByRole("heading", { name: "Casa Movimento", exact: true }),
        null,
      );
      for (const name of ["Conversas", "Propostas", "Próximo passo"]) {
        assert.match(
          text(
            ui.getByRole("heading", { level: 3, name: new RegExp(`^${name}`) }),
          ),
          /1$/u,
        );
      }
      await user.clear(search);
      await user.type(search, "zzzz");
      assert.equal(
        text(ui.getByRole("status")),
        "Nenhum negócio de exemplo encontrado. Tente “Norte”.",
      );
      assert.equal(
        ui.queryByRole("heading", { name: "Estúdio Norte", exact: true }),
        null,
      );
    },
  },
  {
    name: "vertice-03 — avança e devolve Estúdio Norte entre etapas",
    run: async ({ ui, user, assert, within }) => {
      const proposal = ui.getByRole("heading", {
        level: 3,
        name: /^Propostas/u,
      }).parentElement;
      const next = ui.getByRole("heading", {
        level: 3,
        name: /^Próximo passo/u,
      }).parentElement;
      assert.ok(
        within(proposal).getByRole("heading", {
          name: "Estúdio Norte",
          exact: true,
        }),
      );
      await user.click(
        within(proposal).getByRole("button", { name: "Avançar etapa" }),
      );
      assert.equal(
        within(proposal).queryByRole("heading", {
          name: "Estúdio Norte",
          exact: true,
        }),
        null,
      );
      assert.ok(
        within(next).getByRole("heading", {
          name: "Estúdio Norte",
          exact: true,
        }),
      );
      assert.match(
        text(within(proposal).getByRole("heading", { level: 3 })),
        /0$/u,
      );
      assert.match(
        text(within(next).getByRole("heading", { level: 3 })),
        /2$/u,
      );
      await user.click(
        within(next).getByRole("button", { name: "Voltar à proposta" }),
      );
      assert.ok(
        within(proposal).getByRole("heading", {
          name: "Estúdio Norte",
          exact: true,
        }),
      );
      assert.equal(
        within(next).queryByRole("heading", {
          name: "Estúdio Norte",
          exact: true,
        }),
        null,
      );
      assert.match(
        text(within(proposal).getByRole("heading", { level: 3 })),
        /1$/u,
      );
      assert.match(
        text(within(next).getByRole("heading", { level: 3 })),
        /1$/u,
      );
    },
  },
  {
    name: "vertice-04 — apresenta a equipe fictícia",
    run: async ({ ui, user, assert, within }) => {
      await user.click(ui.getByRole("button", { name: "Equipe", exact: true }));
      assert.ok(
        ui.getByRole("heading", {
          level: 1,
          name: "Grandes ideias. Mesma direção.",
        }),
      );
      for (const [name, count] of [
        ["Produto", 2],
        ["Comercial", 3],
        ["Operações", 4],
      ]) {
        const article = ui
          .getByRole("heading", { name, exact: true })
          .closest("article");
        assert.ok(
          within(article).getByText(
            `Equipe de exemplo · ${count} participantes fictícios`,
          ),
        );
      }
      assert.equal(
        ui.queryByRole("heading", { name: "Seu pipeline", exact: true }),
        null,
      );
    },
  },
];
