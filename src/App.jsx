import { useDispatch, useSelector } from 'react-redux'
import { loadBrands, loadOffers } from './store/searchSlice'
import SearchForm from './components/SearchForm'
import BrandList from './components/BrandList'
import OffersTable from './components/OffersTable'
import Loader from './components/Loader'
import ErrorAlert from './components/ErrorAlert'

export default function App() {
  const dispatch = useDispatch()
  const s = useSelector((state) => state.search)

  const searchBrands = (number) => dispatch(loadBrands(number))
  const searchOffers = (brand) => dispatch(loadOffers({ number: s.query, brand }))

  return (
    <div className="container py-4" style={{ maxWidth: 900 }}>
      <h1 className="h3 mb-4">Поиск автозапчастей</h1>
      <SearchForm onSearch={searchBrands} disabled={s.brandsStatus === 'loading'} />

      {/* Этап 1: производители */}
      {s.brandsStatus === 'loading' && <Loader label="Ищем производителей..." />}
      {s.brandsStatus === 'failed' && (
        <ErrorAlert message={s.brandsError} onRetry={() => searchBrands(s.query)} />
      )}
      {s.brandsStatus === 'succeeded' && s.brands.length === 0 && (
        <div className="alert alert-warning">По артикулу «{s.query}» ничего не найдено.</div>
      )}
      {s.brands.length > 0 && (
        <>
          <h2 className="h5">Выберите производителя</h2>
          <BrandList brands={s.brands} selected={s.selectedBrand} onSelect={searchOffers} />
        </>
      )}

      {/* Этап 2: аналоги и предложения */}
      {s.offersStatus === 'loading' && <Loader label="Загружаем предложения..." />}
      {s.offersStatus === 'failed' && (
        <ErrorAlert message={s.offersError} onRetry={() => searchOffers(s.selectedBrand)} />
      )}
      {s.offersStatus === 'succeeded' && s.offers.length === 0 && (
        <div className="alert alert-warning">Предложений не найдено.</div>
      )}
      {s.offers.length > 0 && (
        <>
          <h2 className="h5">Аналоги и предложения</h2>
          <OffersTable offers={s.offers} />
        </>
      )}
    </div>
  )
}
