import { useEffect, useState, useRef } from "react";
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

  // Para mostrar y ocultar input de búsqueda
  const [buscar, setBuscar] = useState<boolean>(false);
  const [device, setDevice] = useState<string>("desktop");
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        if (device !== "desktop") setDevice("desktop");
        if (localSearch.trim() && !buscar) setBuscar(true);
        if (buscar && !localSearch.trim()) setBuscar(false);
      } else {
        if (device !== "mobile") setDevice("mobile");
        if (localSearch.trim() && !buscar) setBuscar(true);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [localSearch, device]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearchChange(localSearch);
  };

  // Referencia para evitar re-renderizados innecesarios
  const prevSearchRef = useRef<string>("");

  // Efecto para manejar el cambio de búsqueda
  useEffect(() => {
    const prevSearch = prevSearchRef.current;

    if (localSearch.trim() === "") {
      onClear();
    }

    const handler = setTimeout(() => {
      if (localSearch.trim() !== "" && localSearch.trim() !== prevSearch) {
        onSearchChange(localSearch);
      }
    }, 800);

    // Actualiza el valor previo después de evaluar
    prevSearchRef.current = localSearch.trim();

    return () => clearTimeout(handler);
  }, [localSearch]);

  return (
    <div className="">
      <div
        className={clsx("w-full flex gap-4 md:items-center justify-between", {
          "flex-col md:flex-row": buscar,
        })}
      >
        {/* Filtros */}
        <div
          className={clsx("flex gap-4 items-center flex-wrap", {
            "w-full": filtrar,
            "w-fit": !filtrar,
          })}
        >
          {buscar ? (
            <Button
              onClick={() => {
                onClear();
                setLocalSearch("");
                setFiltrar(false);
                setBuscar(false);
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
            <label htmlFor="buscar" className="sr-only">
              Buscar usuario
            </label>
            <input
              id="buscar"
              type="text"
              placeholder="Buscar por nombre o email..."
              value={localSearch}
              onChange={(e) => {
                setLocalSearch(e.target.value);
                // onSearchChange(localSearch); // Descomentar si se quiere buscar en tiempo real
              }}
              className={clsx(
                "w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring focus:ring-blue-300  md:block",
                {
                  hidden: !buscar,
                }
              )}
            />
            <Button
              type={"submit"}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm"
              onClick={() => {
                if (!localSearch && device === "mobile")
                  setBuscar((prev) => !prev);
              }}
            >
              Buscar
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}
