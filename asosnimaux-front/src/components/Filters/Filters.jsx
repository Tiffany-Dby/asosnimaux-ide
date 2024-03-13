// Styles
import "./filters.scss";
// Components
import Button from "../Button/Button";
import Input from "../Input/Input";
import InputCheckbox from "../InputCheckbox/InputCheckbox";
import { FaXmark } from "react-icons/fa6";
// React
import { useState } from "react";

const Filters = ({ onClick, searchValue, onSearchChange, onFiltersChange, resetClick, initialFilters, resetFilters }) => {
  // Filters state (initial state from Adoption.jsx)
  const [filters, setFilters] = useState({ ...initialFilters });

  // Checkbox onChange
  const handleFiltersChange = (input, value) => {
    const updatedFilters = filters[input].includes(value) ? filters[input].filter(element => element !== value) : [...filters[input], value];

    setFilters({ ...filters, [input]: updatedFilters });
    onFiltersChange({ ...filters, [input]: updatedFilters });
  }

  // Reset Filters
  const handleResetClick = () => {
    onFiltersChange({ ...resetFilters });
    setFilters({ ...resetFilters });
    onSearchChange("");
    resetClick();
  }

  return (
    <div className="filters__wrapper">
      <div className="filters__header">
        <div className="title-wrapper">
          <h2>Filtres</h2>
        </div>
        <FaXmark className="manage-icons" onClick={onClick} role="button" aria-label="Fermer le menu des filtres" />
      </div>
      <search>
        <form className="filters">
          <div className="filters__search">
            <Input
              id="search"
              label="Rechercher un animal par son nom"
              name={"q"}
              type="search"
              value={searchValue}
              onChange={(value) => onSearchChange(value)} />
          </div>
          <div className="filters__switches">
            <fieldset>
              <legend>Espèces</legend>
              <div className="filters__inputs">
                <InputCheckbox
                  id={"cats"}
                  label={"Chats"}
                  checked={filters.species.includes("chat")}
                  onChange={() => handleFiltersChange("species", "chat")} />
                <InputCheckbox
                  id={"dogs"}
                  label={"Chiens"}
                  checked={filters.species.includes("chien")}
                  onChange={() => handleFiltersChange("species", "chien")} />
                <InputCheckbox
                  id={"others"}
                  label={"Autres"}
                  checked={filters.species.includes("autres")}
                  onChange={() => handleFiltersChange("species", "autres")} />
              </div>
            </fieldset>
            <fieldset>
              <legend>Sexe</legend>
              <div className="filters__inputs">
                <InputCheckbox
                  id={"female"}
                  label={"Femelle"}
                  checked={filters.sex.includes("femelle")}
                  onChange={() => handleFiltersChange("sex", "femelle")} />
                <InputCheckbox
                  id={"male"}
                  label={"Mâle"}
                  checked={filters.sex.includes("mâle")}
                  onChange={() => handleFiltersChange("sex", "mâle")} />
              </div>
            </fieldset>
            <fieldset>
              <legend>Âge</legend>
              <div className="filters__inputs">
                <InputCheckbox
                  id={"senior"}
                  label={"Senior"}
                  checked={filters.age.includes("senior")}
                  onChange={() => handleFiltersChange("age", "senior")} />
                <InputCheckbox
                  id={"adult"}
                  label={"Adulte"}
                  checked={filters.age.includes("adulte")}
                  onChange={() => handleFiltersChange("age", "adulte")} />
                <InputCheckbox
                  id={"junior"}
                  label={"Junior"}
                  checked={filters.age.includes("junior")}
                  onChange={() => handleFiltersChange("age", "junior")} />
              </div>
            </fieldset>
          </div>
          <Button btnStyle=" filters__reset" text="Réinitialiser les filtres" btnClick={handleResetClick} />
        </form>
      </search >
    </div>
  );
}

export default Filters;