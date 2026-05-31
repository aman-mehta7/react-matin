

const Navbar = () => {
  return (
    <nav className='absolute z-20 w-full h-16 bg-brandark text-white flex items-center justify-between px-60'>
      <div className='text-lg font-bold'>Matin3d</div>
      <div className='space-x-4'>
        <a href="#" className='hover:text-gray-400'>Home</a>
        <a href="#" className='hover:text-gray-400'>About</a>
        <a href="#" className='hover:text-gray-400'>Contact</a>
      </div>
    </nav>

  )
}

export default Navbar