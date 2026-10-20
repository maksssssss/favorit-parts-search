import { useDispatch, useSelector } from 'react-redux'
import { loadBrands, loadOffers } from './store/searchSlice'
import SearchForm from './components/SearchForm'
import BrandList from './components/BrandList'
import OffersTable from './components/OffersTable'
import Loader from './components/Loader'
import ErrorAlert from './components/ErrorAlert'

export default function App() {
  const dispatch = useDispatch()
  const search = useSelector((state) => state.search)

  const searchBrands = (number) => dispatch(loadBrands(number))
  const searchOffers = (brand) => dispatch(loadOffers({ number: search.query, brand }))

  return (
    <div className="container py-4" style={{ maxWidth: 900 }}>
      <h1 className="h3 mb-4">Поиск автозапчастей</h1>
      <SearchForm onSearch={searchBrands} disabled={search.brandsStatus === 'loading'} />

      {/* Этап 1: производители */}
      {search.brandsStatus === 'loading' && <Loader label="Ищем производителей..." />}
      {search.brandsStatus === 'failed' && (
        <ErrorAlert message={search.brandsError} onRetry={() => searchBrands(search.query)} />
      )}
      {search.brandsStatus === 'succeeded' && search.brands.length === 0 && (
        <div className="alert alert-warning">По артикулу «{search.query}» ничего не найдено.</div>
      )}
      {search.brands.length > 0 && (
        <>
          <h2 className="h5">Выберите производителя</h2>
          <BrandList brands={search.brands} selected={search.selectedBrand} onSelect={searchOffers} />
        </>
      )}

      {/* Этап 2: аналоги и предложения */}
      {search.offersStatus === 'loading' && <Loader label="Загружаем предложения..." />}
      {search.offersStatus === 'failed' && (
        <ErrorAlert message={search.offersError} onRetry={() => searchOffers(search.selectedBrand)} />
      )}
      {search.offersStatus === 'succeeded' && search.offers.length === 0 && (
        <div className="alert alert-warning">Предложений не найдено.</div>
      )}
      {search.offers.length > 0 && (
        <>
          <h2 className="h5">Аналоги и предложения</h2>
          <OffersTable offers={search.offers} />
        </>
      )}
    </div>
  )
}
