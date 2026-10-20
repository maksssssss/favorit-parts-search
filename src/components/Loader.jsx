export default function Loader({ label = 'Загрузка...' }) {
  return (
    <div className="d-flex align-items-center gap-2 text-secondary my-3" role="status">
      <div className="spinner-border spinner-border-sm" aria-hidden="true" />
      <span>{label}</span>
    </div>
  )
}
