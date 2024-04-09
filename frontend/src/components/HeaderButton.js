export default function HeaderButton({ label, showLabel, onClick }) {
  return showLabel ? (
    <h1 className='font-semibold'>{label}</h1>
  ) : (
    <button onClick={onClick} className='text-neutral-400'>
      {label}
    </button>
  )
}
