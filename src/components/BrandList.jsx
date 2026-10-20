export default function BrandList({ brands, selected, onSelect }) {
  return (
    <>
      <p className="text-secondary">Найдено производителей: {brands.length}. Выберите нужного.</p>
      <div className="d-flex flex-wrap gap-2">
        {brands.map((brand) => (
          <button
            key={brand}
            type="button"
            aria-pressed={brand === selected}
            className={`btn ${brand === selected ? 'btn-primary' : 'btn-outline-primary'}`}
            onClick={() => onSelect(brand)}
          >
            {brand}
          </button>
        ))}
      </div>
    </>
  )
}
