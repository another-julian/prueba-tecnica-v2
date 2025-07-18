interface Props {
  field: string;
  onChange: (field: string) => void;
}

export default function FilterFieldSelector({ field, onChange }: Props) {
  return (
    <select
      value={field}
      onChange={(e) => onChange(e.target.value)}
      className="border rounded px-2 py-1 text-sm"
    >
      <option value="">-- Campo --</option>
      <option value="city">Ciudad</option>
      <option value="country">País</option>
      <option value="blood">Grupo sanguíneo</option>
    </select>
  );
}
