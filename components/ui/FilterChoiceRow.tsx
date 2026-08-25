type Props = {
  type: "radio" | "checkbox";
  label: string;
  checked: boolean;
  onChange: () => void;
  name?: string;
};

export default function FilterChoiceRow({
  type,
  label,
  checked,
  onChange,
  name,
}: Props) {
  return (
    <li>
      <label className="flex cursor-pointer items-center gap-2.5 text-sm text-espresso">
        <input
          type={type}
          name={name}
          checked={checked}
          onChange={onChange}
          className="h-4 w-4 accent-burnt-orange"
        />
        <span>{label}</span>
      </label>
    </li>
  );
}
