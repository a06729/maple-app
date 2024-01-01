import SearchBar from './components/searchBar'

export default function Home() {
  return (
    <main className='flex flex-row justify-center h-[600px]'>
      <div className='flex flex-row justify-center items-center'>
        <SearchBar></SearchBar>
      </div>
    </main>
  )
}
