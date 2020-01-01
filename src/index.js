'use strict'

const isPC = innerWidth >= 450
const perPage = 15

const appStyles = {
  wrapper: {
    margin: '88px 16px 100px'
  },
  title: {
    fontSize: '24px',
    margin: '0 0 16px'
  },
  shelterList: {
    margin: '0 0 32px',
    padding: 0,
    width: '100%'
  },
  shelterCard: {
    marginBottom: '16px'
  },
  pagenator: {
    display: 'flex',
    justifyContent: 'space-between'
  }
}

const App = () => {
  const { bookmarks, addBookmark, removeBookmark, isBookmarked } = useBookmark()
  const { latitude, longitude, syncPosition } = useGeolocation()
  const [currentShelters, previousPage, nextPage] = usePagenation({ items: map.data, perPage })

  React.useEffect(() => {
    syncPosition()
  }, [])

  if (isPC) return <p>本アプリはスマートフォンのみに対応しています。</p>

  return (
    <React.Fragment>
      <Header onClickSyncButton={syncPosition} />
      <div style={appStyles.wrapper}>
        <h1 style={appStyles.title}>避難所リスト</h1>
        <ul style={appStyles.shelterList}>
          {currentShelters.map(shelter => (
            <ShelterCard key={shelter.id} style={appStyles.shelterCard} shelter={shelter} />
          ))}
        </ul>
        <div style={appStyles.pagenator}>
          <Button onClick={previousPage}>前へ</Button>
          <Button onClick={nextPage}>次へ</Button>
        </div>
      </div>
    </React.Fragment>
  )
}

ReactDOM.render(<App />, document.querySelector('#root'))