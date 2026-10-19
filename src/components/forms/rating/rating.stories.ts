import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { html } from "lit";
import "../../actions/button";
import "./index";

type Args = { value: string; max: number; clearable: boolean; readOnly: boolean; disabled: boolean };

const meta = {
  title: "Forms/Rating",
  component: "phsa-rating",
  tags: ["autodocs"],
  args: { value: "3", max: 5, clearable: false, readOnly: false, disabled: false },
  render: ({ value, max, clearable, readOnly, disabled }) => html`
    <phsa-rating
      label="Avaliação"
      .value=${value}
      .max=${max}
      ?clearable=${clearable}
      ?readonly=${readOnly}
      ?disabled=${disabled}
    ></phsa-rating>
  `,
} satisfies Meta<Args>;

export default meta;
type Story = StoryObj<Args>;

export const Default: Story = {};
export const Clearable: Story = { args: { clearable: true } };
export const ReadOnly: Story = { args: { readOnly: true, value: "4" } };
export const Disabled: Story = { args: { disabled: true } };

export const InForm: Story = {
  render: () => html`
    <form
      style="display:grid;gap:1rem;max-width:max-content"
      @submit=${(event: SubmitEvent) => {
        event.preventDefault();
        const form = event.currentTarget as HTMLFormElement;
        form.querySelector("output")!.textContent = `Nota: ${new FormData(form).get("rating")}`;
      }}
    >
      <phsa-rating name="rating" label="Sua avaliação" required></phsa-rating>
      <phsa-button type="submit">Enviar</phsa-button>
      <output></output>
    </form>
  `,
};

export const CustomClasses: Story = {
  render: () => html`<phsa-rating value="4" class="rounded-lg bg-violet-50 p-3"></phsa-rating>`,
};

export const Isolation: Story = {
  render: () => html`
    <style>.hostile * { background:red; color:yellow; width:80px; height:20px; }</style>
    <div class="hostile"><phsa-rating value="3"></phsa-rating></div>
  `,
};
