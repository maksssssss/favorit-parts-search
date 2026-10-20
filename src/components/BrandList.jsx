export default function BrandList({ brands, selected, onSelect }) {
  return (
    <div className="list-group mb-4">
      {brands.map((brand) => (
        <button
          key={brand}
          type="button"
          className={`list-group-item list-group-item-action ${brand === selected ? 'active' : ''}`}
          onClick={() => onSelect(brand)}
        >
          {brand}
        </button>
      ))}
    </div>
  )
}
