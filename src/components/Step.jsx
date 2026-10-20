// Карточка этапа с номером: помогает понять, где пользователь в двухэтапном подборе
export default function Step({ number, title, active = false, children }) {
  return (
    <section className="card shadow-sm border-0 mb-4">
      <div className="card-body p-4">
        <h2 className="h5 d-flex align-items-center gap-2 mb-3">
          <span
            className={`badge rounded-circle ${active ? 'text-bg-primary' : 'text-bg-secondary'}`}
            style={{ width: 28, height: 28, lineHeight: '20px' }}
          >
            {number}
          </span>
          {title}
        </h2>
        {children}
      </div>
    </section>
  )
}
