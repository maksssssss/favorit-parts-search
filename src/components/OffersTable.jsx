import { useState } from 'react'

const formatPrice = (price) =>
  price == null
    ? '—'
    : `${price.toLocaleString('ru-RU', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ₽`

export default function OffersTable({ offers }) {
  const [onlyInStock, setOnlyInStock] = useState(false)
  const rows = onlyInStock ? offers.filter((o) => o.count > 0) : offers

  return (
    <>
      <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-3">
        <span className="text-secondary">
          Показано {rows.length} из {offers.length}
        </span>
        <div className="form-check form-switch mb-0">
          <input
            className="form-check-input"
            type="checkbox"
            role="switch"
            id="only-in-stock"
            checked={onlyInStock}
            onChange={(e) => setOnlyInStock(e.target.checked)}
          />
          <label className="form-check-label" htmlFor="only-in-stock">
            Только в наличии
          </label>
        </div>
      </div>

      {rows.length === 0 ? (
        <div className="alert alert-warning mb-0">Нет позиций в наличии.</div>
      ) : (
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="table-light">
              <tr>
                <th>Название / Производитель</th>
                <th className="text-end">Цена</th>
                <th className="text-end">Остаток</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((o) => (
                <tr key={o.id}>
                  <td>
                    <div>{o.name}</div>
                    <small className="text-secondary">
                      <strong>{o.brand}</strong> · {o.number}
                    </small>
                  </td>
                  <td className="text-end text-nowrap fw-semibold">{formatPrice(o.price)}</td>
                  <td className="text-end text-nowrap">
                    {o.count > 0 ? (
                      <span className="badge text-bg-success">{o.count} шт.</span>
                    ) : (
                      <span className="badge text-bg-secondary">нет в наличии</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  )
}
