import { useState } from 'react'

export default function SearchForm({ onSearch, disabled }) {
  const [value, setValue] = useState('')

  const submit = (e) => {
    e.preventDefault()
    const number = value.trim()
    if (number) onSearch(number)
  }

  return (
    <form onSubmit={submit}>
      <div className="input-group input-group-lg">
        <input
          type="search"
          className="form-control"
          placeholder="Например, 7160500039S"
          aria-label="Артикул"
          autoFocus
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button className="btn btn-primary px-4" type="submit" disabled={disabled || !value.trim()}>
          {disabled ? 'Поиск...' : 'Найти'}
        </button>
      </div>
      <div className="form-text">Введите артикул (номер) запчасти и нажмите Enter.</div>
    </form>
  )
}
