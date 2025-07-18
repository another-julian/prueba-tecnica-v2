import { useState } from "react";
import Users from "./components/Users";
import UserToolbar from "./components/UserToolbar";
import Header from "./components/Header";

function App() {
  const [search, setSearch] = useState("");
  const [filterKey, setFilterKey] = useState<string | undefined>();
  const [filterValue, setFilterValue] = useState<string | undefined>();

  const handleClear = () => {
    setSearch("");
    setFilterKey(undefined);
    setFilterValue(undefined);
  };

  return (
    <main className="max-w-[1200px] mx-auto p-4">
      <Header />
      <div className="sticky top-0 z-10 bg-white py-4 border-b border-gray-200">
        <UserToolbar
          search={search}
          onSearchChange={setSearch}
          onFilterChange={(key, value) => {
            setFilterKey(key);
            setFilterValue(value);
          }}
          onClear={handleClear}
        />
      </div>

      <Users search={search} filterKey={filterKey} filterValue={filterValue} />
    </main>
  );
}

export default App;
