import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { html } from "lit";
import "../../actions/button";
import "./index";

type Args = { accept: string; multiple: boolean; disabled: boolean; required: boolean };

const meta = {
  title: "Forms/File Upload",
  component: "phsa-file-upload",
  tags: ["autodocs"],
  args: { accept: "", multiple: false, disabled: false, required: false },
  render: ({ accept, multiple, disabled, required }) => html`
    <phsa-file-upload
      label="Anexo"
      description="Selecione um arquivo ou arraste para a área."
      accept=${accept}
      ?multiple=${multiple}
      ?disabled=${disabled}
      ?required=${required}
      style="max-width:32rem"
    ></phsa-file-upload>
  `,
} satisfies Meta<Args>;

export default meta;
type Story = StoryObj<Args>;

export const Default: Story = {};
export const MultipleImages: Story = { args: { accept: "image/*", multiple: true } };
export const Disabled: Story = { args: { disabled: true } };

export const InForm: Story = {
  render: () => html`
    <form
      style="display:grid;gap:1rem;max-width:32rem"
      @submit=${(event: SubmitEvent) => {
        event.preventDefault();
        const form = event.currentTarget as HTMLFormElement;
        const files = new FormData(form).getAll("documents");
        form.querySelector("output")!.textContent = `${files.length} arquivo(s)`;
      }}
    >
      <phsa-file-upload name="documents" label="Documentos" multiple required></phsa-file-upload>
      <phsa-button type="submit">Enviar</phsa-button>
      <output></output>
    </form>
  `,
};

export const CustomClasses: Story = {
  render: () => html`
    <phsa-file-upload class="rounded-2xl border-violet-400 bg-violet-50" style="max-width:32rem"></phsa-file-upload>
  `,
};

export const Isolation: Story = {
  render: () => html`
    <style>.hostile * { background:red; color:yellow; padding:20px; border:4px dashed lime; }</style>
    <div class="hostile"><phsa-file-upload style="max-width:32rem"></phsa-file-upload></div>
  `,
};
