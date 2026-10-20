import { useState } from 'react'

export default function SearchForm({ onSearch, disabled }) {
  const [value, setValue] = useState('')

  const submit = (e) => {
    e.preventDefault()
    const number = value.trim()
    if (number) onSearch(number)
  }

  return (
    <form className="input-group mb-4" onSubmit={submit}>
      <input
        type="text"
        className="form-control"
        placeholder="Введите артикул, например 7160500039S"
        aria-label="Артикул"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button className="btn btn-primary" type="submit" disabled={disabled || !value.trim()}>
        Найти
      </button>
    </form>
  )
}
