import { useState } from "react";
import UserFilter from "./UserFilter";
import Button from "../Button";
import clsx from "clsx";

interface Props {
  search: string;
  onSearchChange: (value: string) => void;
  onFilterChange: (key?: string, value?: string) => void;
  onClear: () => void;
}

export default function UserToolbar({
  search,
  onSearchChange,
  onFilterChange,
  onClear,
}: Props) {
  const [localSearch, setLocalSearch] = useState(search);
  const [filtrar, setFiltrar] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearchChange(localSearch);
  };

  return (
    <div className="">
      <div
        className={clsx("w-full flex gap-4 md:items-center justify-between", {
          "flex-wrap md:flex-col md:items-start": localSearch,
        })}
      >
        {/* Filtros */}
        <div
          className={clsx("flex gap-4 items-center flex-wrap", {
            "w-full md:w-1/2": filtrar,
            "w-fit": !filtrar,
          })}
        >
          {localSearch ? (
            <Button
              onClick={() => {
                onClear();
                setLocalSearch("");
                setFiltrar(false);
              }}
              className="bg-gray-600 text-gray-50 px-4 py-2 rounded hover:bg-gray-400 text-sm"
              aria-label="Limpiar búsqueda"
            >
              Volver
            </Button>
          ) : (
            <Button
              onClick={() => {
                setFiltrar((prev) => !prev);
                setLocalSearch("");
                onClear();
              }}
              className={clsx(
                "px-4 py-2 rounded text-sm",
                filtrar
                  ? "bg-gray-600 text-gray-50 hover:bg-gray-400"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              )}
            >
              {filtrar ? "Volver" : "Filtrar"}
            </Button>
          )}
          {filtrar && <UserFilter onFilterChange={onFilterChange} />}
        </div>

        {!filtrar && (
          <form
            onSubmit={handleSubmit}
            className={clsx("flex gap-2 w-full justify-end", {
              "md:w-1/2": localSearch,
              "md:w-1/3": !localSearch,
            })}
          >
            <input
              type="text"
              placeholder="Buscar por nombre o email..."
              value={localSearch}
              onChange={(e) => {
                setLocalSearch(e.target.value);
                // onSearchChange(localSearch); // Descomentar si se quiere buscar en tiempo real
              }}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring focus:ring-blue-300"
              aria-label="Buscar usuario"
            />
            <Button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm"
            >
              Buscar
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}
