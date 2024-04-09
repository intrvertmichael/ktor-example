export default function SubmitBtn({ dataId }) {
  return (
    <input
      data-testid={dataId}
      type='submit'
      className='px-2 py-1 text-sm bg-yellow-300 rounded cursor-pointer dark:bg-yellow-600 text-yellow-950'
    />
  )
}
