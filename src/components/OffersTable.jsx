const formatPrice = (price) =>
  price == null
    ? '—'
    : `${price.toLocaleString('ru-RU', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ₽`

export default function OffersTable({ offers }) {
  return (
    <div className="table-responsive">
      <table className="table table-striped align-middle">
        <thead>
          <tr>
            <th>Название / Производитель</th>
            <th className="text-end">Цена</th>
            <th className="text-end">Остаток</th>
          </tr>
        </thead>
        <tbody>
          {offers.map((o) => (
            <tr key={o.id}>
              <td>
                <div>{o.name}</div>
                <small className="text-secondary">
                  {o.brand} · {o.number}
                </small>
              </td>
              <td className="text-end text-nowrap">{formatPrice(o.price)}</td>
              <td className="text-end">{o.count} шт.</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
