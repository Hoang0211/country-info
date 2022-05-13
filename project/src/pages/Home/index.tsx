import React, {
  useContext,
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
} from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useTable, Column } from 'react-table'
import { FaGlobeAmericas } from 'react-icons/fa'
import { AiOutlineArrowDown, AiOutlineArrowUp } from 'react-icons/ai'
import { MdFavorite, MdOutlineFavoriteBorder } from 'react-icons/md'

import Form from '../../components/Form'
import { SidebarContext } from '../../context/sidebar-context'
import { ThemeContext } from '../../context/theme-context'
import { addFavoriteCountry, removeFavoriteCountry } from '../../redux/actions'
import { AppState, SortBased, SortOrder } from '../../types'
import './home.scss'

type Cols = {
  flag: string
  commonName: string
  capital: string
  region: string
  population: string
  favorite: boolean
}

export default function Home() {
  const dispatch = useDispatch()

  const [input, setInput] = useState('')
  const [sortBased, setSortBased] = useState<SortBased>(SortBased.Name)
  const [sortOrder, setSortOrder] = useState<SortOrder>(SortOrder.Ascending)

  const inputRef = useRef<HTMLInputElement>(null) // For focus the first time

  const { showSidebar } = useContext(SidebarContext)
  const { theme } = useContext(ThemeContext)

  const { allCountries, isLoading, error } = useSelector(
    (state: AppState) => state.country
  )

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const inputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value)
  }
  // For sorting
  const changeSortType = (based: SortBased) => {
    if (sortBased === based) {
      if (sortOrder === SortOrder.Ascending) {
        setSortOrder(SortOrder.Descending)
      } else {
        setSortOrder(SortOrder.Ascending)
      }
    } else {
      setSortBased(based)
    }
  }

  const sortDisplay = useCallback(
    (based: SortBased) => {
      if (sortBased === based) {
        if (sortOrder === SortOrder.Ascending) {
          return <AiOutlineArrowDown className="icon icon-sort" />
        } else {
          return <AiOutlineArrowUp className="icon icon-sort" />
        }
      } else {
        return <></>
      }
    },
    [sortBased, sortOrder]
  )

  const headerOnClickHandler = (headerId: string) => {
    if (headerId === 'commonName') {
      changeSortType(SortBased.Name)
    } else if (headerId === 'capital') {
      changeSortType(SortBased.Capital)
    } else if (headerId === 'region') {
      changeSortType(SortBased.Region)
    } else if (headerId === 'population') {
      changeSortType(SortBased.Population)
    }
  }

  // For react-table
  const data = useMemo((): Cols[] => {
    let clonedAllCountries = allCountries.map((country) => ({
      flag: country.flag,
      commonName: country.commonName,
      capital: country.capital[0],
      region: country.region,
      population: country.population.toLocaleString('en-us'),
      favorite: country.favorite,
    }))

    if (sortBased === SortBased.Name) {
      clonedAllCountries.sort((a: Cols, b: Cols) =>
        a.commonName.localeCompare(b.commonName)
      )
    } else if (sortBased === SortBased.Capital) {
      clonedAllCountries.sort((a: Cols, b: Cols) =>
        a.capital?.localeCompare(b.capital)
      )
    } else if (sortBased === SortBased.Region) {
      clonedAllCountries.sort((a: Cols, b: Cols) =>
        a.region.localeCompare(b.region)
      )
    } else {
      clonedAllCountries.sort((a: Cols, b: Cols) => {
        return (
          Number(b.population.replace(/\D/g, '')) -
          Number(a.population.replace(/\D/g, ''))
        )
      })
    }

    if (sortOrder === SortOrder.Descending) {
      clonedAllCountries.reverse()
    }

    if (input.length > 0) {
      return clonedAllCountries.filter((country: Cols) =>
        country.commonName.startsWith(
          input[0].toUpperCase() + input.substring(1).toLowerCase()
        )
      )
    } else {
      return clonedAllCountries
    }
  }, [input, allCountries, sortOrder, sortBased])

  const columns: Column<Cols>[] = useMemo(
    () => [
      {
        Header: 'Flag',
        accessor: 'flag',
        Cell: ({ row, value }) => (
          <img
            className="country-row__img"
            alt={`${row.values.commonName} img`}
            src={value}
          />
        ),
      },
      {
        Header: <>Name {sortDisplay(SortBased.Name)}</>,
        accessor: 'commonName',
        Cell: ({ value }) => (
          <Link className="country-row__link" to={`/country/${value}`}>
            {value}
          </Link>
        ),
      },
      {
        Header: <>Capital {sortDisplay(SortBased.Capital)}</>,
        accessor: 'capital',
      },
      {
        Header: <>Region {sortDisplay(SortBased.Region)}</>,
        accessor: 'region',
      },
      {
        Header: <>Population {sortDisplay(SortBased.Population)}</>,
        accessor: 'population',
      },
      {
        Header: 'Favorite',
        accessor: 'favorite',
        Cell: ({ row, value }) => (
          <>
            {value ? (
              <MdFavorite
                className={`icon country-row__icon country-row__icon-${theme}`}
                onClick={() => {
                  dispatch(removeFavoriteCountry(row.values.commonName))
                }}
              />
            ) : (
              <MdOutlineFavoriteBorder
                className={`icon country-row__icon country-row__icon-${theme}`}
                onClick={() => {
                  dispatch(addFavoriteCountry(row.values.commonName))
                }}
              />
            )}
          </>
        ),
      },
    ],
    [sortDisplay, dispatch, theme]
  )

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable<Cols>({ columns, data })

  return (
    <div className={`home ${showSidebar ? 'home-push' : ''}`}>
      <FaGlobeAmericas className="icon home__globe" />
      <h1 className={`home__title home__title-${theme}`}>Country API</h1>
      <Form input={input} inputHandler={inputHandler} inputRef={inputRef} />
      {isLoading && (
        <p className={`home__loading home__loading-${theme}`}>Loading ...</p>
      )}
      {error && <p className={`home__error home__error-${theme}`}>{error}</p>}
      {!isLoading && !error && (
        <div className="home__table">
          <table {...getTableProps()}>
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => {
                    return (
                      <th
                        className={`table__header-${column.id}`}
                        onClick={() => headerOnClickHandler(column.id)}
                        {...column.getHeaderProps()}
                        scope="col"
                      >
                        {column.render('Header')}
                      </th>
                    )
                  })}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {rows.map((row) => {
                prepareRow(row)
                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map((cell) => {
                      return (
                        <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                      )
                    })}
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
