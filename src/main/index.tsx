import "regenerator-runtime/runtime";
import "github-markdown-css/github-markdown.css";
import "highlight.js/styles/default.css";
import "katex/dist/katex.min.css";

import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore } from "./store/createStore";
import { App } from "./components/App";
import { Provider as CurrentBufferProvider } from "./contexts/CurrentBufferContext";
import { Provider as WriterProvider } from "./contexts/WriterContext";

const el = document.querySelector("#root") as HTMLElement;

const timeoutId = setTimeout(() => {
  el.innerHTML = `<p style="color: white; padding-left: 30px;">
Now Loading...<br />
If you can not load, try Right Click > Inspect > Application > Clear
Site Data
</p>`;
}, 3000);

const main = async () => {
  console.time("mount");
  // const worker = new Worker("../worker/index.ts", { type: "module" });
  // const remote: WorkerAPI = wrap(worker) as any;
  const store = createStore();

  clearTimeout(timeoutId);
  ReactDOM.render(
    // <WorkerAPIContext.Provider value={remote}>
    <WriterProvider>
      <CurrentBufferProvider>
        <Provider store={store}>
          <App />
        </Provider>
      </CurrentBufferProvider>
    </WriterProvider>,
    // </WorkerAPIContext.Provider>,
    document.querySelector("#root")
  );
  console.timeEnd("mount");
};

main();
