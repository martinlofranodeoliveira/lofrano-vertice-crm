import test, { afterEach } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { JSDOM } from "jsdom";
const dom = new JSDOM("<!doctype html><html><body></body></html>", {
  url: "http://localhost/",
  pretendToBeVisual: true,
});
for (const key of [
  "window",
  "document",
  "HTMLElement",
  "Element",
  "Node",
  "MutationObserver",
  "Event",
  "MouseEvent",
  "KeyboardEvent",
])
  globalThis[key] = dom.window[key];
Object.defineProperty(globalThis, "navigator", {
  value: dom.window.navigator,
  configurable: true,
});
globalThis.getComputedStyle = dom.window.getComputedStyle.bind(dom.window);
globalThis.IS_REACT_ACT_ENVIRONMENT = true;
Element.prototype.scrollIntoView = function (options) {
  this.dataset.scrollBehavior = options?.behavior ?? "";
};
window.fetch = () => {
  throw new Error("A demonstração não pode enviar solicitações");
};
const React = (await import("react")).default;
const { render, cleanup, within, fireEvent } = await import(
  "@testing-library/react"
);
const userEvent = (await import("@testing-library/user-event")).default;
const App = (await import("../.test-build/App.js")).default;
const flows = (await import("./flows.mjs")).default;
const initial = JSON.parse(
  readFileSync(new URL("./initial.json", import.meta.url), "utf8"),
);
const normalize = (text) => text.replace(/\s+/gu, " ").trim();
function open() {
  const view = render(React.createElement(App));
  const root = view.container.querySelector("#demo-top");
  assert.ok(root, "raiz da experiência existe");
  return {
    ...view,
    root,
    ui: within(root),
    user: userEvent.setup({ document }),
    assert,
    fireEvent,
    within,
  };
}
afterEach(() => cleanup());
test("preserva todo o conteúdo inicial do modelo publicado", () => {
  const { root } = open();
  assert.equal(normalize(root.textContent), initial.text);
});
test("imagens e controles mantêm os atributos essenciais publicados", () => {
  const { root } = open();
  assert.deepEqual(
    [...root.querySelectorAll("img")].map((i) => i.alt),
    initial.imageAlts,
  );
  assert.equal(root.querySelectorAll("button").length, initial.buttons);
  assert.equal(root.querySelectorAll("select").length, initial.selects);
  for (const a of root.querySelectorAll('a[href^="#"]')) {
    const id = a.getAttribute("href").slice(1);
    assert.ok(document.getElementById(id), "âncora interna existente: " + id);
  }
});
for (const flow of flows)
  test(flow.name, async () => {
    await flow.run(open());
  });
test("reiniciar desmonta o estado alterado e restaura o cenário publicado", async () => {
  const ctx = open();
  const capture = (root) =>
    JSON.stringify({
      html: root.innerHTML,
      values: [...root.querySelectorAll("input,select")].map(
        (control) => control.value,
      ),
    });
  const original = capture(ctx.root);
  const input = ctx.root.querySelector("input:not([type=hidden])");
  const select = ctx.root.querySelector("select");
  const pressed = ctx.root.querySelector('button[aria-pressed="false"]');
  if (select)
    await ctx.user.selectOptions(
      select,
      [...select.options].find((o) => o.value !== select.value).value,
    );
  else if (pressed) await ctx.user.click(pressed);
  else if (input?.type === "range")
    fireEvent.change(input, {
      target: { value: String(Number(input.value) + Number(input.step || 1)) },
    });
  else if (input) {
    await ctx.user.clear(input);
    await ctx.user.type(input, "CENARIO-ALTERADO");
  } else throw new Error("O modelo precisa de um estado verificável");
  assert.notEqual(
    capture(ctx.root),
    original,
    "ação deve alterar o estado antes do reset",
  );
  await ctx.user.click(
    within(ctx.container).getByRole("button", {
      name: "Reiniciar demonstração",
    }),
  );
  assert.equal(capture(ctx.container.querySelector("#demo-top")), original);
});
test("entrega não referencia backend, assets absolutos nem configuração privada", () => {
  const source = readFileSync(
    new URL("../src/Demo.jsx", import.meta.url),
    "utf8",
  );
  assert.doesNotMatch(
    source,
    /\b(?:fetch|XMLHttpRequest|WebSocket|eval)\s*\(|dangerouslySetInnerHTML|\/images\/modelos\//u,
  );
  for (const name of [".env", ".openai/hosting.json", "credentials.json"])
    assert.equal(existsSync(new URL("../" + name, import.meta.url)), false);
});
