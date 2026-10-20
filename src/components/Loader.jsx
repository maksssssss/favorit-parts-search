export default function Loader({ label = 'Загрузка...' }) {
  return (
    <div className="d-flex align-items-center justify-content-center gap-3 text-secondary py-4" role="status">
      <div className="spinner-border text-primary" aria-hidden="true" />
      <span>{label}</span>
    </div>
  )
}
