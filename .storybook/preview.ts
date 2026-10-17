import type { Preview } from "@storybook/web-components-vite";
import { setCustomElementsManifest } from "@storybook/web-components-vite";
import manifest from "../custom-elements.json";
import "./consumer.css";

setCustomElementsManifest(manifest);

const preview: Preview = {
  parameters: {
    controls: { expanded: true },
  },
  globalTypes: {
    theme: {
      description: "Tema dos componentes",
      toolbar: { title: "Tema", icon: "circlehollow", items: ["light", "dark"], dynamicTitle: true },
    },
  },
  initialGlobals: { theme: "light" },
  decorators: [
    (story, { globals }) => {
      document.documentElement.classList.toggle("dark", globals.theme === "dark");
      return story();
    },
  ],
};

export default preview;
