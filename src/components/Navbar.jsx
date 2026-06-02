

const Navbar = () => {
  return (
    <nav className='absolute z-20 w-full h-24 bg-brandark  flex items-center justify-between px-40 '>
      <div className='text-lg font-bold'>
        <img src="./images/matin-logo.png" alt="Matin" />
      </div>
      <div className='space-x-4'>
        <a href="#" data-cursor="link" className='hover:text-gray-400'>Home</a>
        <a href="#" data-cursor="link" className='hover:text-gray-400'>About</a>
        <a href="#" data-cursor="link" className='hover:text-gray-400'>Contact</a>
      </div>
    </nav>

  )
}

export default Navbar