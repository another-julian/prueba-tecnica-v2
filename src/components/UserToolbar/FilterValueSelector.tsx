interface Props {
  field: string;
  value: string;
  onChange: (value: string) => void;
}

const cities = [
  "Phoenix",
  "San Francisco",
  "Houston",
  "Los Angeles",
  "Washington",
  "Dallas",
  "Seattle",
  "Fort Worth",
  "Jacksonville",
  "San Antonio",
  "Indianapolis",
  "Austin",
  "Chicago",
  "New York",
  "San Diego",
  "Denver",
  "Philadelphia",
  "Columbus",
  "San Jose",
];

const countries = ["United States"];
const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

export default function FilterValueSelector({ field, value, onChange }: Props) {
  const getOptions = () => {
    if (field === "city") return cities;
    if (field === "country") return countries;
    if (field === "blood") return bloodGroups;
    return [];
  };

  if (!field) return null;

  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="border rounded px-2 py-1 text-sm"
    >
      <option value="">-- Valor --</option>
      {getOptions().map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  );
}
