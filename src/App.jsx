import { useDispatch, useSelector } from 'react-redux'
import { loadBrands, loadOffers } from './store/searchSlice'
import SearchForm from './components/SearchForm'
import BrandList from './components/BrandList'
import OffersTable from './components/OffersTable'
import Loader from './components/Loader'
import ErrorAlert from './components/ErrorAlert'
import Step from './components/Step'

export default function App() {
  const dispatch = useDispatch()
  const search = useSelector((state) => state.search)

  const searchBrands = (number) => dispatch(loadBrands(number))
  const searchOffers = (brand) => dispatch(loadOffers({ number: search.query, brand }))

  const showBrands = search.brandsStatus !== 'idle'
  const showOffers = search.offersStatus !== 'idle'

  return (
    <div className="bg-light min-vh-100">
      <header className="bg-dark text-white py-4 mb-4">
        <div className="container" style={{ maxWidth: 960 }}>
          <h1 className="h3 mb-1">Поиск автозапчастей</h1>
          <p className="mb-0 text-white-50">Найдите производителя по артикулу и сравните аналоги, цены и наличие</p>
        </div>
      </header>

      <main className="container pb-5" style={{ maxWidth: 960 }}>
        <Step number={1} title="Артикул детали" active>
          <SearchForm onSearch={searchBrands} disabled={search.brandsStatus === 'loading'} />
        </Step>

        {showBrands && (
          <Step number={2} title="Производитель" active={search.brands.length > 0}>
            {search.brandsStatus === 'loading' && <Loader label="Ищем производителей..." />}
            {search.brandsStatus === 'failed' && (
              <ErrorAlert message={search.brandsError} onRetry={() => searchBrands(search.query)} />
            )}
            {search.brandsStatus === 'succeeded' && search.brands.length === 0 && (
              <div className="alert alert-warning mb-0">По артикулу «{search.query}» ничего не найдено.</div>
            )}
            {search.brands.length > 0 && (
              <BrandList brands={search.brands} selected={search.selectedBrand} onSelect={searchOffers} />
            )}
          </Step>
        )}

        {showOffers && (
          <Step number={3} title="Аналоги и предложения" active={search.offers.length > 0}>
            {search.offersStatus === 'loading' && <Loader label="Загружаем предложения..." />}
            {search.offersStatus === 'failed' && (
              <ErrorAlert message={search.offersError} onRetry={() => searchOffers(search.selectedBrand)} />
            )}
            {search.offersStatus === 'succeeded' && search.offers.length === 0 && (
              <div className="alert alert-warning mb-0">Предложений не найдено.</div>
            )}
            {search.offers.length > 0 && <OffersTable offers={search.offers} />}
          </Step>
        )}
      </main>
    </div>
  )
}
